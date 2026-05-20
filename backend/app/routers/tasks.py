from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.task import Task
from app.models.user import User
from app.auth.jwt_handler import get_current_user

router = APIRouter()


@router.post("/tasks")
def create_task(
    title: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    new_task = Task(
        title=title,
        owner_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return {
        "message": "Task created successfully"
    }

@router.get("/tasks")
def get_tasks(
    completed: bool | None = None,
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    query = db.query(Task).filter(
        Task.owner_id == current_user.id
    )

    if completed is not None:
        query = query.filter(
            Task.completed == completed
        )

    tasks = query.offset(skip).limit(limit).all()

    return tasks

@router.get("/tasks/{task_id}")
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        return {"message": "Task not found"}

    return task

@router.put("/tasks/{task_id}")
def update_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        return {"message": "Task not found"}

    task.completed = not task.completed

    db.commit()

    return {
        "message": "Task updated successfully"
    }

@router.delete("/tasks/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == current_user.id
    ).first()

    if not task:
        return {"message": "Task not found"}

    db.delete(task)

    db.commit()

    return {
        "message": "Task deleted successfully"
    }