from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid
from app.seed_data import ASTROLOGERS_SEED
from app.database import get_db
from app.services.security_guard import inspect_text_for_contact_leakage, mask_phone_number

router = APIRouter(prefix="/api/consultation", tags=["consultation"])

class ConsultationStart(BaseModel):
    astrologerId: str
    type: str  # chat or call
    userName: str
    userBirthDetails: Optional[str] = None
    userPhone: Optional[str] = "9876543210"

class MessageSend(BaseModel):
    sessionId: str
    text: str
    sender: str

class AudioSentinelReport(BaseModel):
    sessionId: str
    transcriptSnippet: str

SESSIONS = {}

@router.post("/start")
async def start_consultation(req: ConsultationStart):
    astro = next((a for a in ASTROLOGERS_SEED if a["id"] == req.astrologerId), None)
    if not astro:
        raise HTTPException(status_code=404, detail="Astrologer not found")

    session_id = str(uuid.uuid4())[:8]

    # Mask both numbers - real numbers are never exposed!
    masked_user_phone = mask_phone_number(req.userPhone or "9876543210")
    virtual_bridge_number = "+91 1800-278-7672 (AstroPrakash Secure Bridge #409)"

    session_data = {
        "sessionId": session_id,
        "astrologer": astro,
        "type": req.type,
        "userName": req.userName,
        "maskedUserPhone": masked_user_phone,
        "virtualBridgeNumber": virtual_bridge_number,
        "startTime": datetime.now().isoformat(),
        "status": "active",
        "privacyProtectionActive": True,
        "messages": [
            {
                "id": "1",
                "sender": "system",
                "text": "🛡️ Privacy Protection Active: Real phone numbers are 100% masked. Sharing personal contact details or phone numbers in chat or over voice is strictly prohibited and monitored.",
                "time": datetime.now().strftime("%I:%M %p")
            },
            {
                "id": "2",
                "sender": "astrologer",
                "text": f"Pranam {req.userName}! I am {astro['name']}. Please share your question so I can consult your planetary chart.",
                "time": datetime.now().strftime("%I:%M %p")
            }
        ]
    }
    SESSIONS[session_id] = session_data

    db = get_db()
    if db is not None:
        try:
            doc_to_save = dict(session_data)
            await db.consultations.insert_one(doc_to_save)
            session_data.pop("_id", None)
        except Exception:
            pass

    session_data.pop("_id", None)
    return session_data

@router.get("/{session_id}")
async def get_consultation(session_id: str):
    if session_id in SESSIONS:
        return SESSIONS[session_id]
    db = get_db()
    if db is not None:
        try:
            s = await db.consultations.find_one({"sessionId": session_id})
            if s:
                s["_id"] = str(s["_id"])
                return s
        except Exception:
            pass
    raise HTTPException(status_code=404, detail="Consultation session not found")

@router.post("/{session_id}/message")
async def send_message(session_id: str, msg: MessageSend):
    if session_id not in SESSIONS:
        raise HTTPException(status_code=404, detail="Session not found")

    session = SESSIONS[session_id]
    if session.get("status") == "terminated":
        raise HTTPException(status_code=400, detail="This consultation has been terminated.")

    # 1. Privacy DLP Inspection: Scan for prohibited phone numbers or contacts
    is_violation, reason = inspect_text_for_contact_leakage(msg.text)
    if is_violation:
        warning_msg = {
            "id": str(uuid.uuid4())[:6],
            "sender": "system",
            "isWarning": True,
            "text": f"⚠️ MESSAGE BLOCKED: {reason} To protect your safety and privacy, sharing mobile numbers or external communication channels is strictly prohibited.",
            "time": datetime.now().strftime("%I:%M %p")
        }
        session["messages"].append(warning_msg)

        # Log security infraction
        db = get_db()
        if db is not None:
            try:
                await db.security_infractions.insert_one({
                    "sessionId": session_id,
                    "sender": msg.sender,
                    "blockedContent": msg.text,
                    "reason": reason,
                    "timestamp": datetime.now().isoformat()
                })
            except Exception:
                pass

        return {
            "status": "blocked",
            "reason": reason,
            "systemMessage": warning_msg
        }

    # If valid, append user message
    user_msg = {
        "id": str(uuid.uuid4())[:6],
        "sender": "user",
        "text": msg.text,
        "time": datetime.now().strftime("%I:%M %p")
    }
    session["messages"].append(user_msg)

    # Dynamic Astrologer Response
    lower_txt = msg.text.lower()
    if any(k in lower_txt for k in ["job", "career", "promotion", "work"]):
        reply_txt = "I am examining your 10th house and Dashamsha (D10) chart. A favorable transit of Jupiter is approaching, which indicates a strong probability of career promotion or job switch within the next 4 to 6 months. Maintain focus and worship Lord Surya."
    elif any(k in lower_txt for k in ["marriage", "love", "partner", "relationship"]):
        reply_txt = "Looking at your 7th house of alliance and Venus/Jupiter alignments, there is a strong yog for marriage or emotional commitment. Reciting the Vishnu Sahasranama will remove obstacles."
    elif any(k in lower_txt for k in ["kundli", "dosha", "mangal", "shani", "sade"]):
        reply_txt = "Your planetary placements show resilience. Minor malefic aspects can be pacified with simple charity (daan) on Saturdays and chanting Om Namah Shivaya 108 times."
    else:
        reply_txt = f"Thank you for sharing, {session['userName']}. Based on your planetary chart, the current dasha is testing your patience but will yield positive fruits. Have faith in your efforts."

    astro_msg = {
        "id": str(uuid.uuid4())[:6],
        "sender": "astrologer",
        "text": reply_txt,
        "time": datetime.now().strftime("%I:%M %p")
    }
    session["messages"].append(astro_msg)

    return {"status": "ok", "userMessage": user_msg, "astrologerMessage": astro_msg}

@router.post("/{session_id}/audio-sentinel")
async def audio_sentinel_monitor(session_id: str, report: AudioSentinelReport):
    """
    Live Audio Stream Speech Sentinel.
    If speech containing numbers or phone digits is spoken on a call,
    the call is IMMEDIATELY severed/cut down by Privacy Sentinel!
    """
    if session_id not in SESSIONS:
        raise HTTPException(status_code=404, detail="Session not found")

    session = SESSIONS[session_id]
    is_violation, reason = inspect_text_for_contact_leakage(report.transcriptSnippet)

    if is_violation:
        session["status"] = "terminated_by_security"
        termination_event = {
            "id": str(uuid.uuid4())[:6],
            "sender": "system",
            "isAlert": True,
            "text": "🚨 CALL TERMINATED: Prohibited phone number speech detected in audio stream. Personal contact sharing on calls violates AstroPrakash Trust & Safety rules.",
            "time": datetime.now().strftime("%I:%M %p")
        }
        session["messages"].append(termination_event)

        db = get_db()
        if db is not None:
            try:
                await db.security_infractions.insert_one({
                    "sessionId": session_id,
                    "action": "CALL_SEVERED",
                    "reason": reason,
                    "transcript": report.transcriptSnippet,
                    "timestamp": datetime.now().isoformat()
                })
            except Exception:
                pass

        return {
            "terminated": True,
            "action": "DISCONNECT_CALL_IMMEDIATELY",
            "reason": reason,
            "message": "Call severed due to phone number speech detection."
        }

    return {"terminated": False, "status": "clean"}
