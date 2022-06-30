/**
142. 环形链表 II
给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。

如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

不允许修改 链表。

 

示例 1：



输入：head = [3,2,0,-4], pos = 1
输出：返回索引为 1 的链表节点
解释：链表中有一个环，其尾部连接到第二个节点。
示例 2：



输入：head = [1,2], pos = 0
输出：返回索引为 0 的链表节点
解释：链表中有一个环，其尾部连接到第一个节点。
示例 3：



输入：head = [1], pos = -1
输出：返回 null
解释：链表中没有环。
 

提示：

链表中节点的数目范围在范围 [0, 104] 内
-105 <= Node.val <= 105
pos 的值为 -1 或者链表中的一个有效索引
 

进阶：你是否可以使用 O(1) 空间解决此题？
 */

import { ListNode } from '../utils/数据结构/struct'

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function detectCycle(head: ListNode | null): ListNode | null {
  /**
   1. 如果有环，快慢指针的相遇点，一定在环内。
      1. 当slow进入环时，fast一定在环中某个位置，假设fast和slow的距离为x，如果此时相遇，则x = 0
      2. 此时则为fast在环中追赶slow，设环长为n，则fast需要追赶n-x步才能与slow相遇
      3. fast的速度时slow的二倍。所以slow走n-x步时，fast走了2(n-x)步，此时一定相遇。
      4. 由于x>=0. 所以slow走n-x步，一定走不完一圈。就被fast追上了。
   
   2. 当fast与slow相遇时，head与slow同时向后走，则迟早在入环点相遇。
      1. 当fast与slow相遇时，设head与入环点in距离为a，入环点in与相遇点meet距离为b，环的另一半距离为c
      2. 此时fast走的步数为a + n(b + c) + b。其中n是绕的圈数。
      3. slow走的步数为a + b。
      4. 由于fast是slow的二倍，所以有2(a + b) = a + n(b + c) + b
         a = n(b + c) - b = (n-1)(b+c) + c
         表示从head到入环点in的距离a = (n-1)倍的环长 + 相遇点meet到in的距离c
      5. 也就是如果head此时和slow同时向后走，肯定会在入环点相遇。
      
   */
  if (!head) return null

  let slow = head,
    fast = head
  while (fast) {
    if (fast.next) {
      fast = fast.next.next
    } else {
      return null
    }

    slow = slow.next

    // 相遇
    if (fast === slow) {
      while (head !== slow) {
        head = head.next
        slow = slow.next
      }
      return head
    }
  }
  return null
}
