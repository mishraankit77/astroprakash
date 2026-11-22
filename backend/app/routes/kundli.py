from fastapi import APIRouter
from app.models.schemas import KundliRequest
from app.services.vedic_astro import calculate_kundli
from app.database import get_db

router = APIRouter(prefix="/api/kundli", tags=["kundli"])

@router.post("/generate")
async def generate_kundli_endpoint(req: KundliRequest):
    result = calculate_kundli(
        name=req.name,
        dob_str=req.dob,
        tob_str=req.tob,
        place=req.place,
        lat=req.lat or 28.6139,
        lon=req.lon or 77.2090
    )

    db = get_db()
    if db is not None:
        try:
            await db.kundli_records.insert_one({
                "name": req.name,
                "dob": req.dob,
                "tob": req.tob,
                "place": req.place,
                "result": result
            })
        except Exception:
            pass

    return result
