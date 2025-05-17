from flask import request, jsonify
from models.medical_record import MedicalRecord
from models.user import User
from bson import ObjectId
from models.doctor import Doctor
from design_patterns.proxy.medical_record_proxy import MedicalRecordProxy


# ✅ Serializer to safely convert ObjectId and datetime to JSON-friendly format
def serialize_record(record):
    return {
        "id": str(record.id),
        "patientId": str(record.patientId.id) if record.patientId else None,
        "doctorId": str(record.doctorId.id) if record.doctorId else None,
        "date": record.date,
        "diagnosis": record.diagnosis,
        "prescription": record.prescription,
        "notes": record.notes,
        "created_at": record.created_at.isoformat() if record.created_at else None,
        "updated_at": record.updated_at.isoformat() if record.updated_at else None
    }

# ✅ Get records by patient email using Proxy Pattern
def get_records_by_patient_email(patient_email):
    print("📥 inside get_records_by_patient_email (with Proxy)")
    user_role = getattr(request, "user", {}).get("role")
    user_id = getattr(request, "user", {}).get("id")

    if not user_role or not user_id:
        return jsonify({"message": "Unauthorized"}), 401

    if user_role != "doctor":
        return jsonify({"message": "Access denied: Only doctors can view medical records"}), 403

    try:
        patient = User.objects(email=patient_email).first()
        if not patient:
            return jsonify({"message": "Patient not found"}), 404

        records = MedicalRecord.objects(patientId=patient.id)
        response = []

        for record in records:
            proxy = MedicalRecordProxy(
                user={"id": user_id, "role": user_role},
                record=serialize_record(record)
            )
            response.append(proxy.view())

        return jsonify(response), 200

    except Exception as err:
        print("🔥 Proxy Error:", err)
        return jsonify({"message": "Error fetching records", "error": str(err)}), 500


# ✅ Get all records for a specific patient by email (only doctors allowed)
def get_records_by_patient_email2(patient_email):
    print("inside get records")
    role = getattr(request, "user", {}).get("role")
    if role != "doctor":
        return jsonify({"message": "Access denied: Only doctors can view medical records"}), 403

    try:
        user = User.objects(email=patient_email).first()
        if not user:
            return jsonify({"message": "Patient not found"}), 404

        records = MedicalRecord.objects(patientId=user.id).no_dereference()  # <-- ✅ this line is key!
        print(records)
        return jsonify([serialize_record(record) for record in records]), 200

    except Exception as err:
        print("🔥 ERROR:", err)
        return jsonify({"message": "Error fetching records", "error": str(err)}), 500


def add_medical_record():
    try:
        data = request.get_json()
        print("📥 Received data:", data)

        patient_email = data.get("patientEmail")
        doctor_user_id = getattr(request, "user", {}).get("id")
        print("🧑‍⚕ Doctor User ID:", doctor_user_id)

        user = User.objects(email=patient_email).first()
        if not user:
            return jsonify({"message": "Patient not found"}), 404

        doctor = Doctor.objects(userId=ObjectId(doctor_user_id)).first()
        if not doctor:
            return jsonify({"message": "Doctor profile not found"}), 404

        new_record = MedicalRecord(
            patientId=user.id,
            doctorId=doctor.id,
            date=data.get("date"),
            diagnosis=data.get("diagnosis"),
            prescription=data.get("prescription"),
            notes=data.get("notes")
        )
        new_record.save()

        return jsonify(serialize_record(new_record)), 201

    except Exception as err:
        print("🔥 ERROR:", err)
        return jsonify({"message": "Error saving record", "error": str(err)}), 500