from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any
from datetime import datetime
import uuid
from app.database import get_db
from app.services.vedic_astro import calculate_kundli

router = APIRouter(prefix="/api/auth", tags=["auth"])

class SendOtpRequest(BaseModel):
    phone: str

class VerifyOtpRequest(BaseModel):
    phone: str
    otp: str

class SignupRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    gender: Optional[str] = "male"
    dob: Optional[str] = "1995-08-15"
    tob: Optional[str] = "14:30"
    place: Optional[str] = "New Delhi, India"

class LoginRequest(BaseModel):
    phoneOrEmail: str
    password: Optional[str] = "123456"

# In-memory OTP storage for rapid verification
OTP_STORE: Dict[str, str] = {}

@router.post("/send-otp")
async def send_otp(req: SendOtpRequest):
    phone = req.phone.strip()
    if len(phone) < 10:
        raise HTTPException(status_code=400, detail="Please enter a valid 10-digit phone number")
    
    # Generate 6-digit OTP (Standard test OTP: 123456 or dynamic)
    otp = "123456"
    OTP_STORE[phone] = otp
    
    return {
        "status": "success",
        "message": f"OTP successfully sent to {phone}. For demo/testing use OTP: 123456",
        "testOtp": otp
    }

@router.post("/verify-otp")
async def verify_otp(req: VerifyOtpRequest):
    phone = req.phone.strip()
    sent_otp = OTP_STORE.get(phone, "123456")
    
    if req.otp != sent_otp and req.otp != "123456":
        raise HTTPException(status_code=400, detail="Invalid OTP. Please enter 123456.")
    
    db = get_db()
    user = None
    if db is not None:
        try:
            user = await db.users.find_one({"phone": phone})
            if not user:
                # Calculate quick initial astrological details
                kundli_info = calculate_kundli("Seeker", "1995-08-15", "14:30", "Delhi")
                user = {
                    "id": str(uuid.uuid4())[:8],
                    "name": "Astro Seeker",
                    "phone": phone,
                    "email": f"user_{phone[-4:]}@astroprakash.com",
                    "gender": "male",
                    "dob": "1995-08-15",
                    "tob": "14:30",
                    "place": "Delhi, India",
                    "rashi": kundli_info["moonSign"]["sign"],
                    "lagna": kundli_info["lagna"]["sign"],
                    "nakshatra": kundli_info["moonSign"]["nakshatra"],
                    "walletBalance": 100,  # Free welcome promotional balance
                    "createdAt": datetime.now().isoformat()
                }
                await db.users.insert_one(user)
                user.pop("_id", None)
            else:
                user["id"] = user.get("id", str(user.get("_id")))
                user.pop("_id", None)
        except Exception:
            pass
            
    if not user:
        user = {
            "id": "user_demo",
            "name": "Astro Seeker",
            "phone": phone,
            "email": f"user_{phone[-4:]}@astroprakash.com",
            "walletBalance": 100,
            "rashi": "Cancer",
            "lagna": "Aries"
        }
        
    return {
        "status": "success",
        "token": f"jwt_token_{user['id']}",
        "user": user,
        "message": "Logged in successfully! ₹100 Welcome Bonus credited to your wallet."
    }

@router.post("/signup")
async def signup(req: SignupRequest):
    phone = req.phone.strip()
    db = get_db()
    
    # Calculate their personal Vedic astrological profile based on their birth data
    kundli_calc = calculate_kundli(
        name=req.name,
        dob_str=req.dob or "1995-08-15",
        tob_str=req.tob or "14:30",
        place=req.place or "Delhi, India"
    )
    
    user_id = str(uuid.uuid4())[:8]
    user_data = {
        "id": user_id,
        "name": req.name,
        "phone": phone,
        "email": req.email or f"{req.name.lower().replace(' ', '')}@gmail.com",
        "gender": req.gender,
        "dob": req.dob,
        "tob": req.tob,
        "place": req.place,
        "lagna": kundli_calc["lagna"]["sign"],
        "lagnaLord": kundli_calc["lagna"]["lord"],
        "rashi": kundli_calc["moonSign"]["sign"],
        "moonLord": kundli_calc["moonSign"]["lord"],
        "nakshatra": kundli_calc["moonSign"]["nakshatra"],
        "pada": kundli_calc["moonSign"]["pada"],
        "isManglik": kundli_calc["dosha"]["mangalDosha"]["isManglik"],
        "walletBalance": 100,  # Welcome bonus
        "createdAt": datetime.now().isoformat()
    }
    
    if db is not None:
        try:
            # Check if user already exists
            existing = await db.users.find_one({"phone": phone})
            if existing:
                await db.users.update_one({"phone": phone}, {"$set": user_data})
            else:
                await db.users.insert_one(user_data)
            user_data.pop("_id", None)
        except Exception:
            pass
            
    return {
        "status": "success",
        "token": f"jwt_token_{user_id}",
        "user": user_data,
        "message": "Account created! ₹100 Free Consultation Bonus has been added to your AstroPrakash wallet."
    }

@router.post("/login")
async def login(req: LoginRequest):
    val = req.phoneOrEmail.strip()
    db = get_db()
    user = None
    
    if db is not None:
        try:
            user = await db.users.find_one({
                "$or": [{"phone": val}, {"email": val}]
            })
            if user:
                user["id"] = user.get("id", str(user.get("_id")))
                user.pop("_id", None)
        except Exception:
            pass
            
    if not user:
        # Auto-create if first time
        user = {
            "id": str(uuid.uuid4())[:8],
            "name": "Astro Seeker",
            "phone": val if val.isdigit() else "9876543210",
            "email": val if "@" in val else "user@astroprakash.com",
            "walletBalance": 100,
            "rashi": "Leo",
            "lagna": "Scorpio"
        }
        
    return {
        "status": "success",
        "token": f"jwt_token_{user['id']}",
        "user": user,
        "message": "Welcome back to AstroPrakash!"
    }
