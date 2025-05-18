import pytest
from unittest.mock import MagicMock
from design_patterns.strategy.sort_context import SortContext
from design_patterns.strategy.sort_strategy import SortByDate, SortByTime, SortByPatientName


@pytest.fixture
def sample_appointments():
    a1 = MagicMock()
    a1.date = "2025-05-10"
    a1.time = "09:30"
    a1.userId = MagicMock(name="user1")
    a1.userId.name = "Charlie"

    a2 = MagicMock()
    a2.date = "2025-05-09"
    a2.time = "08:45"
    a2.userId = MagicMock(name="user2")
    a2.userId.name = "Alice"

    a3 = MagicMock()
    a3.date = "2025-05-11"
    a3.time = "10:15"
    a3.userId = MagicMock(name="user3")
    a3.userId.name = "Bob"

    return [a1, a2, a3]


def test_sort_by_date(sample_appointments):
    context = SortContext(SortByDate())
    sorted_appointments = context.sort_appointments(sample_appointments)
    assert [a.date for a in sorted_appointments] == ["2025-05-09", "2025-05-10", "2025-05-11"]


def test_sort_by_time(sample_appointments):
    context = SortContext(SortByTime())
    sorted_appointments = context.sort_appointments(sample_appointments)
    assert [a.time for a in sorted_appointments] == ["08:45", "09:30", "10:15"]


def test_sort_by_patient_name(sample_appointments):
    context = SortContext(SortByPatientName())
    sorted_appointments = context.sort_appointments(sample_appointments)
    assert [a.userId.name for a in sorted_appointments] == ["Alice", "Bob", "Charlie"]
