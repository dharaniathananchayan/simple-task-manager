

# Task Manager

**Full-Stack Web Application — FastAPI + JWT + SQLite**
Author: Dharania

---

## Features

- User Registration & Login Authentication
- JWT Token-based Authentication
- Create, View, and Manage Tasks
- Mark / Unmark Tasks as Completed
- Delete Tasks
- Protected Routes
- SQLite Database with SQLAlchemy ORM
- Responsive Frontend UI

---

## Tech Stack

**Backend**
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib
- Bcrypt

**Frontend**
- HTML
- CSS
- JavaScript

---

## Project Structure

```
Task Manager/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   │   ├── hashing.py
│   │   │   └── jwt_handler.py
│   │   ├── models/
│   │   │   ├── task.py
│   │   │   └── user.py
│   │   ├── routers/
│   │   │   ├── auth.py
│   │   │   └── task.py
│   │   ├── database.py
│   │   └── main.py
│   ├── .env
│   └── tasks.db
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

## Installation

### 1. Clone Repository
```bash
git clone <your-github-repository-link>
```

### 2. Open Project Folder
```bash
cd Task-Manager
```

### 3. Create Virtual Environment
```bash
python -m venv venv
```

### 4. Activate Virtual Environment

**Windows**
```bash
.\venv\Scripts\Activate
```

### 5. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## Environment Variables

Create a `.env` file inside the `backend/` folder:

```env
SECRET_KEY=your_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

## Running the Application

### Backend Server

```bash
cd backend
uvicorn app.main:app --reload
```

- **Backend:** `http://127.0.0.1:8000`
- **Swagger Docs:** `http://127.0.0.1:8000/docs`

### Frontend

Open `frontend/index.html` in a browser, or use the VS Code Live Server extension.

---

## API Endpoints

**Auth**
- POST `/register` — Register user
- POST `/login` — Login user

**Tasks**
- POST `/tasks` — Create task
- GET `/tasks` — Get all tasks
- GET `/tasks/{task_id}` — Get single task
- PUT `/tasks/{task_id}` — Toggle task completion
- DELETE `/tasks/{task_id}` — Delete task

## Security Features

- JWT Authentication with signed tokens
- Password hashing using Bcrypt
- Protected routes — all task endpoints require a valid token
- Environment variables managed via `.env`

---

## Frontend Features

- Responsive UI for desktop and mobile
- Register / Login navigation
- Checkbox-based task completion toggle
- Strike-through styling for completed tasks
- One-click task deletion
- Persistent login using browser Local Storage

---

## Database

SQLite database stored at `backend/tasks.db`.

---

## Dependencies

```
fastapi
uvicorn
sqlalchemy
python-jose
passlib
bcrypt
python-dotenv
python-multipart
```

Install with:
```bash
pip install -r requirements.txt
```

---

## Future Improvements

- Dark Mode
- Task Categories
- Due Dates
- Drag and Drop Tasks
- Task Search
- Cloud Deployment

---

## Author

**Dharania**