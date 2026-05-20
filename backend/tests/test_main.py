from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_home():

    response = client.get("/")

    assert response.status_code == 200

    assert response.json() == {
        "message": "Task Manager API Running"
    }


def test_register():

    response = client.post(
        "/register",
        json={
            "email": "pytest@gmail.com",
            "password": "123456"
        }
    )

    assert response.status_code == 200


def test_login():

    response = client.post(
        "/login",
        data={
            "username": "pytest@gmail.com",
            "password": "123456"
        }
    )

    assert response.status_code == 200

    assert "access_token" in response.json()