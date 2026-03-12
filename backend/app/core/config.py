import os
from functools import lru_cache
from typing import Any, Dict

from dotenv import load_dotenv


load_dotenv()


class Settings:
  """Application configuration."""

  PROJECT_NAME: str = "Uchetgram API"
  ENV: str = os.getenv("ENV", "local")
  DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"

  # Database
  POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "localhost")
  POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", "5432"))
  POSTGRES_DB: str = os.getenv("POSTGRES_DB", "uchetgram")
  POSTGRES_USER: str = os.getenv("POSTGRES_USER", "uchetgram")
  POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "uchetgram")

  @property
  def database_url(self) -> str:
    return (
      f"postgresql+psycopg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
      f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
    )

  def model_dump(self) -> Dict[str, Any]:
    """Helper to inspect settings when debugging."""
    return {
      "PROJECT_NAME": self.PROJECT_NAME,
      "ENV": self.ENV,
      "DEBUG": self.DEBUG,
      "POSTGRES_HOST": self.POSTGRES_HOST,
      "POSTGRES_PORT": self.POSTGRES_PORT,
      "POSTGRES_DB": self.POSTGRES_DB,
      "POSTGRES_USER": self.POSTGRES_USER,
    }


@lru_cache(maxsize=1)
def get_settings() -> Settings:
  """Return cached application settings instance."""
  return Settings()

