from mongoengine import Document, StringField, EmailField, IntField, ReferenceField, DateTimeField
from models.user import User
from datetime import datetime

class Patient(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    age = IntField()
    contact = StringField()
    userId = ReferenceField(User, required=True, reverse_delete_rule=2)

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'patient',
        'indexes': ['email'],
        'ordering': ['-created_at'],
        'auto_create_index': True
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(Patient, self).save(*args, **kwargs)
