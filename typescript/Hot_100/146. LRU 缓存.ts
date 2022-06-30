/**
146. LRU 缓存
请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

示例：

输入
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
输出
[null, null, null, 1, null, -1, null, -1, 3, 4]

解释
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // 缓存是 {1=1}
lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
lRUCache.get(1);    // 返回 1
lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
lRUCache.get(2);    // 返回 -1 (未找到)
lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
lRUCache.get(1);    // 返回 -1 (未找到)
lRUCache.get(3);    // 返回 3
lRUCache.get(4);    // 返回 4
 

提示：

1 <= capacity <= 3000
0 <= key <= 10000
0 <= value <= 105
最多调用 2 * 105 次 get 和 put
 */

class BListNode {
  value: number[]
  pre: BListNode
  next: BListNode
  constructor(value: number[], pre?: BListNode, next?: BListNode) {
    this.value = value
    this.pre = pre
    this.next = next
  }
}

/**
 * 方法一：双向链表配合map
 */
class LRUCache {
  map: Map<number, BListNode>
  capacity: number
  head: BListNode
  constructor(capacity: number) {
    this.map = new Map<number, BListNode>()
    this.head = new BListNode([0, 0])
    this.head.pre = this.head
    this.head.next = this.head
    this.capacity = capacity
  }

  get(key: number): number {
    // 如果map中有key，则根据key从map中拿出该节点，放到链尾，并且返回value
    if (this.map.has(key)) {
      return this.adj(key).value[1]
    } else {
      return -1
    }
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) {
      // 如果map中含有key，根据key从map拿到node节点，放到链尾，并且修改value为新的value
      this.adj(key).value[1] = value
    } else {
      // 1. 如果容量为0，则删除第一个节点，并且容量+1
      if (this.capacity === 0) {
        // 删除第一个节点
        const next = this.head.next
        this.head.next = next.next
        next.next.pre = this.head
        // 删除map中该节点
        this.map.delete(next.value[0])
        this.capacity += 1
      }
      // 2. 新建一个节点，插入到链尾，并且放入map中。容量-1
      const tail = this.head.pre
      const node = new BListNode([key, value], tail, this.head)
      tail.next = node
      this.head.pre = node
      this.map.set(key, node)
      this.capacity -= 1
    }
  }

  /**
   * 把key对应的节点，从该位置插入到链表尾
   * @param key
   * @returns
   */
  adj(key: number): BListNode {
    // 1. 从map中拿节点node
    const node = this.map.get(key)
    // 2. 从表头摘下
    node.pre.next = node.next
    node.next.pre = node.pre

    // 3. 插入链尾
    const tail = this.head.pre
    tail.next = node
    this.head.pre = node
    node.pre = tail
    node.next = this.head

    return node
  }

  // print() {
  //   let p = this.head.next
  //   const a = []
  //   while (p !== this.head) {
  //     a.push(p.value)
  //     p = p.next
  //   }
  //   const m = [...this.map.keys()]
  //   console.log(a, m)
  // }
}

const l = new LRUCache(2)
// l.put(1, 1)
// l.put(2, 2)
// l.print()
// console.log(l.get(1))
// l.print()
// l.put(3, 3)
// l.print()
// console.log(l.get(2))
// l.print()
// l.put(4, 4)
// console.log(l.get(1))
// console.log(l.get(3))
// console.log(l.get(4))

l.put(2, 1)
l.put(2, 2)
console.log(l.get(2))

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
