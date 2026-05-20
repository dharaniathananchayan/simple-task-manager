from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.models import user, task
from app.routers.auth import router as auth_router
from app.routers.tasks import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)
app.include_router(auth_router)
app.include_router(task_router)

@app.get("/")
def home():
    return {"message": "Task Manager API Running"}