from models.appointment import Appointment
from design_patterns.decorator.notifier import Notifier, EmailNotifier, SMSNotifier, LoggerNotifier

class AppointmentFacade:
    def __init__(self, data, user):
        self.data = data
        self.user = user

    def schedule_appointment(self):
        # Step 1: Save Appointment
        new_appointment = Appointment(
            doctor=self.data.get("doctor"),
            doctorEmail=self.data.get("doctorEmail"),
            date=self.data.get("date"),
            time=self.data.get("time"),
            reason=self.data.get("reason"),
            userId=self.user.get("id"),
            isRead=False
        )
        new_appointment.save()

        # Step 2: Notify
        message = f"New appointment scheduled on {self.data.get('date')} at {self.data.get('time')} with patient {self.user.get('email', 'unknown')}"
        
        base = Notifier()
        notify = LoggerNotifier(SMSNotifier(EmailNotifier(base)))
        notify.send(message)

        return new_appointment
