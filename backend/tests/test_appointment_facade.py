import pytest
from unittest.mock import patch, MagicMock
from design_patterns.facade.appointment_facade import AppointmentFacade
from models.appointment import Appointment

@pytest.fixture
def mock_data():
    return {
        "doctor": "Dr. Banner",
        "doctorEmail": "bruce.banner@example.com",
        "date": "2025-05-30",
        "time": "4:00 PM",
        "reason": "Stress management"
    }

@pytest.fixture
def mock_user():
    return {
        "id": "test-user-123",
        "email": "hulk@example.com"
    }

@patch("design_patterns.facade.appointment_facade.LoggerNotifier.send")
@patch("design_patterns.facade.appointment_facade.Appointment.save")
def test_facade_sends_full_notification_chain(mock_save, mock_logger_send, mock_data, mock_user):
    # Arrange
    mock_logger_send.return_value = None
    facade = AppointmentFacade(mock_data, mock_user)

    # Act
    result = facade.schedule_appointment()

    # Assert
    expected_msg = (
        "New appointment scheduled on 2025-05-30 at 4:00 PM with patient hulk@example.com"
    )
    mock_logger_send.assert_called_once_with(expected_msg)
    mock_save.assert_called_once()
    assert isinstance(result, Appointment)
    assert result.doctorEmail == mock_data["doctorEmail"]
    assert result.isRead is False
