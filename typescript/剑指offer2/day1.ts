/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-23 17:17:32
 * @LastEditors: one
 * @LastEditTime: 2022-05-02 23:54:32
 */

import { TreeNode } from '../utils/数据结构/struct'

/**
 * 剑指 Offer 60. n个骰子的点数
 (动态规划)
 概率问题
 * @param n
 */
function dicesProbability(n: number): number[] {
  /**
   * 2个骰子时，点数为2-12(temp[0] -> temp[11])，与1个骰子点数的关系为123456(dp[0] -> dp[5])等六个点数的概率，分别乘以新加入的一个骰子各点的概率（1/6）
   * 也就是temp[0] = dp[0] / 6  (一个骰子点数为1， 新加入的点数也是1)
          temp[1] = dp[0] / 6 + dp[1] / 6 (两种情况1+2， 2+1)
   */
  // dp 应该是个梯形的二维数组。第一层是6， 第二层是11， 第三层是16.（3个骰子点数为3-18）
  // 但是因为每一层，只跟上一层有关系，所以省略为一维数组。
  let dp = [...Array(6)].map(i => 1 / 6)
  for (let i = 2; i <= n; i++) {
    const temp = [...Array(5 * i + 1)].map(i => 0)
    // 遍历i-1个骰子时的点数概率
    for (let j = 0; j < dp.length; j++) {
      // 新加入的骰子概率
      for (let k = 0; k < 6; k++) {
        temp[j + k] += dp[j] / 6
      }
    }
    dp = temp
  }
  return dp
}
// console.log(dicesProbability(1))

/**
 * 剑指 Offer 67. 把字符串转换成整数
 * @param str
 */
function strToInt(str: string): number {
  str = str.trim()
  let sign = 1
  let c = str.charAt(0)
  // 取符号位
  if (c === '+' || c === '-') {
    sign = c === '+' ? 1 : -1
    str = str.substring(1)
  }
  let s = ''
  /**
   * 判断是否是数字
   * @param c
   * @returns
   */
  const isNumber = (c: string) => {
    if (c === '0') return true
    return Boolean(+c)
  }
  // 如果碰到了非数字，就break
  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i)
    if (isNumber(c)) {
      s += c
    } else {
      break
    }
  }
  let result = sign * +s
  const MAX = Math.pow(2, 31) - 1
  const MIN = -Math.pow(2, 31)
  if (result > MAX) result = MAX
  if (result < MIN) result = MIN
  return result
}
// console.log(strToInt(' -42'))

/**
 * 剑指 Offer 61. 扑克牌中的顺子
  （排序+筛选）太慢了
 * @param nums
 */
function isStraight(nums: number[]): boolean {
  /**
   1. 先排序
   2. 把0截出来 z = 0的数目
   3. 遍历非0.用res 记录后一位与前一位的（差 - 1）
   4. 如果res <= z, 就是顺子
   */
  nums.sort((a, b) => a - b)
  let z = 0,
    res = 0
  for (let i = 0; i < 5; i++) {
    if (nums[i] !== 0) break
    z += 1
  }
  for (let i = z; i < 4; i++) {
    // 如果出现重复的非零数字，直接返回false
    if (nums[i + 1] === nums[i]) return false
    res += nums[i + 1] - nums[i] - 1
  }
  return res <= z
}

/**
 * 剑指 Offer 61. 扑克牌中的顺子
   (利用Set)
 * @param nums 
 * @returns 
 */
function isStraight2(nums: number[]): boolean {
  /**
   1. 跳过0
   2. 重复数，直接返回false
   3. 取最大值max，最小值min
   4. 如果max - min < 5 说明是顺子
   */
  let max = 0,
    min = 14
  let set = new Set()
  for (let i = 0; i < 5; i++) {
    let n = nums[i]
    if (n === 0) continue
    if (set.has(n)) return false
    min = Math.min(min, n)
    max = Math.max(max, n)
    set.add(n)
  }
  return max - min < 5
}
// isStraight2([0,0,2,2,5])

/**
 * 剑指 Offer 63. 股票的最大利润
    动态规划
 * @param prices 
 */
