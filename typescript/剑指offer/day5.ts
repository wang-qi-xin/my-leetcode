import { quickSort } from '../类型/排序/quickSort'
import { Heap, ListNode, TreeNode } from './struct'

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
  return arr.join('')
}

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
  const arr = `${num}`.split('')
  let dp = [1, 1]
  for (let i = 1; i < arr.length; i++) {
    const n = +(arr[i - 1] + arr[i])
    if (n >= 10 && n < 26) {
      dp[i + 1] = dp[i] + dp[i - 1]
    } else {
      dp[i + 1] = dp[i]
    }
  }
  return dp.pop()
}

// console.log(translateNum(12258))

/**
 * 剑指 Offer 47. 礼物的最大价值
 * @param grid
 */
function maxValue(grid: number[][]): number {
  if (grid.length < 1 || grid[0].length < 1) return 0
  /**
   * 使用dp
     dp[i][j] 只和它正上方dp[i - 1][j]与左边dp[i][j - 1]有关
     由于不涉及dp[i][j]的其它位置，所以可以使用一维数组来优化。
   */
  const m = grid.length
  const n = grid[0].length
  const dp = [...Array(n + 1)].map(i => 0)
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dp[j + 1] = Math.max(dp[j + 1], dp[j]) + grid[i][j]
    }
  }
  return dp.pop()
}

// console.log(
//   maxValue([
//     [1, 3, 1],
//     [1, 5, 1],
//     [4, 2, 1]
//   ])
// )

/**
 * 剑指 Offer 48. 最长不含重复字符的子字符串
 * 动态规划 + Map
 * @param s
 */
function lengthOfLongestSubstring(s: string): number {
  /**
    1. 长度为s.length的数组dp。
    2. 一个map用来判断是否有重复字符(存储c和index)
    3. 遍历s，寻找s[i]是否在map中。如果没有，则index=-1.该元素首次出现
    4. 把该元素和下标存入map。
    5. 如果有有重复的s[i]，找到其index。判断i - index 与dp[i - 1]的大小，谁小取谁。（dp[i - 1]小，说明index到i之前还有重复的，不连续）
    6. 用max取dp的最大值
   */
  let max = 0,
    map = new Map(),
    len = s.length,
    temp = 0

  for (let i = 0; i < len; i++) {
    const c = s.charAt(i)
    let index = -1
    if(map.has(c)) index = map.get(c)
    map.set(c, i)
    temp = temp < i - index ? temp + 1 : i - index
    max = Math.max(max, temp)
  }

  return max
}

// console.log(lengthOfLongestSubstring(" s op"))

/**
 * 剑指 Offer 54. 二叉搜索树的第k大节点
 * @param root 
 * @param k 
 */
function kthLargest(root: TreeNode | null, k: number): number {
  /**
   * 1. 先右，再中，再左遍历
   * 2. 每次访问节点时，k--
   * 3. 当k === 0;说明已经找到结果了。终止递归
   * 4. 当k === 1. 当前访问节点就是结果。保存起来res
   */
   let res = 0;
   const recur = (node: TreeNode) => {
     if(!node) return 
     recur(node.right)
     if(k === 0) return
     if(--k === 0) res = node.val
     recur(node.left)
   }
   recur(root)
   return res;

};

/**
 * 剑指 Offer 49. 丑数
 * 动态规划
 * @param n 
 */
function nthUglyNumber(n: number): number {
  /**
   * 丑数n，一定是由较小的三个丑数 * 2， 3 ，5，然后取最小值
   * 分别用a, b, c记录这三个丑数的下标。
   * 初始时都是0。（dp[0] === 1)
   * 每次更新dp[i]（第i - 1个丑数）时，需要更新a, b, c
   * 注意：有可能a * 2 === b * 3. 所以有可能a , b 都需要加1
   */
  const dp = [1]
  let [a, b, c] = [0, 0, 0]
  for(let i = 1; i < n; i++){
    const [n2, n3, n5] = [dp[a] * 2, dp[b] * 3, dp[c] * 5]
    dp[i] = Math.min(n2, n3, n5)
    if(dp[i] === n2) a += 1
    if(dp[i] === n3) b += 1
    if(dp[i] === n5) c += 1
  }
  return dp[n - 1]
};