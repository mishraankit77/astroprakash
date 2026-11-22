from fastapi import APIRouter, Query, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
from app.seed_data import ASTROLOGERS_SEED
from app.database import get_db

router = APIRouter(prefix="/api/astrologers", tags=["astrologers"])

class AstrologerRegisterRequest(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    skills: List[str]
    languages: List[str]
    experienceYears: int
    pricePerMinute: int
    discountedPrice: Optional[int] = None
    bio: str
    category: str  # Vedic, Tarot, Numerology, Vastu
    avatar: Optional[str] = None

class StatusUpdateRequest(BaseModel):
    isOnline: bool
    isBusy: Optional[bool] = False

@router.get("")
async def get_astrologers(
    category: Optional[str] = Query(None),
    skill: Optional[str] = Query(None),
    language: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    onlineOnly: Optional[bool] = Query(False)
):
    db = get_db()
    astrologers = list(ASTROLOGERS_SEED)

    if db is not None:
        try:
            cursor = db.astrologers.find()
            db_list = await cursor.to_list(length=100)
            if db_list:
                for a in db_list:
                    a["_id"] = str(a["_id"])
                astrologers = db_list
        except Exception:
            pass

    # Filtering
    filtered = []
    for a in astrologers:
        if onlineOnly and not a.get("isOnline"):
            continue
        if category and category.lower() != "all" and a.get("category", "").lower() != category.lower():
            continue
        if skill and not any(skill.lower() in s.lower() for s in a.get("skills", [])):
            continue
        if language and not any(language.lower() in l.lower() for l in a.get("languages", [])):
            continue
        if search:
            search_term = search.lower()
            name_match = search_term in a.get("name", "").lower()
            skill_match = any(search_term in s.lower() for s in a.get("skills", []))
            if not (name_match or skill_match):
                continue
        filtered.append(a)

    return {"astrologers": filtered, "total": len(filtered)}

@router.get("/{astro_id}")
async def get_astrologer_detail(astro_id: str):
    db = get_db()
    if db is not None:
        try:
            astro = await db.astrologers.find_one({"id": astro_id})
            if astro:
                astro["_id"] = str(astro["_id"])
                return astro
        except Exception:
            pass

    for a in ASTROLOGERS_SEED:
        if a["id"] == astro_id:
            return a
    raise HTTPException(status_code=404, detail="Astrologer not found")

@router.post("/register")
async def register_astrologer(req: AstrologerRegisterRequest):
    astro_id = f"astro_{str(uuid.uuid4())[:8]}"
    avatar = req.avatar or "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256"
    discounted = req.discountedPrice or max(15, req.pricePerMinute - 15)

    doc = {
        "id": astro_id,
        "name": req.name,
        "phone": req.phone,
        "email": req.email or f"{req.name.lower().replace(' ', '')}@gmail.com",
        "avatar": avatar,
        "skills": req.skills,
        "languages": req.languages,
        "experienceYears": req.experienceYears,
        "pricePerMinute": req.pricePerMinute,
        "discountedPrice": discounted,
        "rating": 5.0,
        "totalOrders": 0,
        "isOnline": True,
        "isBusy": False,
        "bio": req.bio,
        "category": req.category,
        "badge": "Verified Acharya",
        "createdAt": datetime.now().isoformat(),
        "todayEarnings": 0,
        "totalEarnings": 0
    }

    db = get_db()
    if db is not None:
        try:
            await db.astrologers.insert_one(doc)
            doc.pop("_id", None)
        except Exception:
            pass

    ASTROLOGERS_SEED.insert(0, doc)

    return {
        "status": "success",
        "message": f"Congratulations {req.name}! Your Astrologer Profile has been verified & published on AstroPrakash.",
        "astrologer": doc
    }

@router.post("/{astro_id}/status")
async def update_astrologer_status(astro_id: str, req: StatusUpdateRequest):
    db = get_db()
    if db is not None:
        try:
            await db.astrologers.update_one(
                {"id": astro_id},
                {"$set": {"isOnline": req.isOnline, "isBusy": req.isBusy}}
            )
        except Exception:
            pass

    for a in ASTROLOGERS_SEED:
        if a["id"] == astro_id:
            a["isOnline"] = req.isOnline
            a["isBusy"] = req.isBusy

    return {"status": "success", "isOnline": req.isOnline, "isBusy": req.isBusy}

@router.get("/{astro_id}/dashboard")
async def get_astrologer_dashboard(astro_id: str):
    astro = None
    for a in ASTROLOGERS_SEED:
        if a["id"] == astro_id:
            astro = a
            break

    if not astro:
        astro = ASTROLOGERS_SEED[0]

    # Simulated incoming consultation request for testing
    incoming_request = {
        "requestId": "req_8812",
        "seekerName": "Rohit Sharma",
        "type": "call",
        "maskedPhone": "+91 98XXX-XX210 (Masked Number)",
        "birthDetails": "18 May 1996, 11:30 AM at New Delhi",
        "durationRate": f"₹{astro.get('discountedPrice', 25)}/min",
        "lagna": "Leo (Simha)",
        "rashi": "Cancer (Karka)"
    }

    return {
        "astrologer": astro,
        "stats": {
            "todayEarnings": 4850,
            "totalEarnings": 128400,
            "todayCalls": 14,
            "todayChats": 22,
            "rating": astro.get("rating", 4.95),
            "walletPayout": 12450
        },
        "incomingRequest": incoming_request
    }
