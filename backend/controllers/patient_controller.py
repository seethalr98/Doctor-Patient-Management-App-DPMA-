from flask import request, jsonify
from models.patient import Patient
from models.user import User


# ✅ Create or update patient profile
def update_patient_profile():
    data = request.get_json()
    user_id = getattr(request, "user", {}).get("id")

    try:
        patient = Patient.objects(userId=user_id).first()

        if not patient:
            patient = Patient(
                userId=user_id,
                name=data.get("name"),
                email=data.get("email"),
                age=data.get("age"),
                contact=data.get("contact")
            )
        else:
            patient.name = data.get("name", patient.name)
            patient.email = data.get("email", patient.email)
            patient.age = data.get("age", patient.age)
            patient.contact = data.get("contact", patient.contact)

        patient.save()
        return jsonify(patient.to_mongo().to_dict()), 200

    except Exception as error:
        return jsonify({"message": "Server error", "error": str(error)}), 500


# ✅ Get the currently logged-in patient's profile
def get_patient_profile():
    user_id = getattr(request, "user", {}).get("id")

    try:
        patient = Patient.objects(userId=user_id).first()

        if not patient:
            return jsonify({"message": "Patient profile not found"}), 404

        return jsonify(patient.to_mongo().to_dict()), 200

    except Exception as error:
        return jsonify({"message": "Server error", "error": str(error)}), 500


# ✅ Get all patients from User collection (role = 'patient')
def get_all_patients():
    try:
        patients = User.objects(role='patient').only('id', 'name', 'email')
        return jsonify([
            {
                "id": str(p.id),
                "name": p.name,
                "email": p.email
            } for p in patients
        ])

    except Exception as err:
        return jsonify({"message": "Failed to fetch patients", "error": str(err)}), 500
