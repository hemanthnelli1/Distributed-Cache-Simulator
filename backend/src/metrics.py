class Metrics:

    def __init__(self):

        self.hits = 0
        self.misses = 0
        self.requests = 0
        self.evictions = 0

    def display(self):

        print("\n===== METRICS =====")

        print(f"Requests  : {self.requests}")
        print(f"Hits      : {self.hits}")
        print(f"Misses    : {self.misses}")
        print(f"Evictions : {self.evictions}")