function maxProfit(prices: number[]): number {
  let max = 0
  for (let i = prices.length - 2; i >= 0; i--) {
    let c = prices[i + 1] - prices[i]
    if (c > 0) {
      max = Math.max(max, c)
      prices[i] = prices[i + 1]
    }
  }
  return max
}

// console.log(maxProfit([7,1,5,3,5]));

/**
 * 剑指 Offer 64. 求1+2+…+n
 * @param n
 */
function sumNums(n: number): number {
  // 递归，但是不使用if判断n == 0.
  // 使用&&运算符来判断
  let res = n && sumNums(n - 1) + n
  return res
}

// console.log(sumNums(1))

/**
 * 剑指 Offer 14- I. 剪绳子
 * @param n
 */
function cuttingRope(n: number): number {
  if (n <= 3) return n - 1

  // 将n尽可能分为长度为3的片段
  // 如果最后一段不够3，
  // 即b = 1, b = 2 两种情况
  // 1. b == 1: 把b分给其中一个3， 因为3 * 3 * 1 小于3 * 4
  // 2. b == 2: 返回3^a * 2
  let a = Math.floor(n / 3),
    b = n % 3

  if (b === 0) return Math.pow(3, a)
  if (b === 1) return Math.pow(3, a - 1) * 4
  return Math.pow(3, a) * 2
}

// console.log(cuttingRope(10))

/**
 * 剑指 Offer 14- II. 剪绳子 II
 * @param n
 */
function cuttingRope2(n: number): number {
  if (n <= 3) return n - 1

  // 将n尽可能分为长度为3的片段
  // 如果最后一段不够3，
  // 即b = 1, b = 2 两种情况
  // 1. b == 1: 把b分给其中一个3， 因为3 * 3 * 1 小于3 * 4
  // 2. b == 2: 返回3^a * 2

  // 由于可能越界，所以不能使用pow函数
  // 使用for循环，每次都对1000000007取余
  let a = Math.floor(n / 3),
    b = n % 3,
    p = 1000000007,
    res = 1
  for (let i = 0; i < a - 1; i++) {
    res = (3 * res) % p
  }

  if (b === 0) return (3 * res) % p
  if (b === 1) return (4 * res) % p
  return (6 * res) % p
}
// console.log(cuttingRope2(1000))

/**
 * 剑指 Offer 32 - I. 从上到下打印二叉树
 * @param root
 */
