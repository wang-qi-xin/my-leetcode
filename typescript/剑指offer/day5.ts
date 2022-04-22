import { quickSort } from '../类型/排序/quickSort'
import { Heap, ListNode } from './struct'

/**
 * 剑指 Offer II 078. 合并排序链表（困难）
  [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]

 k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4

 * @param lists 
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const compareFn = (a: ListNode, b: ListNode): number => {
    return a.val - b.val
  }
  lists = lists.filter(list => list != null)
  const minHeap = new Heap<ListNode>({ data: lists, mode: 'little', compareFn: compareFn })
  /**
   * 1. 将lists中的每条链表的头节点入最小堆
     2. 定义一个head， p指向heap
     3. 从heap中拿出一个最小节点node，现将其next入堆
     4. 将node 链接到p后面，p = p.next
   */

  const head = new ListNode(-1)
  let p = head
  while (minHeap.size()) {
    const node = minHeap.pop()
    if (node.next) {
      minHeap.insert(node.next)
    }
    p.next = node
    p = p.next
  }
  return head.next
}

/**
 * 测试合并k有序链表
 */
const testmergeKLists = () => {
  // const l = [[1,4,5],[1,3,4],[2,6]]
  const l = [[-8, -7, -7, -5, 1, 1, 3, 4], [-2], [-10, -10, -7, 0, 1, 3], [2]]
  // const l = [[]]
  const list = l.map(a => {
    let head = new ListNode(a[0])
    let p = head
    for (let i = 1; i < a.length; i++) {
      p.next = new ListNode(a[i])
      p = p.next
    }
    return head
  })
  let sortList = mergeKLists(list)
  while (sortList) {
    console.log(sortList.val)
    sortList = sortList.next
  }
}
// testmergeKLists()

/**
 * 剑指 Offer 57. 和为s的两个数字
 * @param nums
 * @param target
 */
function twoSum(nums: number[], target: number): number[] {
  let i = 0,
    j = nums.length - 1
  while (i < j) {
    const s = nums[i] + nums[j]
    if (s === target) return [nums[i], nums[j]]
    if (s < target) {
      i++
    } else {
      j--
    }
  }
  return []
}

/**
 * 剑指 Offer 45. 把数组排成最小的数
 * @param nums 
 */
function minNumber(nums: number[]): string {
  const arr = nums.map(n => `${n}`)
  quickSort(arr, (a, b) => +(a + b) - +(b + a))
  return arr.join("")
};

/**
 * 剑指 Offer 46. 把数字翻译成字符串
 * @param num 
 */
function translateNum(num: number): number {
  /**
   * 有条件的斐波那契数列。f(n) = f(n - 1) + f(n - 2)
   * 当n和n-1组成的数字x，不能翻译（即x < 10 或 x > 25）
   * 就不能算上f(n - 2)
   */
  const arr = `${num}`.split("")
  let dp = [1, 1]
  for(let i = 1; i < arr.length; i++){
    const n = +(arr[i - 1] + arr[i])
    if(n >= 10 && n < 26){
      dp[i + 1] = dp[i] + dp[i - 1]
    }else {
      dp[i + 1] =dp[i]
    }
  }
  return dp.pop()
  
};

// console.log(translateNum(12258))