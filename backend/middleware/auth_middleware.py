from functools import wraps
from flask import request, jsonify
import jwt
import os

JWT_SECRET = os.getenv("JWT_SECRET", "your-secret-key")

# ✅ Middleware to verify JWT and attach user info
def protect(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            try:
                token = auth_header.split(" ")[1]
                decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])

                # ✅ Attach user info to request context (now includes email)
                request.user = {
                    "id": decoded.get("id") or decoded.get("userId"),
                    "role": decoded.get("role"),
                    "email": decoded.get("email")  # ✅ added email here
                }

                return f(*args, **kwargs)

            except jwt.ExpiredSignatureError:
                return jsonify({"message": "Token expired"}), 401
            except jwt.InvalidTokenError as e:
                return jsonify({"message": f"Invalid token: {str(e)}"}), 401

        return jsonify({"message": "Not authorized, no token"}), 401

    return decorated_function

# ✅ Middleware to enforce role-based access control
def authorize_roles(*allowed_roles):
    def decorator(f):
        @wraps(f)
        def wrapped(*args, **kwargs):
            role = getattr(request, 'user', {}).get("role")
            if not role or role not in allowed_roles:
                return jsonify({"message": "Access denied: insufficient role"}), 403
            return f(*args, **kwargs)
        return wrapped
    return decorator