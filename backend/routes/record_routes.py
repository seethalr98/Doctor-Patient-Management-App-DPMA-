from flask import Blueprint, request
from controllers.record_controller import get_records_by_patient_email, add_medical_record
from middleware.auth_middleware import protect, authorize_roles

record_bp = Blueprint("record", __name__, url_prefix="/records")

# ✅ GET /records/<patientEmail> - Only accessible by doctors
@record_bp.route("", methods=["GET"])
@protect
@authorize_roles("doctor")
def get_records():
    print("inside get records")
    patient_email = request.args.get("patientEmail")
    return get_records_by_patient_email(patient_email)


# ✅ POST /records - Add new record (doctors only)
record_bp.route("", methods=["POST"])(protect(authorize_roles("doctor")(add_medical_record)))
