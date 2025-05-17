# base component
class Notifier:
    def send(self, message):
        print(f"📢 Basic Notification: {message}")

# base decorator
class NotifierDecorator(Notifier):
    def __init__(self, notifier):
        self.notifier = notifier

    def send(self, message):
        self.notifier.send(message)

# concrete decorators
class EmailNotifier(NotifierDecorator):
    def send(self, message):
        super().send(message)
        print(f"📧 Email Notification: {message}")

class SMSNotifier(NotifierDecorator):
    def send(self, message):
        super().send(message)
        print(f"📲 SMS Notification: {message}")

class LoggerNotifier(NotifierDecorator):
    def send(self, message):
        super().send(message)
        print(f"📜 Logged Notification: {message}")