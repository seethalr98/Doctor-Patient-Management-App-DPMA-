from flask import Blueprint
from controllers.doctor_controller import (
    get_doctor_profile,
    update_doctor_profile,
    get_doctor_appointments,
    get_all_doctors
)
from middleware.auth_middleware import protect

doctor_bp = Blueprint("doctor", __name__, url_prefix="/doctor")

# GET & PUT /doctor/profile
doctor_bp.route("/profile", methods=["GET"])(protect(get_doctor_profile))
doctor_bp.route("/profile", methods=["PUT"])(protect(update_doctor_profile))

# GET /doctor/appointments
doctor_bp.route("/appointments", methods=["GET"])(protect(get_doctor_appointments))

# GET /doctor/all
doctor_bp.route("/all", methods=["GET"])(protect(get_all_doctors))
