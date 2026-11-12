import asyncio, os
from aiogram import Bot, Dispatcher
from aiogram.filters import CommandStart
from aiogram.types import Message, WebAppInfo, ReplyKeyboardMarkup, KeyboardButton

TOKEN = os.environ["TELEGRAM_BOT_TOKEN"]
URL = os.environ.get("WEBAPP_URL", "https://gta6-miniapp.onrender.com")
bot = Bot(TOKEN)
dp = Dispatcher()

@dp.message(CommandStart())
async def start(message: Message):
    keyboard = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="Открыть Leonida Hub", web_app=WebAppInfo(url=URL))]],
        resize_keyboard=True
    )
    await message.answer("Добро пожаловать в Leonida Hub 🌴\nНовости, медиа и обратный отсчёт GTA VI — в одном месте.", reply_markup=keyboard)

async def main():
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
