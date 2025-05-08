# 📝 Todo App 🚀

**Full‑stack приложение: списки задач с авторизацией, профилем и админ‑панелью**

---

## 📚 Оглавление

* [📄 Описание](#описание)
* [📁 Структура проекта](#структура-проекта)  
* [⚙️ Функционал](#функционал)  
* [🛠️ Технологии](#технологии)  
* [🚀 Установка и запуск](#установка-и-запуск)  

---

## 📄 Описание

Todo App — это SPA‑приложение на **React + Redux Toolkit Query** и бэкенд на **NestJS с TypeORM и MySQL**.  
Пользователи могут регистрироваться, создавать списки задач, редактировать профиль (имя, аватар), а администратор управляет пользователями через отдельную панель.

---

## 📁 Структура проекта

Проект разделён на две директории — `backend` и `frontend`:

### 📦 `backend/`

NestJS‑приложение со следующими модулями:

- 🔐 `auth` — регистрация, логин, JWT‑стратегия  
- 👤 `users` — CRUD пользователей, загрузка аватаров  
- ✅ `todo` — списки задач и задачи внутри них  

Дополнительно:

- ⚙️ Конфигурация TypeORM для MySQL  
- 🖼️ Папка `uploads/` для хранения аватаров  
- 🐳 `Dockerfile`

### 💻 `frontend/`

React SPA с Material‑UI, RTK Query и React Router.

Основные слои:

- 🧠 `features/` — слайсы Redux  
- 🌐 `entities/` — RTK Query API‑сервисы  
- 📄 `pages/` — страницы (TodoList, Profile, Admin и т.п.)  
- 🧩 `widget/` — общие компоненты (Header, Sidebar и др.)  

Приложение собирается через CRA и упаковывается в Docker + Nginx.

### ⚓ `docker-compose.yml`

- Поднимает три сервиса: MySQL, backend и frontend  
- Монтирует `backend/uploads` для хранения аватаров между перезапусками  

---

## ⚙️ Функционал

### 👤 Пользователь

* 🔐 Регистрация / вход по JWT  
* 📝 CRUD для **списков задач** и **задач внутри списка**  
* 🙋 Страница **Профиль**:  
  * ✏️ Просмотр и изменение имени  
  * 🖼️ Загрузка / изменение аватара  
* ⚙️ Страница **Settings**:  
  * 🗑️ Удалить свой аккаунт (с подтверждением)  
* ❓ Страница **FAQ** (Questions)

### 🛡️ Админ

* 🔒 Только панель `/admin`  
* 📋 Таблица всех пользователей:  
  * 🔁 Смена роли (`user` ↔ `admin`)  
  * ❌ Удаление пользователя (со всеми его списками задач)

---

## 🛠️ Технологии

### 🖥️ Frontend  
* ⚛️ React 19  
* 🧭 React Router v7  
* 🎨 Material‑UI v7  
* 🧰 Redux Toolkit + RTK Query  
* 📡 Axios  

### 🧪 Backend  
* 🧱 NestJS v11  
* 🛂 Passport + JWT  
* 🗃️ TypeORM + MySQL  
* 📤 Multer (загрузка аватаров)  
* 📑 Swagger (OpenAPI)  

### ⚙️ DevOps  
* 🐳 Docker & Docker Compose  
* 🌐 Nginx (frontend proxy)

---

## 🚀 Установка и запуск

### 🧪 Локально (без Docker)

1. **Клонируйте репозиторий и перейдите в папку:**

    ```bash
    git clone https://github.com/lissabd/todo-coursework.git
    cd todo-app
    ```

2. **Бэкенд:**

    ```bash
    cd backend
    npm install
    npm run start:dev
    ```

3. **Фронтенд:**

    ```bash
    cd frontend
    npm install
    npm start
    ```

### 🐳 С Docker

```bash
docker-compose up --build
```
