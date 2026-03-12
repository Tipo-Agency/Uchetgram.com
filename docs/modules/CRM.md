# Техническое задание: Модуль CRM (Sales Module)

## 1. Общая информация

### 1.1. Назначение

Модуль CRM управляет клиентами, сделками, воронками продаж и дебиторской задолженностью. Сделки и лиды — сущности типа `lead`/`deal` в Universal Entity.

### 1.2. Основные сущности

- Клиенты (clients)
- Сделки (deals) — разовые или договоры
- Воронки продаж (sales_funnels) — стадии
- Дебиторская задолженность (accounts_receivable)

## 2. Клиенты

### 2.1. Поля

- name, contact_person, phone, email, telegram, instagram
- company_name, company_info, notes
- funnel_id — в какой воронке

### 2.2. Действия

- Создание, редактирование, архивация
- Привязка к сделкам

## 3. Сделки

### 3.1. Поля

- client_id, recurring (договор/разовая)
- number — номер договора/сделки
- amount, currency
- status: pending, paid, overdue, active, completed
- funnel_id, stage — стадия воронки
- assignee_id — ответственный
- date, due_date, paid_amount, paid_date
- для договоров: start_date, end_date, payment_day

### 3.2. Процесс

- Создание сделки/договора
- Перемещение по воронке (смена stage)
- Оплата (обновление paid_amount, paid_date)
- Дебиторка — при overdue

## 4. Воронки

- Настраиваемые стадии (stages)
- Каждая стадия: id, name, order, color
- Сделки отображаются в колонках по стадиям

## 5. Дебиторская задолженность

- Связана с deal_id
- amount, due_date, status (current, overdue, paid)
- paid_amount, paid_date

## 6. API

- GET/POST /api/v1/clients
- GET/POST/PATCH /api/v1/deals
- GET/POST /api/v1/sales-funnels
- GET/POST /api/v1/accounts-receivable

## 7. Компоненты

- SalesModule
- Воронка: колонки = стадии, карточки сделок
- ClientList, DealModal, ClientModal
