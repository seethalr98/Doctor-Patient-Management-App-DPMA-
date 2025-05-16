from mongoengine import connect
import os

def connect_db(app):
    try:
        mongo_uri = os.environ.get("MONGO_URI")
        if not mongo_uri:
            raise ValueError("MONGO_URI is not set in .env")

        connect(
            host=mongo_uri,
            alias="default"  # ✅ required by MongoEngine
        )
        print("✅ MongoDB connected successfully")
    except Exception as e:
        print("❌ MongoDB connection error:", str(e))
        raise SystemExit(1)
