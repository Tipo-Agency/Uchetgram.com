import asyncio
import logging
import os

from aiogram import Bot, Dispatcher, Router, types
from aiogram.filters import CommandStart
from dotenv import load_dotenv


load_dotenv()

logger = logging.getLogger(__name__)

router = Router()


@router.message(CommandStart())
async def cmd_start(message: types.Message) -> None:
  await message.answer(
    "Привет! Я бот Uchetgram.\n"
    "В дальнейшем здесь появятся быстрые команды для задач, заявок и аналитики."
  )


async def main() -> None:
  token = os.getenv("TELEGRAM_BOT_TOKEN")
  if not token:
    raise RuntimeError("TELEGRAM_BOT_TOKEN is not set")

  bot = Bot(token=token, parse_mode="HTML")
  dp = Dispatcher()
  dp.include_router(router)

  logger.info("Starting Uchetgram Telegram bot")
  await dp.start_polling(bot)


if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO)
  asyncio.run(main())

