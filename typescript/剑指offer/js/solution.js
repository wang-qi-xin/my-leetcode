// Definition for a Node.
function Node(val, next, random) {
  this.val = val
  this.next = next
  this.random = random
}

/**
剑指 Offer 35. 复杂链表的复制
请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

 

示例 1：



输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
示例 2：



输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
示例 3：



输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
示例 4：

输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
 

提示：

-10000 <= Node.val <= 10000
Node.random 为空（null）或指向链表中的节点。
节点数目不超过 1000 。
 * @param {Node} head
 * @return {Node}
 */
const map = new Map()
var copyRandomList = function (head) {
  // 递归
  if(head == null) return null;
  let newHead = new Node(head.val, null, null);
  // 每次copy一个节点，并把这两个节点放入map中
  map.set(head, newHead)
  newHead.next = copyRandomList(head.next)
  // 当回溯时，所有的节点已经copy结束
  newHead.random = map.get(head.random);
  return newHead;
}
/**
 * 
 * @param {*} head 
 * @returns 
 */
var copyRandomList = function (head) {
  if(head == null) return null;
  let p = head;
  while(p){
    map.set(p, new Node(p.val))
    p = p.next;
  }
  p = head;
  while(p) {
    map.get(p).next = map.get(p.next)
    map.get(p).random = map.get(p.random)
    p = p.next;
  }
  return map.get(head)
}
