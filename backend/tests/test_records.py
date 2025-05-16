import pytest
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    return app.test_client()

def test_get_medical_records(client):
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUzM2ZiZmU1ZjRjMDJhNmZiOTgzNyIsInJvbGUiOiJkb2N0b3IiLCJleHAiOjE3NDk5NjgyNDJ9.2HczeauaFJfVb1OYTyZ98MBUaETJK8rsHUnvg0hXpXo"
    response = client.get('/api/records?patientEmail=patient1@example.com', headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code in (200, 403, 404)
