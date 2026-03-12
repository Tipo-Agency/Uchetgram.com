# Архитектура системы Uchetgram

## 1. Общая архитектура

### 1.1. Компоненты системы

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    Маркетинговый сайт + Web App (React + Vite)          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Landing    │  │   Modules    │  │   /app       │  │   /admin     │ │
│  │   Pages      │  │   Pages      │  │   (продукт)  │  │   (Super     │ │
│  │   /, /about  │  │   /modules/* │  │              │  │   Admin)     │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ HTTP / JSON (REST)
                                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        Backend (FastAPI, Python)                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Routers    │  │   Services   │  │   Models     │  │   Schemas    │ │
│  │   /api/v1/*  │  │   (логика)   │  │   (ORM)      │  │   (Pydantic) │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
                                        │
                                        │ async SQLAlchemy
                                        ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         PostgreSQL (primary DB)                          │
└─────────────────────────────────────────────────────────────────────────┘
                                        │
                    ┌───────────────────┼───────────────────┐
                    │                   │                   │
                    ▼                   ▼                   ▼
┌───────────────────────┐  ┌───────────────────────┐  ┌──────────────────┐
│   Telegram Bot        │  │   Stripe (биллинг)    │  │   Файловое       │
│   (aiogram, Python)   │  │   Webhooks            │  │   хранилище      │
│   HTTP → Backend API  │  │                       │  │   (S3 / local)   │
└───────────────────────┘  └───────────────────────┘  └──────────────────┘
```

### 1.2. Технологический стек

#### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build**: Vite
- **Routing**: React Router
- **State**: useState / custom hooks (при необходимости — Zustand или аналог)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Charts**: Recharts
- **i18n**: react-i18next

#### Backend
- **Framework**: FastAPI
- **Language**: Python 3.12+
- **DB**: PostgreSQL
- **ORM**: SQLAlchemy (async)
- **Migrations**: Alembic

#### Telegram Bot
- **Library**: aiogram 3+
- **Data Source**: HTTP API backend (не прямой доступ к БД)
- **Scheduler**: APScheduler (при необходимости)

#### Infrastructure
- **Hosting**: VPS или облако
- **Web Server**: Nginx
- **Process Manager**: systemd или Docker

## 2. Маршрутизация фронтенда

### 2.1. Маркетинговые страницы (публичные)

- `/` — главная (Landing)
- `/about`, `/contact`, `/careers`, `/pricing`, `/investors`
- `/solutions`, `/api`, `/help`, `/status`
- `/privacy`, `/terms`
- `/modules`, `/modules/core`, `/modules/planning`, `/modules/processes`, `/modules/users`, `/modules/finance`, `/modules/reporting`, `/modules/inventory`, `/modules/crm`
- `/business/beauty`, `/business/medicine`, `/business/sport`, `/business/auto`, `/business/education`, `/business/retail`, `/business/services`, `/business/restaurant`

### 2.2. Приложение (требуется авторизация)

- `/app` — основное приложение (Dashboard, Sidebar, модули)
- Модули переключаются через Sidebar (состояние или подмаршруты `/app/dashboard`, `/app/finance` и т.д.)

### 2.3. Админка (только Super Admin)

- `/admin` или `admin.uchetgram.com` — управление tenant’ами, пользователями, биллингом

## 3. Потоки данных

### 3.1. Создание задачи

```
User → TaskForm → POST /api/v1/entities (type=task) → Backend → PostgreSQL
                                                        ↓
                                               Activity Log + Telegram
```

### 3.2. Уведомления

```
Event (создание, смена статуса) → NotificationService
                                        ↓
                               Activity Logs (всегда)
                                        +
                               Telegram (по настройкам)
```

### 3.3. Telegram‑бот

```
User → /start, /task, /approve → Bot → HTTP GET/POST Backend API → Response
```

## 4. Multi‑tenancy

- Каждая организация (tenant) изолирована по `tenant_id` во всех таблицах
- Пользователь привязан к tenant через `user.tenant_id`
- Все запросы к API проверяют tenant и не возвращают чужие данные

## 5. Безопасность

### 5.1. Аутентификация
- JWT в заголовке `Authorization` или cookies (httpOnly)
- Refresh token для продления сессии

### 5.2. Авторизация
- Роли: `super_admin`, `admin`, `employee`
- Middleware проверяет JWT и tenant
- RBAC для эндпоинтов

### 5.3. CORS
- В production — только разрешённые домены
