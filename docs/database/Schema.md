# Схема базы данных Uchetgram

## 1. Общая информация

### 1.1. База данных
- **Тип**: PostgreSQL
- **Режим**: Multi-tenant (изоляция по `tenant_id`)
- **Правила именования**: snake_case для таблиц и колонок

### 1.2. Базовые поля
Во все основные таблицы добавлены:
- `id` — UUID primary key
- `tenant_id` — UUID, ссылка на tenants (кроме системных таблиц)
- `created_at` — timestamp with time zone
- `updated_at` — timestamp with time zone
- `is_archived` — boolean, мягкое удаление

---

## 2. Таблицы

### 2.1. Организации и пользователи

#### `tenants`
Организации (компании) в SaaS.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| name | VARCHAR(255) | Название организации |
| slug | VARCHAR(100) | Уникальный slug (для поддоменов) |
| plan | VARCHAR(50) | Тариф (free, business, pro) |
| is_active | BOOLEAN | Активна ли организация |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### `users`
Пользователи системы.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK → tenants (NULL для super_admin) |
| email | VARCHAR(255) | Логин |
| password_hash | VARCHAR(255) | Хеш пароля (bcrypt) |
| name | VARCHAR(255) | Имя |
| role | VARCHAR(50) | admin, employee |
| avatar_url | VARCHAR(500) | URL аватара |
| telegram_user_id | BIGINT | ID в Telegram (для бота) |
| is_archived | BOOLEAN | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

#### `user_sessions`
Сессии (для JWT refresh или хранения токенов).

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| user_id | UUID | FK → users |
| token_hash | VARCHAR(255) | Хеш токена |
| expires_at | TIMESTAMPTZ | |
| created_at | TIMESTAMPTZ | |

---

### 2.2. Универсальная сущность

#### `entities`
Базовая таблица для универсальных сущностей.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK → tenants |
| type | VARCHAR(50) | task, lead, deal, finance_request, transaction, document, process, message |
| title | VARCHAR(500) | Заголовок |
| description | TEXT | Описание |
| status | VARCHAR(100) | Статус (из справочника или свободный) |
| priority | VARCHAR(50) | low, medium, high, critical |
| creator_id | UUID | FK → users |
| assignee_id | UUID | FK → users (nullable) |
| metadata | JSONB | Доп. атрибуты (сумма, даты, ссылки на другие сущности) |
| parent_id | UUID | FK → entities (для подзадач, шагов) |
| is_archived | BOOLEAN | |
| created_at | TIMESTAMPTZ | |
| updated_at | TIMESTAMPTZ | |

**Примечание**: `metadata` хранит специфичные для типа поля, например:
- task: due_date, tags, subtasks
- deal: amount, currency, funnel_stage_id, client_id
- finance_request: amount, category_id, requester_id
- document: doc_type, file_url, folder_id

#### `entity_comments`
Комментарии к сущностям.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| entity_id | UUID | FK → entities |
| user_id | UUID | FK → users |
| content | TEXT | Текст комментария |
| created_at | TIMESTAMPTZ | |

#### `entity_attachments`
Вложения к сущностям.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| entity_id | UUID | FK → entities |
| type | VARCHAR(20) | file, link |
| url | VARCHAR(1000) | URL или путь к файлу |
| filename | VARCHAR(255) | Имя файла |
| created_at | TIMESTAMPTZ | |

---

### 2.3. Справочники

#### `statuses`
Статусы (задач, сделок и т.д.).

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(100) | |
| color | VARCHAR(50) | Цвет (Tailwind класс или hex) |
| entity_type | VARCHAR(50) | task, deal, … (для какой сущности) |
| order | INT | Порядок отображения |

#### `priorities`
Приоритеты.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(100) | |
| color | VARCHAR(50) | |
| order | INT | |

#### `departments`
Отделы.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(255) | |
| description | TEXT | |

#### `finance_categories`
Категории расходов/доходов.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(255) | |
| type | VARCHAR(20) | fixed, percent |
| color | VARCHAR(50) | |

#### `sales_funnels`
Воронки продаж.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(255) | |
| stages | JSONB | [{ id, name, order, color }] |

---

