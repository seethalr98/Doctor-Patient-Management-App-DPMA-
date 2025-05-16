from flask import request, jsonify
from models.appointment import Appointment
from models.doctor import Doctor
from utils.notifier import notify_doctor
from bson import ObjectId

# 🔒 Serialize appointment safely
def serialize_appointment(appt):
    return {
        "id": str(appt.id),
        "doctor": appt.doctor,
        "doctorEmail": appt.doctorEmail,
        "date": appt.date,
        "time": appt.time,
        "reason": appt.reason,
        "userId": str(appt.userId.id) if appt.userId else None,
        "created_at": appt.created_at.isoformat() if appt.created_at else None,
        "updated_at": appt.updated_at.isoformat() if appt.updated_at else None
    }


# ✅ Create a new appointment
def create_appointment():
    data = request.get_json()
    user_id = getattr(request, "user", {}).get("id")
    user_email = getattr(request, "user", {}).get("email", "unknown")

    try:
        new_appointment = Appointment(
            doctor=data.get("doctor"),
            doctorEmail=data.get("doctorEmail"),
            date=data.get("date"),
            time=data.get("time"),
            reason=data.get("reason"),
            userId=user_id
        )
        new_appointment.save()

        notify_doctor(data.get("doctor"), {
            "date": data.get("date"),
            "time": data.get("time"),
            "patientEmail": user_email
        })

        return jsonify(serialize_appointment(new_appointment)), 201

    except Exception as e:
        return jsonify({"message": "Failed to schedule appointment", "error": str(e)}), 500


# ✅ Get all appointments for the current patient
def get_appointments_for_patient():
    user_id = getattr(request, "user", {}).get("id")
    try:
        appointments = Appointment.objects(userId=user_id).order_by("date", "time")
        return jsonify([serialize_appointment(appt) for appt in appointments]), 200
    except Exception as e:
        return jsonify({"message": "Failed to fetch appointments", "error": str(e)}), 500


# ✅ Delete an appointment by ID for current user
def delete_appointment(appointment_id):
    print("inside delete")
    user_id = getattr(request, "user", {}).get("id")
    try:
        appointment = Appointment.objects(id=ObjectId(appointment_id), userId=user_id).first()
        if not appointment:
            return jsonify({"message": "Appointment not found"}), 404

        appointment.delete()
        return jsonify({"message": "Appointment canceled successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"message": "Failed to delete appointment", "error": str(e)}), 500


# ✅ Get appointments for current doctor by email
def get_doctor_appointments():
    user_id = getattr(request, "user", {}).get("id")
    try:
        doctor = Doctor.objects(userId=user_id).first()
        if not doctor:
            return jsonify({"message": "Doctor profile not found"}), 404

        appointments = Appointment.objects(doctorEmail=doctor.email).order_by("date", "time")

        result = []
        for appt in appointments:
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
