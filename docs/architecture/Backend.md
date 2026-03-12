# Архитектура бэкенда Uchetgram

## 1. Структура проекта

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app, CORS, routers
│   ├── core/
│   │   └── config.py        # Settings, env vars
│   ├── db/
│   │   └── session.py       # AsyncSession, get_db
│   ├── models/              # SQLAlchemy models
│   │   ├── user.py
│   │   ├── tenant.py
│   │   ├── entity.py        # Universal Entity
│   │   └── ...
│   ├── schemas/             # Pydantic schemas
│   │   ├── user.py
│   │   ├── entity.py
│   │   └── ...
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── health.py
│   │       ├── auth.py
│   │       ├── entities.py
│   │       ├── finance.py
│   │       └── ...
│   └── services/            # Бизнес-логика
│       ├── entity_service.py
│       └── ...
├── requirements.txt
└── alembic/                 # Миграции (при добавлении)
```

## 2. API

### 2.1. Базовый URL
- `/api` — префикс для всего API
- `/api/v1` — версия v1

### 2.2. Эндпоинты

- `GET /` — проверка работы
- `GET /api/v1/health` — health check
- `POST /api/v1/auth/login` — вход
- `POST /api/v1/auth/refresh` — обновление токена
- `GET /api/v1/entities` — список сущностей (фильтр по type, tenant)
- `POST /api/v1/entities` — создание сущности
- `GET /api/v1/entities/:id` — получение по ID
- `PATCH /api/v1/entities/:id` — обновление
- `DELETE /api/v1/entities/:id` — удаление (мягкое)

И далее по модулям: `/api/v1/tasks`, `/api/v1/finance`, `/api/v1/crm` и т.д.

## 3. Конфигурация

Переменные окружения (.env):
- `ENV` — local | staging | production
- `DEBUG` — true | false
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- `JWT_SECRET`
- `TELEGRAM_BOT_TOKEN` (для бота, не для backend)

## 4. База данных

- PostgreSQL
- Async SQLAlchemy
- Все таблицы с `tenant_id` для multi-tenancy
- См. `database/DATABASE_SCHEMA.md` для схемы

## 5. Аутентификация и авторизация

- JWT: access token (короткий) + refresh token
- Middleware: проверка JWT, извлечение user_id и tenant_id
- Зависимость `get_current_user` для защищённых эндпоинтов
- Роли: super_admin, admin, employee

## 6. Запуск

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
