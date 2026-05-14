from src.cache_node import CacheNode
from src.hash_router import HashRouter
from src.metrics import Metrics

class DistributedCache:

    def __init__(self, num_nodes, capacity_per_node):

        self.router = HashRouter(num_nodes)

        self.nodes = [
            CacheNode(i, capacity_per_node)
            for i in range(num_nodes)
        ]

        self.metrics = Metrics()

    def put(self, key, value):

        node_index = self.router.get_node_index(key)

        node = self.nodes[node_index]

        node.put(key, value)
        if node.cache.evicted:
          self.metrics.evictions += 1
        

        

    def get(self, key):

        node_index = self.router.get_node_index(key)

        node = self.nodes[node_index]

        result = node.get(key)

        self.metrics.requests += 1

        if result == -1:
            self.metrics.misses += 1
        else:
            self.metrics.hits += 1

        return result

    def display(self):

        for node in self.nodes:
            node.display()

        self.metrics.display()