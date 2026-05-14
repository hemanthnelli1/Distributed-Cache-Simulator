from src.doubly_linked_list import DoublyLinkedList
from src.node import Node

class LRUCache:

    def __init__(self, capacity):

        self.capacity = capacity

        self.cache = {}

        self.dll = DoublyLinkedList()
        self.evicted = False

    def get(self, key):

        if key not in self.cache:

            print(f"{key} NOT FOUND")

            return -1

        node = self.cache[key]

        self.dll.move_to_front(node)

        print(f"GET: {key} -> {node.value}")

        return node.value

    def put(self, key, value):

        if key in self.cache:
            self.evicted = False

            node = self.cache[key]

            node.value = value

            self.dll.move_to_front(node)

            print(f"UPDATED: {key}")

        else:

            if len(self.cache) >= self.capacity:

                lru_node = self.dll.remove_last()

                if lru_node:

                    del self.cache[lru_node.key]
                    self.evicted = True

                    print(f"EVICTED: {lru_node.key}")

            new_node = Node(key, value)

            self.dll.add_to_front(new_node)

            self.cache[key] = new_node

            print(f"INSERTED: {key}")

    def display(self):

        current = self.dll.head.next

        print("\nCACHE STATE:")

        while current != self.dll.tail:

            print(f"{current.key} : {current.value}")

            current = current.next