from fastapi.testclient import TestClient
from app.main import app
from app.models.item import Item
from app.schemas.item import ItemCreate, ItemUpdate

client = TestClient(app)

def test_create_item():
    response = client.post("/api/v1/items/", json={"name": "Test Item", "description": "A test item", "price": 10.0})
    assert response.status_code == 201
    assert response.json()["name"] == "Test Item"

def test_read_item():
    response = client.get("/api/v1/items/1")
    assert response.status_code == 200
    assert "name" in response.json()

def test_update_item():
    response = client.put("/api/v1/items/1", json={"name": "Updated Item", "description": "An updated test item", "price": 15.0})
    assert response.status_code == 200
    assert response.json()["name"] == "Updated Item"

def test_delete_item():
    response = client.delete("/api/v1/items/1")
    assert response.status_code == 204

def test_read_nonexistent_item():
    response = client.get("/api/v1/items/999")
    assert response.status_code == 404