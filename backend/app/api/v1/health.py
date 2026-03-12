from fastapi import APIRouter

from app.core.config import get_settings


router = APIRouter()


@router.get("/health", summary="Health check")
async def health_check() -> dict:
  settings = get_settings()
  return {
    "status": "ok",
    "service": settings.PROJECT_NAME,
    "environment": settings.ENV,
  }

