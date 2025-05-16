from flask import Blueprint
from controllers.appointment_controller import (
    create_appointment,
    get_appointments_for_patient,
    delete_appointment
)
from middleware.auth_middleware import protect

appointment_bp = Blueprint("appointment", __name__, url_prefix="/appointments")

# POST & GET /appointments
appointment_bp.route("", methods=["POST"])(protect(create_appointment))
appointment_bp.route("", methods=["GET"])(protect(get_appointments_for_patient))

# DELETE /appointments/<id>
@appointment_bp.route("/<appointment_id>", methods=["DELETE"])
@protect
def delete_appointment_route(appointment_id):
    return delete_appointment(appointment_id)
