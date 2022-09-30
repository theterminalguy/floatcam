from heapq import merge


class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

def printList(node):
    res = []
    while node:
        res.append(str(node.val))
        node = node.next

    print(" -> ".join(res))


def mergeTwoList(a, b):
    if not a: return b
    if not b: return a

    merged = None
    if a.val < b.val:
        merged = a
        a = a.next
    else: 
        merged = b
        b = b.next
    
    curr = merged
    curr.next = None
    return merged
    # while a and b:
    #     if a.val < b.val:
    #         curr.next = a
    #         a = a.next
    #     else:
    #         curr.next = b
    #         b = b.next
    #     curr = curr.next
        
    # if a is None: 
    #     curr.next = b
    
    # if b is None:
    #     curr.next = a
    
    # return merged

    
#a = Node(1).next = Node(2).next = Node(3)
a = Node(1, Node(2, Node(4)))
b = Node(1, Node(3, Node(4)))

c = mergeTwoList(a, b)
printList(c)

