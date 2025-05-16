from flask import request, jsonify
from models.user import User
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import os
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash

JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")

# ✅ Utility: Generate token with role
def generate_token(user_id, role):
    payload = {
        "id": str(user_id),
        "role": role,
        "exp": datetime.utcnow() + timedelta(days=30)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


# ✅ Register user

# def register_user():
#     print("📥 register_user() called")
#     return {"message": "Register endpoint working"}, 200

def register_user():
    print("inside register user")
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if User.objects(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    # hashed_pw = generate_password_hash(password)
    hashed_pw = generate_password_hash(password, method="pbkdf2:sha256")
    user = User(name=name, email=email, password=hashed_pw, role=role)
    user.save()

    return jsonify({
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "token": generate_token(user.id, user.role)
    }), 201


# ✅ Login user
def login_user():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.objects(email=email).first()

    if user and check_password_hash(user.password, password):
        return jsonify({
            "id": str(user.id),
            "name": user.name,
            "email": user.email,
            "role": user.role,
            "token": generate_token(user.id, user.role)
        })

    return jsonify({"message": "Invalid email or password"}), 401


# ✅ Get user profile
def get_profile():
    user_id = getattr(request, "user", {}).get("id")
    user = User.objects(id=user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    return jsonify({
        "name": user.name,
        "email": user.email,
        "phonenumber": user.phonenumber,
        "address": user.address,
        "role": user.role
    })


# ✅ Update user profile
def update_user_profile():
    user_id = getattr(request, "user", {}).get("id")
    user = User.objects(id=user_id).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)
    user.phonenumber = data.get("phonenumber", user.phonenumber)
    user.address = data.get("address", user.address)

    user.save()

    return jsonify({
        "id": str(user.id),
        "name": user.name,
        "email": user.email,
        "phonenumber": user.phonenumber,
        "address": user.address,
        "token": generate_token(user.id, user.role)
    })
