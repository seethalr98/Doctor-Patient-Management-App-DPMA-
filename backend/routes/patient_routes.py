from flask import Blueprint
from controllers.patient_controller import (
    get_patient_profile,
    update_patient_profile,
    get_all_patients
)
from middleware.auth_middleware import protect

patient_bp = Blueprint("patient", __name__, url_prefix="/patient")

# GET & PUT /patient/profile
patient_bp.route("/profile", methods=["GET"])(protect(get_patient_profile))
patient_bp.route("/profile", methods=["PUT"])(protect(update_patient_profile))

# GET /patient/all
patient_bp.route("/all", methods=["GET"])(protect(get_all_patients))
