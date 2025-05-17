import unittest
from unittest.mock import patch
from design_patterns.decorator.notifier import (
    Notifier,
    EmailNotifier,
    SMSNotifier,
    LoggerNotifier
)

class TestNotifierDecorator(unittest.TestCase):

    @patch('builtins.print')
    def test_basic_notifier(self, mock_print):
        notifier = Notifier()
        notifier.send("Test Message")
        mock_print.assert_called_with("📢 Basic Notification: Test Message")

    @patch('builtins.print')
    def test_email_notifier(self, mock_print):
        notifier = EmailNotifier(Notifier())
        notifier.send("Test Message")
        mock_print.assert_any_call("📢 Basic Notification: Test Message")
        mock_print.assert_any_call("📧 Email Notification: Test Message")

    @patch('builtins.print')
    def test_sms_notifier(self, mock_print):
        notifier = SMSNotifier(Notifier())
        notifier.send("Test Message")
        mock_print.assert_any_call("📢 Basic Notification: Test Message")
        mock_print.assert_any_call("📲 SMS Notification: Test Message")

    @patch('builtins.print')
    def test_logger_notifier(self, mock_print):
        notifier = LoggerNotifier(Notifier())
        notifier.send("Test Message")
        mock_print.assert_any_call("📢 Basic Notification: Test Message")
        mock_print.assert_any_call("📜 Logged Notification: Test Message")

    @patch('builtins.print')
    def test_stacked_decorators(self, mock_print):
        # Compose decorators: Notifier → Email → SMS → Logger
        notifier = LoggerNotifier(SMSNotifier(EmailNotifier(Notifier())))
        notifier.send("Stacked Message")

        expected_calls = [
            unittest.mock.call("📢 Basic Notification: Stacked Message"),
            unittest.mock.call("📧 Email Notification: Stacked Message"),
            unittest.mock.call("📲 SMS Notification: Stacked Message"),
            unittest.mock.call("📜 Logged Notification: Stacked Message")
        ]
        mock_print.assert_has_calls(expected_calls, any_order=False)

if __name__ == '__main__':
    unittest.main()