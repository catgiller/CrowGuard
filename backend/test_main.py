from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_home_returns_running_status():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "CrowGuard AI Backend is running"
