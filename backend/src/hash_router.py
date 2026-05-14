class HashRouter:

    def __init__(self, total_nodes):

        self.total_nodes = total_nodes

    def get_node_index(self, key):

        total = 0

        for char in key:
            total += ord(char)

        return total % self.total_nodes