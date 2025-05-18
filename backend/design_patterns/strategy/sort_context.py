class SortContext:
    def __init__(self, strategy):
        self.strategy = strategy

    def set_strategy(self, strategy):
        self.strategy = strategy

    def sort_appointments(self, appointments):
        return self.strategy.sort(appointments)
