import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.config import settings
from app.database import connect_to_mongo, close_mongo_connection, get_db
from app.seed_data import ASTROLOGERS_SEED, PRODUCTS_SEED
from app.routes import (
    astrologers, kundli, matching, ai_astrologer,
    horoscope, panchang, mall, consultation, auth, payment
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("astroprakash")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing AstroPrakash Backend...")
    await connect_to_mongo()
    db = get_db()
    if db is not None:
        try:
            count = await db.astrologers.count_documents({})
            if count == 0:
                logger.info("Seeding initial Astrologers and AstroMall data into MongoDB...")
                await db.astrologers.insert_many(ASTROLOGERS_SEED)
                await db.products.insert_many(PRODUCTS_SEED)
        except Exception as e:
            logger.warning(f"Error during seeding: {e}")
    yield
    await close_mongo_connection()

app = FastAPI(
    title="AstroPrakash API",
    description="Vedic Astrology, Kundli, Razorpay Payment & Prakash AI Platform Backend",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router)
app.include_router(payment.router)
app.include_router(astrologers.router)
app.include_router(kundli.router)
app.include_router(matching.router)
app.include_router(ai_astrologer.router)
app.include_router(horoscope.router)
app.include_router(panchang.router)
app.include_router(mall.router)
app.include_router(consultation.router)

@app.get("/")
async def root():
    return {
        "app": "AstroPrakash",
        "tagline": "Divine Light of Vedic Wisdom & AI Astrological Discernment",
        "status": "online",
        "version": "1.0.0"
    }
