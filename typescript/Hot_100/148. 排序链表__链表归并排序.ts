/**
148. 排序链表
给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

示例 1：


输入：head = [4,2,1,3]
输出：[1,2,3,4]
示例 2：


输入：head = [-1,5,3,4,0]
输出：[-1,0,3,4,5]
示例 3：

输入：head = []
输出：[]
 

提示：

链表中节点的数目在范围 [0, 5 * 104] 内
-105 <= Node.val <= 105
 
 */
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

import quickSort from '../utils/排序/quickSort'
import { ListNode } from '../utils/数据结构/struct'

/**
 * 方法一：链表的自底向上归并
 * @param head 
 * @returns 
 */
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head

  let len = 0,
    p = head
  while (p) {
    p = p.next
    len++
  }
  const merge = (h1: ListNode, h2: ListNode) => {
    const dh = new ListNode(0, h1)
    let p = dh
    while (h1 && h2) {
      if (h1.val < h2.val) {
        p = p.next
        h1 = h1.next
      } else {
        p.next = h2
        h2 = h2.next
        p = p.next
        p.next = h1
      }
    }

    if (h2) p.next = h2
    return dh.next
  }
  const dh = new ListNode(0, head)
  for (let subLen = 1; subLen < len; subLen <<= 1) {
    let cur = dh.next,
      pre = dh
    while (cur) {
      const head1 = cur
      for (let i = 1; i < subLen && cur.next; i++) {
        cur = cur.next
      }
      const head2 = cur.next
      cur.next = null
      cur = head2

      // cur有可能为null
      for (let i = 1; i < subLen && cur && cur.next; i++) {
        cur = cur.next
      }

      let next = null
      if (cur) {
        next = cur.next
        cur.next = null
        cur = next
      }

      const mergeHead = merge(head1, head2)

      pre.next = mergeHead

      while (pre.next) pre = pre.next
    }
  }
  return dh.next
}

/**
 * 方法二：放入数组快排
 * @param head 
 * @returns 
 */
function sortList2(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  const arr: ListNode[] = []
  while(head) {
    arr.push(head)
    head = head.next
  }

  // arr.sort((a, b) => a.val - b.val)
  quickSort(arr, (a, b) => a.val - b.val)

  for (let i = 0; i < arr.length; i++) {
    arr[i].next = arr[i + 1] ? arr[i + 1] : null    
  }
  return arr[0]
}