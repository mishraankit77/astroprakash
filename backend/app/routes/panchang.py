from fastapi import APIRouter
from app.services.vedic_astro import get_daily_panchang

router = APIRouter(prefix="/api/panchang", tags=["panchang"])

@router.get("/today")
async def get_today_panchang():
    return get_daily_panchang()
