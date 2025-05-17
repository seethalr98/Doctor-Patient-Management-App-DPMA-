import unittest
from io import StringIO
import sys

from design_patterns.decorator.notifier import (
    Notifier,
    EmailNotifier,
    SMSNotifier,
    LoggerNotifier
)

class TestNotifierPattern(unittest.TestCase):

    def setUp(self):
        # Redirect stdout to capture print statements
        self.held_output = StringIO()
        self.original_stdout = sys.stdout
        sys.stdout = self.held_output

    def tearDown(self):
        sys.stdout = self.original_stdout

    def test_base_notifier(self):
        notifier = Notifier()
        notifier.send("Test Message")
        output = self.held_output.getvalue()
        self.assertIn("📢 Basic Notification: Test Message", output)

    def test_email_notifier(self):
        notifier = EmailNotifier(Notifier())
        notifier.send("Email Test")
        output = self.held_output.getvalue()
        self.assertIn("📢 Basic Notification: Email Test", output)
        self.assertIn("📧 Email Notification: Email Test", output)

    def test_sms_notifier(self):
        notifier = SMSNotifier(Notifier())
        notifier.send("SMS Test")
        output = self.held_output.getvalue()
        self.assertIn("📢 Basic Notification: SMS Test", output)
        self.assertIn("📲 SMS Notification: SMS Test", output)

    def test_logger_notifier(self):
        notifier = LoggerNotifier(Notifier())
        notifier.send("Log Test")
        output = self.held_output.getvalue()
        self.assertIn("📢 Basic Notification: Log Test", output)
        self.assertIn("📜 Logged Notification: Log Test", output)

    def test_chained_notifiers(self):
        notifier = LoggerNotifier(SMSNotifier(EmailNotifier(Notifier())))
        notifier.send("Chain Test")
        output = self.held_output.getvalue()

        self.assertIn("📢 Basic Notification: Chain Test", output)
        self.assertIn("📧 Email Notification: Chain Test", output)
        self.assertIn("📲 SMS Notification: Chain Test", output)
        self.assertIn("📜 Logged Notification: Chain Test", output)

if __name__ == "__main__":
    unittest.main()