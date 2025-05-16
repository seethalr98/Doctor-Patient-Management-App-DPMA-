from mongoengine import Document, StringField, ReferenceField, DateTimeField
from models.user import User
from datetime import datetime

class Doctor(Document):
    userId = ReferenceField(User, required=True, reverse_delete_rule=2)  # CASCADE delete
    name = StringField(required=True)
    email = StringField(required=True)
    specialization = StringField()
    
    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'doctor',
        'indexes': ['email'],
        'ordering': ['-created_at'],
        'auto_create_index': True
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Doctor, self).save(*args, **kwargs)
