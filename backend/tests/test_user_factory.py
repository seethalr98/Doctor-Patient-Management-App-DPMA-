import pytest
from design_patterns.factory.user_factory import UserFactory
from models.user import User

def test_create_doctor_user():
    user = UserFactory.create_user(
        role="doctor",
        name="Dr. Alice",
        email="alice@clinic.com",
        password="password123"
    )

    assert isinstance(user, User)
    assert user.name == "Dr. Alice"
    assert user.email == "alice@clinic.com"
    assert user.role == "doctor"
    assert user.password is not None  # should be hashed

def test_create_patient_user():
    user = UserFactory.create_user(
        role="patient",
        name="Bob Patient",
        email="bob@example.com",
        password="secure123",
        phonenumber="9876543210",
        address="123 Wellness Ave"
    )

    assert isinstance(user, User)
    assert user.name == "Bob Patient"
    assert user.email == "bob@example.com"
    assert user.role == "patient"
    assert user.phonenumber == "9876543210"
    assert user.address == "123 Wellness Ave"
    assert user.password is not None

def test_invalid_role_raises_error():
    with pytest.raises(ValueError) as exc:
        UserFactory.create_user(
            role="admin",
            name="Invalid User",
            email="invalid@example.com",
            password="test123"
        )
    assert "Invalid role type" in str(exc.value)