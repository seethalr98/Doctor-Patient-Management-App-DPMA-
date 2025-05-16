import pytest
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    return app.test_client()

def test_get_all_doctors(client):
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUzM2ZiZmU1ZjRjMDJhNmZiOTgzNyIsInJvbGUiOiJkb2N0b3IiLCJleHAiOjE3NDk5NjgyNDJ9.2HczeauaFJfVb1OYTyZ98MBUaETJK8rsHUnvg0hXpXo"  # Replace with a real token
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get('/api/doctors/all', headers=headers)
    assert response.status_code == 200

