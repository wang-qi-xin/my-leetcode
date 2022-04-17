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
  if (head == null) return null
  let newHead = new Node(head.val, null, null)
  // 每次copy一个节点，并把这两个节点放入map中
  map.set(head, newHead)
  newHead.next = copyRandomList(head.next)
  // 当回溯时，所有的节点已经copy结束
  newHead.random = map.get(head.random)
  return newHead
}
/**
 *
 * @param {*} head
 * @returns
 */
var copyRandomList = function (head) {
  if (head == null) return null
  let p = head
  while (p) {
    map.set(p, new Node(p.val))
    p = p.next
  }
  p = head
  while (p) {
    map.get(p).next = map.get(p.next)
    map.get(p).random = map.get(p.random)
    p = p.next
  }
  return map.get(head)
}
// Definition for a Node.
function Node(val, left, right) {
  this.val = val
  this.left = left
  this.right = right
}
/**
剑指 Offer 36. 二叉搜索树与双向链表
 * @param {Node} root
 * @return {Node}
 */
var treeToDoublyList = function (root) {
  /**
   * 1. head用来存储头节点。pre用来存储当前中序遍历到的节点
     2. dfs(left) 
     3. 如果pre是null，说明这是头节点，head = cur
     4. 否则，说明当前节点前驱节点就是pre。进行关联
     5. 令pre执行当前节点。
     6. dfs(right)

     7. 递归结束以后，head指向头节点，pre执行尾结点。然后进行关联。
     8. 返回头节点
   */
  const dfs = (cur) => {
    if(!cur) return
    dfs(cur.left)
    if(!pre){
      head = cur
    }else {
      pre.right = cur
      cur.left = pre
    }
    pre = cur
    dfs(cur.right)
  }
  if(!root) return
  let pre = null, head = null;
  dfs(root)
  pre.right = head;
  head.left = pre;
  return head;
}
// function printTree(root) {
//   if (!root) {
//     return
//   }
//   console.log(root.val)
//   printTree(root.left)
//   printTree(root.right)
// }
// function testtreeToDoublyList() {
//   let root = new Node(-1)
//   let head = root
//   const nodeList = [4, 2, 5, 1, 3].map(e => {
//     return new Node(e)
//   })
//   head.right = nodeList[0]
//   nodeList[0].left = nodeList[1]
//   nodeList[0].right = nodeList[2]
//   nodeList[1].left = nodeList[3]
//   nodeList[1].right = nodeList[4]
//   head = treeToDoublyList(head.right)

//   printTree(head.right)
// }
// testtreeToDoublyList()
