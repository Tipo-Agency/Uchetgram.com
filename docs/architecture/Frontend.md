# Архитектура фронтенда Uchetgram

## 1. Структура проекта

```
src/
├── main.tsx              # Точка входа, BrowserRouter
├── App.tsx               # Routes, маршрутизация
├── index.css             # Глобальные стили, Tailwind
├── i18n/                 # Локализация (ru, en, uz)
├── components/
│   ├── ui/               # Атомарные компоненты (Button, Card, Input)
│   ├── layout/           # Sidebar, Header
│   └── entities/         # EntityCard и др. для Universal Entity
├── modules/              # Функциональные модули приложения
│   ├── landing/          # LandingPage (главная)
│   ├── dashboard/
│   ├── sales/
│   ├── finance/
│   ├── documents/
│   ├── tasks/
│   ├── processes/
│   ├── analytics/
│   ├── marketplace/
│   └── settings/
├── pages/                # Страницы-заглушки для маркетинга (опционально)
└── types/                # TypeScript типы и интерфейсы
```

## 2. Роутинг

- React Router: `Routes`, `Route`, `Navigate`, `useNavigate`
- Главная `/` — LandingPage
- Приложение `/app` — AppShell (Sidebar + Header + контент модуля)
- Модуль выбирается через Sidebar (state `activeModule`) и рендерит соответствующий `*Module`
- Fallback `*` → `Navigate to="/"`

## 3. Модули приложения

Каждый модуль — отдельная папка с компонентом `*Module.tsx`:

- `DashboardModule` — рабочий стол
- `SalesModule` — CRM, воронка
- `FinanceModule` — финансы
- `DocumentsModule` — документы
- `TasksModule` — задачи
- `ProcessesModule` — бизнес‑процессы
- `AnalyticsModule` — аналитика
- `MarketplaceModule` — маркетплейс
- `SettingsModule` — настройки

## 4. Компоненты

### 4.1. UI (components/ui)
- Button — кнопки (primary, outline, ghost, danger)
- Card — карточки
- Input — поля ввода (при необходимости)
- Logo — логотип Uchetgram

### 4.2. Layout (components/layout)
- Sidebar — навигация по модулям, сворачивание
- Header — заголовок, поиск, уведомления, профиль

### 4.3. Entities (components/entities)
- EntityCard — карточка универсальной сущности (меняет иконку и стиль по типу)

## 5. Типы (types/)

- `ModuleId` — идентификаторы модулей
- `UniversalEntity`, `EntityType`, `EntityPriority`, `TaskStatus`
- `Task`, `Transaction`, `User`, `AppDocument`, `ProcessInstance` и т.д.
- Все типы синхронизированы с Pydantic‑схемами backend

## 6. Стили и дизайн

- Tailwind CSS 4
- Цвета: Primary `#1356A3`, Accent `#F27D26`, фон `#F8FAFC`
- Шрифты: Inter (UI), JetBrains Mono (данные)
- См. `ui/ENTITY_UI_GUIDE.md` для паттернов карточек, таблиц, модалок

## 7. Локализация

- react-i18next
- Файлы: `i18n/locales/ru.json`, `en.json`, `uz.json`
- Ключи: `nav.dashboard`, `landing.hero.title` и т.д.

## 8. API‑взаимодействие

- Пока моковые данные в модулях
- Дальше: централизованный API‑клиент (fetch или axios) с базовым URL из env
- Все запросы с JWT в заголовке
