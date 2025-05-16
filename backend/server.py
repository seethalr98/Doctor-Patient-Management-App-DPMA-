from flask import Flask
from flask_cors import CORS
from config.db import connect_db
from dotenv import load_dotenv
import os

# Load .env variables
load_dotenv()

# Initialize Flask appx
app = Flask(__name__)

app.url_map.strict_slashes = False


# Enable CORS
# CORS(app)

# CORS(app, origins=["http://localhost:3000"], supports_credentials=True)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
# Connect to MongoDB
connect_db(app)

# Register Blueprints (routes)
from routes.auth_routes import auth_bp
from routes.patient_routes import patient_bp
from routes.appointment_routes import appointment_bp
from routes.doctor_routes import doctor_bp
from routes.record_routes import record_bp

app.register_blueprint(auth_bp, url_prefix="/api/auth")
app.register_blueprint(patient_bp, url_prefix="/api/patients")
app.register_blueprint(appointment_bp, url_prefix="/api/appointments")
app.register_blueprint(doctor_bp, url_prefix="/api/doctors")
app.register_blueprint(record_bp, url_prefix="/api/records")

# Run the app
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(debug=True, port=port)
