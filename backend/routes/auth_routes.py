from flask import Blueprint
from controllers.auth_controller import register_user, login_user, update_user_profile, get_profile
from middleware.auth_middleware import protect

# auth_bp = Blueprint("auth", __name__, url_prefix="/auth")
auth_bp = Blueprint("auth", __name__)  # ✅ No url_prefix here


# Register
auth_bp.route("/register", methods=["POST"])(register_user)

# Login
auth_bp.route("/login", methods=["POST"])(login_user)

# Get user profile (protected)
auth_bp.route("/profile", methods=["GET"])(protect(get_profile))

# Update user profile (protected)
auth_bp.route("/profile", methods=["PUT"])(protect(update_user_profile))
