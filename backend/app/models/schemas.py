from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class KundliRequest(BaseModel):
    name: str = Field(..., example="Rohit Sharma")
    gender: str = Field("male", example="male")
    dob: str = Field(..., example="1995-08-15")
    tob: str = Field(..., example="14:30")
    place: str = Field("New Delhi, India", example="New Delhi, India")
    lat: Optional[float] = 28.6139
    lon: Optional[float] = 77.2090

class GunaMilanRequest(BaseModel):
    groomName: str = Field(..., example="Aarav Sharma")
    groomDob: str = Field(..., example="1994-06-12")
    groomTob: str = Field(..., example="10:15")
    groomPlace: str = Field("Delhi", example="Delhi")
    brideName: str = Field(..., example="Ananya Verma")
    brideDob: str = Field(..., example="1996-09-24")
    brideTob: str = Field(..., example="18:45")
    bridePlace: str = Field("Mumbai", example="Mumbai")

class AIChatRequest(BaseModel):
    message: str = Field(..., example="When will I get a job promotion?")
    userContext: Optional[Dict[str, Any]] = None

class Astrologer(BaseModel):
    id: str
    name: str
    avatar: str
    skills: List[str]
    languages: List[str]
    experienceYears: int
    rating: float
    totalOrders: int
    pricePerMinute: int
    discountedPrice: int
    isOnline: bool
    isBusy: bool
    bio: str
    category: str  # Vedic, Tarot, Numerology, Vastu

class ConsultationMessage(BaseModel):
    sender: str
    text: str
    timestamp: str

class StartConsultationRequest(BaseModel):
    astrologerId: str
    type: str  # chat or call
    userName: str
    userPhone: Optional[str] = None
