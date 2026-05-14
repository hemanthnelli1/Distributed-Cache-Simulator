from src.lru_cache import LRUCache

class CacheNode:

    def __init__(self, node_id, capacity):

        self.node_id = node_id

        self.cache = LRUCache(capacity)

    def put(self, key, value):

        print(f"\n[Node {self.node_id}] PUT {key}")

        self.cache.put(key, value)

    def get(self, key):

        print(f"\n[Node {self.node_id}] GET {key}")

        return self.cache.get(key)

    def display(self):

        print(f"\n===== NODE {self.node_id} =====")

        self.cache.display()