function levelOrder(root: TreeNode | null): number[] {
  if (!root) return []
  const stack: TreeNode[] = [],
    res: number[] = []
  stack.push(root)
  while (stack.length) {
    const node = stack.shift()
    res.push(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }
  return res
}

/**
 * 剑指 Offer 32 - II. 从上到下打印二叉树 II
  (每一层一个数组，结果是二维数组)
 * @param root
 */
function levelOrder2(root: TreeNode | null): number[][] {
  if (!root) return []
  const stack: TreeNode[] = [],
    res: number[][] = []
  stack.push(root)
  while (stack.length) {
    const temp: number[] = []
    for (let i = stack.length; i > 0; i--) {
      const node = stack.shift()
      temp.push(node.val)
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
    res.push(temp)
  }
  return res
}

/**
 * 剑指 Offer 32 - III. 从上到下打印二叉树 III
    之 字型打印

 * @param root 
 */
function levelOrder3(root: TreeNode | null): number[][] {
  if (!root) return []
  const stack: TreeNode[] = [],
    res: number[][] = []
  let d: boolean = false // d == true 代表从左往右
  stack.push(root)
  while (stack.length) {
    const temp: number[] = []
    for (let i = stack.length; i > 0; i--) {
      const node = stack.shift()
      if (d) {
        temp.unshift(node.val)
      } else {
        temp.push(node.val)
      }
      if (node.left) stack.push(node.left)
      if (node.right) stack.push(node.right)
    }
    res.push(temp)
    d = !d
  }
  return res
}

/**
 * 剑指 Offer 55 - I. 二叉树的深度
 * @param root
 */
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
}

/**
 * 剑指 Offer 56 - I. 数组中数字出现的次数
 位运算
 * @param nums 
 */
function singleNumbers(nums: number[]): number[] {
  /**
   * 难点在于时间复杂度O(N), 且有两个不同的数字
     1. 如何将这两个数字区分开呢？
        两个不同的数字a,b，二进制中一定有一位不一样，导致a ^ b = x, x中某一位为1
     2. 如何找到a ^ b 这个数字？
        遍历nums，n ^= nums[i]
        最后的数字n = a ^ b
     3. 如何找不同的那一位二进制数 ？
        令d = 1
        循环d & x ，直到d & x 不等于 0
        每次d <<= 1
     4. 遍历nums
        根据d & nums[i] === 0 来区分数字
        相同的两个数字必然被分到同一组 
   */

  const x = nums.reduce((p, c) => p ^ c, 0)
  let d = 1
  while ((d & x) === 0) {
    d <<= 1
  }
  let a = 0,
    b = 0
  for (let i = 0; i < nums.length; i++) {
    if ((nums[i] & d) === 0) {
      a ^= nums[i]
    } else {
      b ^= nums[i]
    }
  }
  return [a, b]
}

/**
 * 剑指 Offer 56 - II. 数组中数字出现的次数 II
  (统计二进制数的每一位的1出现的个数)
  (然后把该数组转为十进制数res)
  (每一位都跟3取余，这样就把出现了3次的重复数过滤了)
 在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。
 * @param nums 
 */
function singleNumber(nums: number[]): number {
  const a = [...Array(32)].map(i => 0)

  for (let i = 0; i < nums.length; i++) {
    let n = nums[i]
    for (let j = 0; j < 32; j++) {
      a[j] += n & 1
      n >>= 1
    }
  }
  let res = 0,
    m = 3
  for (let i = 0; i < 32; i++) {
    res <<= 1
    res |= a[31 - i] % m
  }
  return res
}
// singleNumber([1,2,1,1])

/**
 * 剑指 Offer 57 - II. 和为s的连续正数序列
 (滑动窗口)
 * @param target 
 */
function findContinuousSequence(target: number): number[][] {
  const res: number[][] = []
  let i = 1,
    j = 2,
    sum = 3
  // sum 表示从i + (i + 1) + 。。。 j的和。
  // 如果sum == target, res.push([i, i + 1, ... , j])，然后i, j 都加1, sum += j - i + 1
  // 如果sum > target, sum -= i, 然后让i += 1
  // 否则j += 1, sum += j ----- 注意顺序
  while (i < j) {
    if (sum === target) {
      const arr = [...Array(j - i + 1)].map((_, index) => index + i)
      res.push(arr)
      i++
      j++
      sum += j - i + 1
    } else if (sum > target) {
      sum -= i
      i++
    } else {
      j++
      sum += j
    }
  }
  return res
}

/**
 * 剑指 Offer 57 - II. 和为s的连续正数序列
 (数学法， 等差1的数列和问题)
 * @param target 
 */
function findContinuousSequence2(target: number): number[][] {
  const res: number[][] = []
  let i = 1,
    j = 2
  // 左右边界为i, j
  // 可以算出该序列的数列和sum
  // 令sum = target
  // 共3个变量i, j, target
  // target已知。
  // 令i = 1, 2, 3, ...
  // 则可以求出j。当j为正整数时，添加[i, i+ 1, ..., j]到res
  while (i < j) {
    j = (-1 + Math.sqrt(1 + 4 * (2 * target + i ** 2 - i))) / 2
    if (i < j && j === Math.floor(j)) {
      const arr = [...Array(j - i + 1)].map((_, index) => i + index)
      res.push(arr)
    }
    i++
  }
  return res
}

// findContinuousSequence(15)

/**
 * 剑指 Offer 58 - I. 翻转单词顺序
 * @param s
 */
function reverseWords(s: string): string {
  // return s.trim().split(" ").map(v => v.trim()).filter(v => v !== "").reverse().join(" ")

  // 双指针逆向
  s = s.trim()
  // i 指向单词前面的空格， j 指向单词末尾
  let i = s.length - 1,
    j = i
  let res = ''
  while (i >= 0) {
    // 1. 让i指向单词前面的空格
    while (i >= 0 && s.charAt(i) !== ' ') i--
    // 2. i + 1, 到j + 1就是一个单词
    res += s.substring(i + 1, j + 1) + ' '
    // 3. 让i跳过空格，指向下一个单词末尾
    while (i >= 0 && s.charAt(i) === ' ') i--
    j = i
  }
  return res.trim()
}

/**
 * 剑指 Offer 53 - I. 在排序数组中查找数字 I
 * @param nums
 * @param target
 */
function search(nums: number[], target: number): number {
  const binarySearch = (t: number): number => {
    let i = 0,
      j = nums.length - 1
    while (i <= j) {
      const mid = i + ((j - i) >> 1)
      if (nums[mid] < t) {
        i = mid + 1
      } else {
        j = mid - 1
      }
    }
    return i
  }

  return binarySearch(target + 1) - binarySearch(target)
}

/**
 * 剑指 Offer 53 - II. 0～n-1中缺失的数字
 * @param nums
 */
function missingNumber(nums: number[]): number {
  /**
   1. 二分查找。
   2. 如果mid 不等于nums[mid] ，此时nums[mid]一定大于mid。缺失的数字一定位于left-mid之间
      令right=mid - 1
   3. 否则说明mid之前的数字都不缺
   4. left = mid + 1
   */
  let left = 0,
    right = nums.length - 1
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (mid !== nums[mid]) {
      right = mid
    } else {
      left = mid + 1
    }
  }
  return left
}

