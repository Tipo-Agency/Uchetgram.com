# Техническое задание: Модуль финансов (Finance Module)

## 1. Общая информация

### 1.1. Назначение

Модуль финансов управляет операциями, планированием, заявками на выплаты и категориями расходов/доходов.

### 1.2. Компоненты

- Обзор — баланс, P&L, план‑факт
- Операции — транзакции (импорт банка, ручной ввод)
- Планирование — бюджеты по статьям
- Заявки — заявки на выплаты с согласованием

## 2. Отделы и категории

### 2.1. Departments

- name, description, head_id

### 2.2. Finance Categories

- name, type (fixed | percent), color
- fixed — фиксированная сумма, percent — процент от дохода

## 3. Транзакции

### 3.1. Поля

- date, amount, type (income | expense)
- category_id, description
- source: bank, manual, 1c
- entity_id — связь с заявкой (если есть)
- is_reconciled — сверено ли с банком

### 3.2. Действия

- Ручное создание
- Импорт выписки (будущее)
- Сверка с 1С (будущее)

## 4. Планирование

### 4.1. Finance Plan

- period (YYYY-MM)
- planned_income, planned_expenses
- categories: { categoryId: { planned, actual } }

### 4.2. Документы плана

- department_id, period, income, expenses (по статьям)
- status: created | conducted | approved

## 5. Заявки на покупку

### 5.1. Связь с Tasks

- Заявка = entity type purchase_request
- Поля: requester_id, department_id, category_id, amount, description

### 5.2. Статусы

- pending — на рассмотрении
- approved — одобрена
- rejected — отклонена
- deferred — отложена

### 5.3. Процесс

- Создание сотрудником → уведомление руководителю
- Одобрение/отклонение → уведомление заявителю

## 6. API

- GET/POST /api/v1/departments
- GET/POST /api/v1/finance-categories
- GET/POST /api/v1/transactions
- GET/PUT /api/v1/finance-plans
- GET/POST /api/v1/entities?type=purchase_request

## 7. Компоненты

- FinanceModule
- Табы: Обзор, Операции, Планирование, Заявки
- TransactionTable, PurchaseRequestModal, FinancePlanView
