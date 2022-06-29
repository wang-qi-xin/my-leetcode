/**
剑指 Offer II 078. 合并排序链表
给定一个链表数组，每个链表都已经按升序排列。

请将所有链表合并到一个升序链表中，返回合并后的链表。

 

示例 1：

输入：lists = [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]
解释：链表数组如下：
[
  1->4->5,
  1->3->4,
  2->6
]
将它们合并到一个有序链表中得到。
1->1->2->3->4->4->5->6
示例 2：

输入：lists = []
输出：[]
示例 3：

输入：lists = [[]]
输出：[]
 

提示：

k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4
 
 */

import { Heap, ListNode } from '../utils/数据结构/struct'

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

/**
 * 方法一：两两合并
 * @param lists
 * @returns
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null
  const merge = (h1: ListNode | null, h2: ListNode | null) => {
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
    if (h2) {
      p.next = h2
    }
    return dh.next
  }
  for (let i = 1; i < lists.length; i++) {
    lists[0] = merge(lists[0], lists[i])
  }
  return lists[0]
}

/**
 * 方法二: 堆排序
 * @param lists
 * @returns
 */
function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
  if (lists.length === 0) return null
  const h = new Heap<ListNode>({ compareFn: (a, b) => a.val - b.val })
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) h.insert(lists[i])
  }

  const dh = new ListNode(0)
  let p = dh
  while (h.size()) {
    const node = h.pop()
    p.next = node
    p = p.next
    if (node.next) h.insert(node.next)
  }
  return dh.next
}
