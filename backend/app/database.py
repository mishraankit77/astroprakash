import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

logger = logging.getLogger(__name__)

class Database:
    client: AsyncIOMotorClient = None
    db = None

db_instance = Database()

async def connect_to_mongo():
    try:
        db_instance.client = AsyncIOMotorClient(
            settings.MONGODB_URL,
            serverSelectionTimeoutMS=3000
        )
        db_instance.db = db_instance.client[settings.DATABASE_NAME]
        # Quick ping test
        await db_instance.db.command("ping")
        logger.info(f"Connected to MongoDB at {settings.MONGODB_URL}, DB: {settings.DATABASE_NAME}")
    except Exception as e:
        logger.warning(f"Could not connect to MongoDB: {e}. Fallback in-memory state will be used if needed.")

async def close_mongo_connection():
    if db_instance.client:
        db_instance.client.close()
        logger.info("MongoDB connection closed.")

def get_db():
    return db_instance.db
