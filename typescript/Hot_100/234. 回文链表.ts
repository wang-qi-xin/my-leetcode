import { ListNode } from '../utils/数据结构/struct'
/**
 * 234. 回文链表
给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

 

示例 1：


输入：head = [1,2,2,1]
输出：true
示例 2：


输入：head = [1,2]
输出：false
 

提示：

链表中节点数目在范围[1, 105] 内
0 <= Node.val <= 9

进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
 * @param head 
 * @returns 
 */
function isPalindrome(head: ListNode | null): boolean {
  /**
   时间复杂度O(n),空间复杂度O(1)
   */

  // 1. 如果只有一个节点，直接返回true
  if (!head.next) return true
  let fast = head,
    slow = head,
    s1 = '',
    s2 = '',
    l = 0

  while (fast) {
    fast = fast.next
    // 记录链表长度
    l += 1
    if (!fast) break
    l += 1
    fast = fast.next
    // 记录前半部分字符串
    s1 += slow.val
    slow = slow.next
  }
  // 如果链表长度为奇数，而slow此时在最中间的节点上，应该后移一位。
  if (l & 1) slow = slow.next
  while (slow) {
    // 反向记录后半部分字符串
    s2 = slow.val + s2
    slow = slow.next
  }

  return s1 === s2
}
