from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.distributed_cache import DistributedCache


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache_system = DistributedCache(
    num_nodes=3,
    capacity_per_node=2
)


@app.get("/")
def home():

    return {
        "message": "Distributed Cache Simulator Running"
    }


@app.post("/put")
def put_data(key: str, value: int):

    cache_system.put(key, value)

    return {
        "message": f"{key} inserted successfully"
    }


@app.get("/get/{key}")
def get_data(key: str):

    result = cache_system.get(key)

    if result == -1:
        return {
            "message": "Key not found"
        }

    return {
        "key": key,
        "value": result
    }
@app.get("/metrics")
def get_metrics():

    return {
        "requests": cache_system.metrics.requests,
        "hits": cache_system.metrics.hits,
        "misses": cache_system.metrics.misses,
        "evictions": cache_system.metrics.evictions
    }
@app.get("/cache-state")
def cache_state():

    result = {}

    for node in cache_system.nodes:

        current = node.cache.dll.head.next

        node_data = []

        while current != node.cache.dll.tail:

            node_data.append({
                "key": current.key,
                "value": current.value
            })

            current = current.next

        result[f"Node {node.node_id}"] = node_data

    return result
@app.delete("/delete/{key}")
def delete_key(key: str):

    node_index = cache_system.router.get_node_index(key)

    node = cache_system.nodes[node_index]

    if key not in node.cache.cache:

        return {
            "message": "Key not found"
        }

    target_node = node.cache.cache[key]

    node.cache.dll.remove_node(target_node)

    del node.cache.cache[key]

    return {
        "message": f"{key} deleted successfully"
    }
@app.delete("/clear")
def clear_cache():

    for node in cache_system.nodes:

        node.cache.cache.clear()

        node.cache.dll.head.next = node.cache.dll.tail
        node.cache.dll.tail.prev = node.cache.dll.head

    cache_system.metrics.requests = 0
    cache_system.metrics.hits = 0
    cache_system.metrics.misses = 0
    cache_system.metrics.evictions = 0

    return {
        "message": "Cache cleared successfully"
    }