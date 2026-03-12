from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import api_router
from app.core.config import get_settings


settings = get_settings()

app = FastAPI(
  title=settings.PROJECT_NAME,
  debug=settings.DEBUG,
  version="0.1.0",
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],  # TODO: restrict in production
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.get("/", summary="Root")
async def root() -> dict:
  return {"message": "Uchetgram backend is running"}

