from flask import request, jsonify
from models.doctor import Doctor
from models.appointment import Appointment
from models.user import User

# ✅ Safe serializer for Doctor
def serialize_doctor(doctor):
    return {
        "id": str(doctor.id),
        "userId": str(doctor.userId.id) if doctor.userId else None,
        "name": doctor.name,
        "email": doctor.email,
        "specialization": doctor.specialization,
        "created_at": doctor.created_at.isoformat() if doctor.created_at else None,
        "updated_at": doctor.updated_at.isoformat() if doctor.updated_at else None,
    }

# ✅ Safe serializer for Appointment
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

# ✅ Get current doctor's profile
def get_doctor_profile():
    user_id = getattr(request, "user", {}).get("id")
    doctor = Doctor.objects(userId=user_id).first()

    if not doctor:
        return jsonify({"message": "Doctor profile not found"}), 404

    return jsonify(serialize_doctor(doctor))

# ✅ Create or update doctor profile
def update_doctor_profile():
    data = request.get_json()
    user_id = getattr(request, "user", {}).get("id")

    doctor = Doctor.objects(userId=user_id).first()

    if not doctor:
        doctor = Doctor(
            userId=user_id,
            name=data.get("name"),
            email=data.get("email"),
            specialization=data.get("specialization")
        )
    else:
        doctor.name = data.get("name", doctor.name)
        doctor.email = data.get("email", doctor.email)
        doctor.specialization = data.get("specialization", doctor.specialization)

    doctor.save()
    return jsonify(serialize_doctor(doctor))

# ✅ Get appointments for current doctor (based on name)
def get_doctor_appointments():
    user_id = getattr(request, "user", {}).get("id")
    doctor = Doctor.objects(userId=user_id).first()

    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404

    appointments = Appointment.objects(doctor=doctor.name)

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

    return jsonify(result)

# ✅ Get all doctors (from User model where role == 'doctor')
def get_all_doctors():
    doctors = User.objects(role='doctor').only('id', 'name', 'email')

    return jsonify([
        {
            "id": str(doc.id),
            "name": doc.name,
            "email": doc.email
        } for doc in doctors
    ])
