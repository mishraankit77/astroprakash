import os

class Settings:
    PROJECT_NAME: str = "AstroPrakash Backend"
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://127.0.0.1:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "astroprakash")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    RAZORPAY_KEY_ID: str = os.getenv("RAZORPAY_KEY_ID", "rzp_test_astroprakash99")
    RAZORPAY_KEY_SECRET: str = os.getenv("RAZORPAY_KEY_SECRET", "astroprakash_secret_demo")
    PORT: int = int(os.getenv("PORT", 8000))

settings = Settings()
