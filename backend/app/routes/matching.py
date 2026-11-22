from fastapi import APIRouter
from app.models.schemas import GunaMilanRequest
from app.services.vedic_astro import calculate_guna_milan
from app.database import get_db

router = APIRouter(prefix="/api/matching", tags=["matching"])

@router.post("/guna-milan")
async def guna_milan_endpoint(req: GunaMilanRequest):
    result = calculate_guna_milan(
        groom_name=req.groomName,
        groom_dob=req.groomDob,
        groom_tob=req.groomTob,
        bride_name=req.brideName,
        bride_dob=req.brideDob,
        bride_tob=req.brideTob
    )

    db = get_db()
    if db is not None:
        try:
            await db.milan_records.insert_one({
                "groom": req.groomName,
                "bride": req.brideName,
                "score": result["totalScore"]
            })
        except Exception:
            pass

    return result
