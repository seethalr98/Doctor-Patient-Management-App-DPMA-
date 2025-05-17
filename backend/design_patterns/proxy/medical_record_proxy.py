class RealMedicalRecord:
    def __init__(self, record_data):
        self.record_data = record_data

    def view(self):
        return self.record_data


class MedicalRecordProxy:
    def __init__(self, user, record):
        self.user = user
        self.real_record = RealMedicalRecord(record)

    def view(self):
        if self.user.get("role") == "doctor":
            return self.real_record.view()
        else:
            return {"message": "Access denied: insufficient role"}