from abc import ABC, abstractmethod

class SortStrategy(ABC):
    @abstractmethod
    def sort(self, appointments):
        pass

class SortByDate(SortStrategy):
    def sort(self, appointments):
        return sorted(appointments, key=lambda x: x.date)

class SortByTime(SortStrategy):
    def sort(self, appointments):
        return sorted(appointments, key=lambda x: x.time)

class SortByPatientName(SortStrategy):
    def sort(self, appointments):
        return sorted(appointments, key=lambda x: x.userId.name if x.userId else "")
