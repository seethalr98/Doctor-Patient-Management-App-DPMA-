from mongoengine import Document, StringField, EmailField
from werkzeug.security import generate_password_hash
from mongoengine import signals

class User(Document):
    name = StringField(required=True)
    email = EmailField(required=True, unique=True)
    password = StringField(required=True)
    phonenumber = StringField()
    address = StringField()
    role = StringField()

    # Meta info for MongoDB collection name
    meta = {'collection': 'user'}

    @classmethod
    def pre_save(cls, sender, document, **kwargs):
        # Hash password only if it's new or changed
        if document._changed_fields and 'password' in document._changed_fields:
            document.password = generate_password_hash(document.password)
