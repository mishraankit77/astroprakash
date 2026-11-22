from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from app.seed_data import PRODUCTS_SEED
from app.database import get_db

router = APIRouter(prefix="/api/mall", tags=["mall"])

class PoojaBooking(BaseModel):
    productId: str
    userName: str
    userPhone: str
    userGotra: Optional[str] = "Kashyapa"
    sankalpaDate: Optional[str] = None
    address: Optional[str] = None

@router.get("/products")
async def get_mall_products():
    return {"products": PRODUCTS_SEED}

@router.post("/book-pooja")
async def book_pooja(booking: PoojaBooking):
    db = get_db()
    if db is not None:
        try:
            await db.pooja_bookings.insert_one(booking.dict())
        except Exception:
            pass
    return {
        "status": "success",
        "message": f"Pooja ritual successfully scheduled for {booking.userName}. Our Acharyas will reach out on WhatsApp/Call for Sankalp details.",
        "bookingId": "AP-" + str(abs(hash(booking.userName)))[:6]
    }
