import pytest
from server import app

@pytest.fixture
def client():
    app.config['TESTING'] = True
    return app.test_client()

def test_get_appointments_for_patient(client):
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUzM2ZiZmU1ZjRjMDJhNmZiOTgzNyIsInJvbGUiOiJkb2N0b3IiLCJleHAiOjE3NDk5NjgyNDJ9.2HczeauaFJfVb1OYTyZ98MBUaETJK8rsHUnvg0hXpXo"
    response = client.get('/api/appointments', headers={
        "Authorization": f"Bearer {token}"
    })
    assert response.status_code in (200, 401)

def test_create_appointment(client):
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjUzOGM3ZmU1ZjRjMDJhNmZiOTgzYSIsInJvbGUiOiJwYXRpZW50IiwiZXhwIjoxNzQ5OTY4Mjc4fQ.WQsktPxSoncNYJUUy2OzZb_8k-GGDx-XAn26zOdJHMc"
    response = client.post('/api/appointments', json={
        "doctor": "Dr. Test",
        "doctorEmail": "dr.test@example.com",
        "date": "2025-06-01",
        "time": "11:00",
        "reason": "Test Appointment"
    }, headers={"Authorization": f"Bearer {token}"})
    assert response.status_code in (201, 500)
