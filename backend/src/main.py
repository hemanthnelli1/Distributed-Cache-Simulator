from distributed_cache import DistributedCache


cache_system = DistributedCache(
    num_nodes=3,
    capacity_per_node=2
)


cache_system.put("A", 100)
cache_system.put("B", 200)
cache_system.put("C", 300)
cache_system.put("D", 400)

cache_system.get("A")
cache_system.get("B")

cache_system.put("E", 500)

cache_system.display()