### 2.4. Клиенты и сделки

#### `clients`
Клиенты (контакты).

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(255) | |
| contact_person | VARCHAR(255) | |
| phone | VARCHAR(50) | |
| email | VARCHAR(255) | |
| telegram | VARCHAR(100) | |
| company_name | VARCHAR(255) | |
| notes | TEXT | |
| funnel_id | UUID | FK → sales_funnels |

#### `deals`
Сделки (связаны с entities через metadata или отдельная таблица).

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| entity_id | UUID | FK → entities (опционально) |
| client_id | UUID | FK → clients |
| funnel_id | UUID | FK → sales_funnels |
| stage_id | VARCHAR(100) | ID стадии в funnel.stages |
| amount | DECIMAL(15,2) | |
| currency | VARCHAR(10) | |
| status | VARCHAR(50) | pending, paid, overdue, … |
| assignee_id | UUID | FK → users |

---

### 2.5. Финансы

#### `transactions`
Транзакции (движение денег).

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| date | DATE | |
| amount | DECIMAL(15,2) | |
| type | VARCHAR(20) | income, expense |
| category_id | UUID | FK → finance_categories |
| description | VARCHAR(500) | |
| source | VARCHAR(50) | bank, manual, 1c |
| entity_id | UUID | FK → entities (если связана с заявкой) |
| is_reconciled | BOOLEAN | |

#### `finance_plans`
Планы по периодам.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| period | VARCHAR(20) | YYYY-MM |
| planned_income | DECIMAL(15,2) | |
| planned_expenses | DECIMAL(15,2) | |
| categories | JSONB | { categoryId: { planned, actual } } |

---

### 2.6. Документы

#### `folders`
Папки для документов.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| name | VARCHAR(255) | |
| parent_id | UUID | FK → folders |

#### `documents`
Документы (могут быть связаны с entities или отдельно).

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| entity_id | UUID | FK → entities (если документ — сущность) |
| title | VARCHAR(500) | |
| doc_type | VARCHAR(20) | folder, file, link, internal |
| folder_id | UUID | FK → folders |
| file_url | VARCHAR(1000) | |
| external_url | VARCHAR(1000) | |
| content | TEXT | Для внутренних документов |

---

### 2.7. Бизнес-процессы

#### `process_templates`
Шаблоны процессов.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| title | VARCHAR(255) | |
| description | TEXT | |
| steps | JSONB | [{ id, title, assigneeType, assigneeId, nextStepId, branches }] |

#### `process_instances`
Экземпляры запущенных процессов.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| process_template_id | UUID | FK |
| entity_id | UUID | FK → entities (головная сущность) |
| current_step_id | VARCHAR(100) | |
| status | VARCHAR(50) | active, completed, cancelled |
| started_at | TIMESTAMPTZ | |
| completed_at | TIMESTAMPTZ | |

---

### 2.8. Уведомления

#### `activity_logs`
Лента активности.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| user_id | UUID | FK → users (кто сделал) |
| target_user_id | UUID | FK → users (для кого уведомление) |
| action | VARCHAR(100) | created_task, changed_status, … |
| entity_type | VARCHAR(50) | |
| entity_id | UUID | |
| details | JSONB | |
| read | BOOLEAN | |
| created_at | TIMESTAMPTZ | |

#### `notification_prefs`
Настройки уведомлений пользователя.

| Поле | Тип | Описание |
|------|-----|----------|
| id | UUID | PK |
| tenant_id | UUID | FK |
| user_id | UUID | FK → users |
| event_type | VARCHAR(50) | new_task, status_change, … |
| telegram_personal | BOOLEAN | |
| telegram_group | BOOLEAN | |

---

## 3. Индексы

Рекомендуемые индексы:
- `entities(tenant_id, type, is_archived)`
- `entities(tenant_id, assignee_id, is_archived)`
- `entities(tenant_id, status, is_archived)`
- `transactions(tenant_id, date)`
- `activity_logs(tenant_id, target_user_id, read)`
- `users(tenant_id, email)`

## 4. Миграции

- Alembic для версионирования схемы
- Каждое изменение схемы — отдельная миграция
- Не удалять колонки сразу, помечать deprecated
