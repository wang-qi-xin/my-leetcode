/**
 * 剑指 Offer 42. 连续子数组的最大和
输入一个整型数组，数组中的一个或连续多个整数组成一个子数组。求所有子数组的和的最大值。

要求时间复杂度为O(n)。

 

示例1:

输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 

提示：

1 <= arr.length <= 10^5
-100 <= arr[i] <= 100
 * @param nums 
 */
function maxSubArray(nums: number[]): number {
  let max = nums[0]
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i] + nums[i - 1]) {
      nums[i] = nums[i - 1] + nums[i]
    }
    max = Math.max(max, nums[i])
  }
  return max
}

/**
 * 剑指 Offer 31. 栈的压入、弹出序列
 * @param pushed
 * @param popped
 */
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  /**
    使用栈来模拟
    1. 判断栈顶元素是否是popped对应元素（题目规定元素不相同）
    2. 如果等于，就一直弹出元素，直到元素不相同
    3. 不等于时，就压入pushed里的元素
   */
  const stack = []
  let j = 0
  for (let i = 0; i < pushed.length; i++) {
    stack.push(pushed[i])
    while (stack.length !== 0 && stack[stack.length - 1] === popped[j]) {
      stack.pop()
      j++
    }
  }
  return stack.length === 0
}

/**
 * 剑指 Offer 38. 字符串的排列
输入一个字符串，打印出该字符串中字符的所有排列。

 

你可以以任意顺序返回这个字符串数组，但里面不能有重复元素。

 

示例:

输入：s = "abc"
输出：["abc","acb","bac","bca","cab","cba"]
 

限制：

1 <= s 的长度 <= 8
 * @param s 
 */
function permutation(s: string): string[] {
  const res = []
  const list = s.split('')
  /**
    dfs。固定某位，搜索下一位。
    末尾时，判断res是否在结果集set中
   */
  const swap = (i, j) => {
    const temp = list[i]
    list[i] = list[j]
    list[j] = temp
  }
  const dfs = (x: number) => {
    if (x === s.length - 1) {
      res.push(list.join(''))
      return
    }
    const set = new Set()
    for (let i = x; i < s.length - 1; i++) {
      // 利用set判断是否有重复元素，有的话剪枝
      if (set.has(list[i])) continue
      set.add(list[i])
      swap(i, x)
      dfs(x + 1)
      swap(i, x)
    }
  }
  dfs(0)
  return res
}

/**
 * 剑指 Offer 43. 1～n 整数中 1 出现的次数
输入一个整数 n ，求1～n这n个整数的十进制表示中1出现的次数。

例如，输入12，1～12这些整数中包含1 的数字有1、10、11和12，1一共出现了5次。

 

示例 1：

输入：n = 12
输出：5
示例 2：

输入：n = 13
输出：6
 

限制：

1 <= n < 2^31
 * @param n 
 */
function countDigitOne(n: number): number {
  /**
  1. 获取x的每一位的数字
  2. 对于5678. 当cur=7时， low = 8， high = 56, dight = 10^1
  3. 当cur等于0时，该位的1只取决于high * dight，（比如103， 110 ~ 119 ，1的个数为 1 * 10^1）
  4. 当cur等于1时，该位的1取决于high*dight + low + 1 (比如123的1， 从100 ~ 123 ， 1的个数为 0 * 10^2 + 23 + 1)
  5. 当cur等于2~9时，该位的1取决于（high+1） * dight （比如234的2， 该位的1，从100~199）（234的3， 该位的1，从210~219 110~119 共20个）
   */
  let res = 0,
    cur = n % 10,
    low = 0,
    high = Math.floor(n / 10),
    dight = 1
  while (cur !== 0 || high !== 0) {
    if (cur === 0) {
      res += high * dight
    } else if (cur === 1) {
      res += high * dight + low + 1
    } else {
      res += (high + 1) * dight
    }
    low += cur * dight
    cur = high % 10
    high = Math.floor(high / 10)
    dight *= 10
  }

  return res
}

/**
 * 剑指 Offer 39. 数组中出现次数超过一半的数字
 * @param nums
 */
function majorityElement(nums: number[]): number {
  /**
   * 投票法
       1. 众数将其它数字全部抵消，之后剩余的那个就是众数（本题一定有）
       2. 票数vote初始为0，众数x假设为nums[0]
       3. 如果遇到某个数n等于众数x，则vote+=1
       4. 不等于则抵消，也就是vote-=1
       5. 最后x一定是众数
   */
  let vote = 0,
    x = 0
  for (let i = 0; i < nums.length; i++) {
    if (vote === 0) {
      x = nums[i]
    }
    if (nums[i] === x) {
      vote += 1
    } else {
      vote -= 1
    }
  }

  return x
}

/**
 * 剑指 Offer 44. 数字序列中某一位的数字
 * @param n
 */
function findNthDigit(n: number): number {
  let count = 9, // 数位，跟n做对比
    digit = 1, // 位数，三位数那么digit = 3
    start = 1 // 1 10 100 。。。
  while (n > count) {
    n -= count
    start *= 10
    digit += 1
    count += 9 * digit * start
  }
  const num = start + Math.floor((n - 1) / digit) 
  return +`${num}`[(n - 1) % digit]
}
// let a = []
// for (let i = 0; i < 1000; i++) {
//   a.push(findNthDigit(i))
// }
// console.log(a.join(''))

