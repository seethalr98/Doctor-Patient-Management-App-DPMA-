from flask import Blueprint
from controllers.appointment_controller import (
    create_appointment,
    get_appointments_for_patient,
    delete_appointment,
    get_doctor_appointments,
    get_unread_count,
    mark_appointments_as_read
)
from middleware.auth_middleware import protect

appointment_bp = Blueprint("appointment", __name__, url_prefix="/appointments")

# ✅ Patient routes
appointment_bp.route("", methods=["POST"])(protect(create_appointment))               # Create new appointment
appointment_bp.route("", methods=["GET"])(protect(get_appointments_for_patient))      # View own appointments
@appointment_bp.route("/<appointment_id>", methods=["DELETE"])                        # Cancel appointment
@protect
def delete_appointment_route(appointment_id):
    return delete_appointment(appointment_id)

# ✅ Doctor routes
appointment_bp.route("/doctor", methods=["GET"])(protect(get_doctor_appointments))    # Doctor's appointments
appointment_bp.route("/unread-count", methods=["GET"])(protect(get_unread_count))     # For bell badge
appointment_bp.route("/mark-read", methods=["PUT"])(protect(mark_appointments_as_read))  # Mark all as read

