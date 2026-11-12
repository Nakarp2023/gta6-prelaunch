# GTA VI PRE-LAUNCH — Leonida Hub

Отдельный проект Telegram Mini App и бота, посвящённый GTA VI.

## Структура
- `frontend/` — веб-приложение (статический сайт)
- `backend/` — API на FastAPI
- `bot/` — Telegram-бот (polling)
- `render.yaml` — Blueprint Render для трёх независимых сервисов

## Развёртывание
1. Создать сервисы через Blueprint Render из `render.yaml`.
2. Указать `TELEGRAM_BOT_TOKEN` в переменных бота Render.
3. В Mini App задать URL API в настройках профиля.

Секреты не хранить в репозитории.