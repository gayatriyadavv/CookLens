"""CookLens Configuration"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    # -----------------------------
    # App
    # -----------------------------
    APP_NAME: str = "CookLens API"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True

    # -----------------------------
    # CORS
    # -----------------------------
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]

    # -----------------------------
    # AI Configuration — Gemini
    # -----------------------------
    GEMINI_API_KEY: Optional[str] = None

    AI_BASE_URL: str = (
        "https://generativelanguage.googleapis.com/v1beta/openai/"
    )

    AI_MODEL: str = "gemini-1.5-flash"

    USE_MOCK_DATA: bool = False

    # -----------------------------
    # Upload
    # -----------------------------
    UPLOAD_DIR: str = "uploads"
    MAX_FILE_SIZE: int = 10 * 1024 * 1024  # 10MB

    # -----------------------------
    # Pydantic Settings Config
    # -----------------------------
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()

print("GEMINI API KEY:", settings.GEMINI_API_KEY)