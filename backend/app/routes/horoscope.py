from fastapi import APIRouter, HTTPException
from app.services.vedic_astro import get_all_horoscopes

router = APIRouter(prefix="/api/horoscopes", tags=["horoscopes"])

@router.get("")
async def get_horoscopes():
    return {"horoscopes": get_all_horoscopes()}

@router.get("/{sign}")
async def get_sign_horoscope(sign: str):
    all_h = get_all_horoscopes()
    for h in all_h:
        if h["sign"].lower() == sign.lower() or h["sanskrit"].lower() == sign.lower():
            return h
    raise HTTPException(status_code=404, detail="Zodiac sign not found")
