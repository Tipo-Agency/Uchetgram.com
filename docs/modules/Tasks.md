# Техническое задание: Модуль задач (Tasks Module)

## 1. Общая информация

### 1.1. Назначение

Модуль задач управляет задачами, идеями и заявками. Задачи — это сущности типа `task` в Universal Entity. Поддерживаются статусы, приоритеты, назначение исполнителей, комментарии и вложения.

### 1.2. Типы сущностей

- **task** — обычная задача
- **idea** — идея (беклог)
- **feature** — функция
- **purchase_request** — заявка на покупку (связь с Finance)

## 2. Функциональные требования

### 2.1. Создание задачи

#### Обязательные поля
- title — название
- status — из справочника statuses
- priority — из справочника priorities
- startDate, endDate — даты (YYYY-MM-DD)
- entityType — task | idea | feature | purchase_request

#### Опциональные поля
- description — описание
- assigneeId — исполнитель
- projectId — проект
- dealId — связь со сделкой
- processId, processInstanceId, stepId — связь с бизнес‑процессом
- для purchase_request: amount, departmentId, categoryId, requesterId

#### Автоматические поля
- id, createdAt, updatedAt, createdByUserId

### 2.2. Редактирование

- При смене статуса — activity log и Telegram (если настроено)
- При смене исполнителя — уведомление новому
- Мягкое удаление: isArchived = true

### 2.3. Комментарии и вложения

- Комментарии: текст, автор, дата
- Вложения: файл (URL) или ссылка на документ
- Ограничение размера файла: 10 MB

## 3. Представления

### 3.1. Канбан

- Колонки = статусы
- Карточки перетаскиваются между колонками
- При перетаскивании обновляется status

### 3.2. Список (таблица)

- Колонки: название, статус, приоритет, исполнитель, даты, действия
- Фильтры: статус, исполнитель, проект, дата
- Сортировка: по дате, приоритету, статусу

## 4. Интеграции

- CRM: dealId — связь задачи со сделкой
- Finance: purchase_request — заявка на покупку
- Processes: processId, stepId — задача как шаг процесса

## 5. API

- GET /api/v1/entities?type=task
- POST /api/v1/entities (body: type=task, …)
- PATCH /api/v1/entities/:id
- DELETE /api/v1/entities/:id (мягкое)
- POST /api/v1/entities/:id/comments
- POST /api/v1/entities/:id/attachments

## 6. Компоненты фронтенда

- TasksModule — основной модуль
- TasksView — список/канбан
- TaskModal — создание/редактирование
- EntityCard — отображение карточки задачи
