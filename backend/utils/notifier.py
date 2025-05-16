def notify_doctor(doctor_name, appointment_details):
    print(f"📢 Notification: Dr. {doctor_name}, you have a new appointment!")
    print(f"🗓️  Date: {appointment_details.get('date')}")
    print(f"⏰  Time: {appointment_details.get('time')}")
    print(f"👤  Patient: {appointment_details.get('patientEmail')}")