/**
 * 剑指 Offer 59 - I. 滑动窗口的最大值
 * @param nums
 * @param k
 */
function maxSlidingWindow(nums: number[], k: number): number[] {
  /**
    1. 维护一个单调双端队列，队列中只保留当前窗口的元素，且递减
    2. 当访问元素nums[i]时，把队列里面比nums[i]小的全部弹出。
        nums[i - k] 也就是从窗口里踢出的元素，如果该元素等于deque[0]，就把deque[0]弹出
    3. 每一轮都把队首的元素保存至结果集
   */

  let res: number[] = [],
    deque: number[] = []
  for (let i = 0; i < k; i++) {
    while (deque.length && deque[deque.length - 1] <= nums[i]) {
      deque.pop()
    }
    deque.push(nums[i])
  }
  // 防止nums = []
  if (deque.length) res.push(deque[0])

  for (let i = k; i < nums.length; i++) {
    if (nums[i - k] === deque[0]) {
      deque.shift()
    }

    //  < 不能用<=,
    // 若是当前窗口里有某个数字x，而nums[i] == x, 就会把x从队列弹出
    // 当后面某一轮，窗口弹出某个等于x的数，就会把这个数也从队列弹出
    while (deque.length && deque[deque.length - 1] < nums[i]) {
      deque.pop()
    }

    deque.push(nums[i])
    res.push(deque[0])
  }

  return res
}

// console.log(maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4))

/**
 * 剑指 Offer 59 - II. 队列的最大值
 */
class MaxQueue {
  queue: number[]
  deque: number[]
  constructor() {
    this.queue = []
    this.deque = []
  }

  /**
   * 获取当前队列的最大值
   * @returns 
   */
  max_value(): number {
    if(this.deque.length) return this.deque[0]
    return -1
  }
  /**
   * 在队尾添加元素
   * @param value 
   */
  push_back(value: number): void {
    this.queue.push(value)
    // 把双端队列deque里比value小的全部弹出
    while(this.deque.length && this.deque[this.deque.length - 1] < value){
      this.deque.pop()
    }
    this.deque.push(value)
  }
  /**
   * 弹出队首元素
   * @returns 
   */
  pop_front(): number {
    if(this.queue.length === 0) return -1
    const pop = this.queue.shift()
    // 如果弹出的队首元素等于双端队列deque的队首元素（最大值），就把deque的队首弹出
    if(pop === this.deque[0]){
      this.deque.shift()
    }
    return pop
  }
}
