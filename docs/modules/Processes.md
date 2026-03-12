# Техническое задание: Модуль бизнес-процессов (Processes Module)

## 1. Общая информация

### 1.1. Назначение

Модуль управляет шаблонами бизнес‑процессов и их экземплярами. Процесс — последовательность шагов; каждый шаг может создавать задачу. Поддерживается ветвление (например, одобрить/отклонить).

### 1.2. Сущности

- process_templates — шаблоны
- process_instances — запущенные экземпляры

## 2. Шаблон процесса

### 2.1. Шаги (steps)

- id, title, description
- assigneeType: user | position | department
- assigneeId
- order — порядок
- nextStepId — следующий шаг (линейный поток)
- branches — { "Approved": "step_id_3", "Rejected": "step_id_4" } для ветвления
- requiresApproval — нужен ли апрув

### 2.2. Логика

- Шаг выполнен → создаётся задача для следующего шага (или выбор ветви)
- При завершении задачи — переход на nextStep или по ветви

## 3. Экземпляр процесса

- process_template_id
- entity_id — головная сущность (например, заявка)
- current_step_id — текущий шаг
- status: active | completed | cancelled
- started_at, completed_at

## 4. UI

- Список шаблонов
- Визуализация workflow: шаги + связи
- Карточка экземпляра: процесс, текущий шаг, история
- Запуск процесса из сущности (кнопка «Запустить процесс»)

## 5. API

- GET/POST /api/v1/process-templates
- GET/POST /api/v1/process-instances
- POST /api/v1/process-instances/:id/advance — переход на следующий шаг
