from design_patterns.strategy.sort_strategy import SortStrategy

class SortByDate(SortStrategy):
    def sort(self, appointments):
        return sorted(appointments, key=lambda x: x.date)
