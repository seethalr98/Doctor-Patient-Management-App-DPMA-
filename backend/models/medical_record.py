from mongoengine import Document, StringField, ReferenceField, DateTimeField
from models.user import User
from models.doctor import Doctor
from datetime import datetime

class MedicalRecord(Document):
    patientId = ReferenceField(User, required=True, reverse_delete_rule=2)
    doctorId = ReferenceField(Doctor, required=True, reverse_delete_rule=2)
    date = StringField(required=True)     # Can be changed to DateField if needed
    diagnosis = StringField()
    prescription = StringField()
    notes = StringField()

    created_at = DateTimeField(default=datetime.utcnow)
    updated_at = DateTimeField(default=datetime.utcnow)

    meta = {
        'collection': 'medical_record',
        'ordering': ['-created_at'],
        'auto_create_index': True
    }

    def save(self, *args, **kwargs):
        self.updated_at = datetime.utcnow()
        return super(MedicalRecord, self).save(*args, **kwargs)
