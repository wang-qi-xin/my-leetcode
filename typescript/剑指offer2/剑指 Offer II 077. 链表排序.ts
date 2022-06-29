/**
剑指 Offer II 077. 链表排序
给定链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

 

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
 

进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？

 
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

function sortList(head: ListNode | null): ListNode | null {
  /**
   链表归并
   
   1. 遍历链表记录长度len
   2. 使用哑结点，当做head的前驱。
   3. 归并长度subLen = 1. 每进行一轮归并，subLen *= 2
   
   一轮归并
   1. 从dh.next开始，将相邻的两个subLen长度的链表进行合并。（合并两个有序链表）

    */

  let node = head,
    len = 0

  while (node) {
    len++
    node = node.next
  }

  /**
   * 合并两个有序链表
   * @param head1
   * @param head2
   */
  const merge = (head1: ListNode | null, head2: ListNode | null): ListNode | null => {
    const dh = new ListNode(0, head1)
    let p = dh
    while (head1 && head2) {
      // 1. 如果h1 < h2. 则p和h1同时后移
      if (head1.val < head2.val) {
        p = head1
        head1 = p.next
      } else {
        // 2. h1 > h2，此时应该把h2插入p和h1之间。
        p.next = head2
        head2 = head2.next
        p = p.next
        p.next = head1
      }
    }
    // 如果h2还有，说明h2的元素都大于h1中元素，之间放到h1后面
    if (head2) p.next = head2
    return dh.next
  }

  const dh = new ListNode(0, head)

  for (let subLen = 1; subLen < len; subLen <<= 1) {
    let pre = dh,
      cur = dh.next

    while (cur) {
      // 1. 截取第一段长为subLen的链表，头节点为head1
      const head1 = cur
      for (let i = 1; i < subLen && cur.next; i++) {
        cur = cur.next
      }
      // 2. 截取第二段长为subLen的链表，头节点为head2
      const head2 = cur.next

      // 3. 将第一段链表的尾置空。
      cur.next = null

      // 4. 寻找第二段链表的尾结点。第二段链表有可能为空，或者长度小于subLen
      cur = head2
      for (let i = 1; i < subLen && cur && cur.next; i++) {
        cur = cur.next
      }

      // next指向尚未归并的头节点
      let next = null
      // 5. 如果第二段链表后面还有节点，表示该轮归并尚未结束。
      if (cur) {
        // 6. 使next执行剩余链表的偷
        next = cur.next
        // 7. 把第二段链表的尾结点置为空
        cur.next = null
        // 8. 令cur指向剩余节点的偷
        cur = next
      }

      // 9. 合并head1和head2两个有序链表。
      const mergeHead = merge(head1, head2)

      // 10. 将合并后的链表mergeHead连接到pre到next之间
      pre.next = mergeHead
      while (pre.next) {
        pre = pre.next
      }
    }
  }
  return dh.next
}

const test = () => {
  const h = new ListNode(5)
  h.next = new ListNode(1)
  h.next.next = new ListNode(2)
  h.next.next.next = new ListNode(8)
  h.next.next.next.next = new ListNode(3)
  console.log(print(sortList(h)))
}

const print = node => {
  const a = []
  while (node) {
    a.push(node.val)
    node = node.next
  }
  return a
}

test()
