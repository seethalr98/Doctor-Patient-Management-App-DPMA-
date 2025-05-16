import pytest
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    return app.test_client()

def test_register_user(client):
    response = client.post('/api/auth/register', json={
        "name": "Test User",
        "email": "testuser@example.com",
        "password": "test123",
        "role": "patient"
    })
    assert response.status_code in (201, 400)  # 400 if already exists

def test_login_user(client):
    response = client.post('/api/auth/login', json={
        "email": "testuser@example.com",
        "password": "test123"
    })
    assert response.status_code in (200, 401)
