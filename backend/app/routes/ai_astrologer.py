from fastapi import APIRouter
from app.models.schemas import AIChatRequest
from app.services.ai_service import generate_ai_astrology_response
from app.database import get_db

router = APIRouter(prefix="/api/ai", tags=["ai"])

@router.post("/ask")
async def ask_ai_astrologer(req: AIChatRequest):
    response = await generate_ai_astrology_response(
        prompt=req.message,
        user_context=req.userContext
    )

    db = get_db()
    if db is not None:
        try:
            await db.ai_conversations.insert_one({
                "prompt": req.message,
                "response": response
            })
        except Exception:
            pass

    return response
