from flask import request, jsonify
from models.appointment import Appointment
from models.doctor import Doctor
from bson import ObjectId
from design_patterns.strategy.sort_strategy import SortByDate, SortByTime, SortByPatientName
from design_patterns.facade.appointment_facade import AppointmentFacade

# Serialize appointment safely
def serialize_appointment(appt):
    return {
        "id": str(appt.id),
        "doctor": appt.doctor,
        "doctorEmail": appt.doctorEmail,
        "date": appt.date,
        "time": appt.time,
        "reason": appt.reason,
        "userId": str(appt.userId.id) if appt.userId else None,
        "isRead": appt.isRead,
        "created_at": appt.created_at.isoformat() if appt.created_at else None,
        "updated_at": appt.updated_at.isoformat() if appt.updated_at else None
    }

#Create a new appointment using Facade
def create_appointment():
    try:
        data = request.get_json()
        user = {
            "id": getattr(request, "user", {}).get("id"),
            "email": getattr(request, "user", {}).get("email", "unknown")
        }

        facade = AppointmentFacade(data, user)
        new_appointment = facade.schedule_appointment()

        return jsonify(serialize_appointment(new_appointment)), 201

    except Exception as e:
        return jsonify({"message": "Failed to schedule appointment", "error": str(e)}), 500


# Get all appointments for the current patient
def get_appointments_for_patient():
    user_id = getattr(request, "user", {}).get("id")
    try:
        appointments = Appointment.objects(userId=user_id).order_by("date", "time")
        return jsonify([serialize_appointment(appt) for appt in appointments]), 200
    except Exception as e:
        return jsonify({"message": "Failed to fetch appointments", "error": str(e)}), 500

#Delete an appointment by ID for current user
def delete_appointment(appointment_id):
    user_id = getattr(request, "user", {}).get("id")
    try:
        appointment = Appointment.objects(id=ObjectId(appointment_id), userId=user_id).first()
        if not appointment:
            return jsonify({"message": "Appointment not found"}), 404

        appointment.delete()
        return jsonify({"message": "Appointment canceled successfully"}), 200
    except Exception as e:
        return jsonify({"message": "Failed to delete appointment", "error": str(e)}), 500

def get_doctor_appointments():
    user_id = getattr(request, "user", {}).get("id")
    try:
        doctor = Doctor.objects(userId=user_id).first()
        if not doctor:
            return jsonify({"message": "Doctor profile not found"}), 404

        # ✅ Read the sort query param
        sort_type = request.args.get("sort", "date")  # default to 'date'
        strategy_map = {
            "date": SortByDate(),
            "time": SortByTime(),
            "patient": SortByPatientName()
        }
        strategy = strategy_map.get(sort_type, SortByDate())

        appointments = Appointment.objects(doctorEmail=doctor.email)
        sorted_appointments = strategy.sort(appointments)

        result = []
        for appt in sorted_appointments:
            appt_dict = {
                "id": str(appt.id),
                "doctor": appt.doctor,
                "date": appt.date,
                "time": appt.time,
                "reason": appt.reason,
                "isRead": appt.isRead,
                "patient": {
                    "name": appt.userId.name,
                    "email": appt.userId.email
                } if appt.userId else {}
            }
            result.append(appt_dict)

        return jsonify(result), 200

    except Exception as e:
        print("🔥 ERROR in get_doctor_appointments:", e)
        return jsonify({"message": "Failed to fetch doctor appointments", "error": str(e)}), 500

                        
#Get appointments for current doctor with dynamic sort strategy
def get_doctor_appointments2():
    user_id = getattr(request, "user", {}).get("id")
    try:
        doctor = Doctor.objects(userId=user_id).first()
        if not doctor:
            return jsonify({"message": "Doctor profile not found"}), 404

        # Choose sort strategy
        sort_type = request.args.get("sort", "date")
        strategy_map = {
            "date": SortByDate(),
            "time": SortByTime(),
            "patient": SortByPatientName()
        }
        strategy = strategy_map.get(sort_type, SortByDate())

        appointments = Appointment.objects(doctorEmail=doctor.email)
        sorted_appointments = strategy.sort(appointments)

        result = []
        for appt in sorted_appointments:
            appt_dict = serialize_appointment(appt)
            if appt.userId:
                appt_dict["patient"] = {
                    "id": str(appt.userId.id),
                    "name": appt.userId.name,
                    "email": appt.userId.email
                }
            result.append(appt_dict)

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"message": "Failed to fetch doctor appointments", "error": str(e)}), 500


# ✅ Count unread appointments for doctor
def get_unread_count():
    user_id = getattr(request, "user", {}).get("id")
    doctor = Doctor.objects(userId=user_id).first()

    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404

    unread_count = Appointment.objects(doctorEmail=doctor.email, isRead=False).count()
    return jsonify({"count": unread_count}), 200

# ✅ Mark all doctor appointments as read
def mark_appointments_as_read():
    try:
        updated = Appointment.objects(doctorEmail__exists=True, isRead=False).update(set__isRead=True)
        return jsonify({"message": f"{updated} appointments marked as read."}), 200
    except Exception as e:
        return jsonify({"message": "Failed to update", "error": str(e)}), 500
