from src.node import Node


class DoublyLinkedList:

    def __init__(self):

        self.head = Node(0, 0)
        self.tail = Node(0, 0)

        self.head.next = self.tail
        self.tail.prev = self.head

    def add_to_front(self, node):

        node.next = self.head.next
        node.prev = self.head

        self.head.next.prev = node
        self.head.next = node

    def remove_node(self, node):

        prev_node = node.prev
        next_node = node.next

        prev_node.next = next_node
        next_node.prev = prev_node

    def move_to_front(self, node):

        self.remove_node(node)
        self.add_to_front(node)

    def remove_last(self):

        if self.tail.prev == self.head:
            return None

        last_node = self.tail.prev

        self.remove_node(last_node)

        return last_node