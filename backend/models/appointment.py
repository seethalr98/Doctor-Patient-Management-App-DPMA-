from mongoengine import Document, StringField, ReferenceField, DateTimeField
from models.user import User
from datetime import datetime

class Appointment(Document):
    doctor = StringField(required=True)          # Display name
    doctorEmail = StringField(required=True)     # For precise match
    date = StringField(required=True)            # Format: e.g. "2025-05-14"
    time = StringField(required=True)            # Format: e.g. "10:30 AM"
    reason = StringField()
    userId = ReferenceField(User, required=True, reverse_delete_rule=2)

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'appointment',
        'ordering': ['-created_at'],
        'auto_create_index': True
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Appointment, self).save(*args, **kwargs)
