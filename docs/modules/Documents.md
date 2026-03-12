# Техническое задание: Модуль документов (Documents Module)

## 1. Общая информация

### 1.1. Назначение

Модуль документов управляет файлами, папками, внешними ссылками и внутренними текстовыми документами. Документ — сущность типа `document` в Universal Entity.

### 1.2. Типы документов

- **folder** — папка
- **file** — файл (PDF, изображения, Office)
- **link** — внешняя ссылка (Figma, Google Sheets)
- **internal** — внутренний текстовый документ

## 2. Структура

### 2.1. Папки

- Иерархия: parent_id → folders
- name, tenant_id

### 2.2. Документы

- title, doc_type, folder_id
- file_url — для file
- external_url — для link
- content — для internal (Markdown или HTML)

## 3. Функции

### 3.1. Просмотр

- Дерево папок слева
- Список документов в папке (карточки или таблица)
- Предпросмотр: изображения, PDF, текст

### 3.2. Создание/редактирование

- Модалка или отдельная страница для internal
- Загрузка файла → сохранение в хранилище, запись file_url
- Ссылка — только external_url

### 3.3. Поиск

- По названию, тегам (если есть)

## 4. Ограничения

- Максимальный размер файла: 10 MB
- Форматы: изображения, PDF, XLSX, DOCX

## 5. API

- GET/POST /api/v1/folders
- GET/POST/PATCH /api/v1/documents
- POST /api/v1/documents/upload — загрузка файла

## 6. Компоненты

- DocumentsModule
- FolderTree, DocumentList
- DocumentEditor — для internal
- FilePreview — предпросмотр
