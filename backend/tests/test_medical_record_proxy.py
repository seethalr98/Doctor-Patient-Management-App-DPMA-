import pytest
from design_patterns.proxy.medical_record_proxy import RealMedicalRecord, MedicalRecordProxy

@pytest.fixture
def sample_record():
    return {
        "patientId": "123",
        "doctorId": "456",
        "date": "2025-05-15",
        "diagnosis": "Flu",
        "prescription": "Rest and fluids",
        "notes": "Follow up in 5 days"
    }

def test_real_medical_record_view(sample_record):
    record = RealMedicalRecord(sample_record)
    assert record.view() == sample_record

def test_medical_record_proxy_as_doctor(sample_record):
    user = {"id": "doc123", "role": "doctor"}
    proxy = MedicalRecordProxy(user, sample_record)
    assert proxy.view() == sample_record

def test_medical_record_proxy_as_patient(sample_record):
    user = {"id": "pat456", "role": "patient"}
    proxy = MedicalRecordProxy(user, sample_record)
    assert proxy.view() == {"message": "Access denied: insufficient role"}

def test_medical_record_proxy_with_no_role(sample_record):
    user = {"id": "unknown"}
    proxy = MedicalRecordProxy(user, sample_record)
    assert proxy.view() == {"message": "Access denied: insufficient role"}