from models.user import User
from werkzeug.security import generate_password_hash

class UserFactory:
    @staticmethod
    def create_user(role, name, email, password=None, phonenumber=None, address=None):
        # 🔧 Specify a method compatible with Python 3.9
        hashed_pw = generate_password_hash(password, method="pbkdf2:sha256") if password else None

        if role == "doctor":
            return User(name=name, email=email, password=hashed_pw, role="doctor")
        elif role == "patient":
            return User(name=name, email=email, password=hashed_pw, role="patient",
                        phonenumber=phonenumber, address=address)
        else:
            raise ValueError("Invalid role type")