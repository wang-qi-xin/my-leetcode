import { TreeNode } from './struct'

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
    count = 9 * digit * start
  }
  const num = start + Math.floor((n - 1) / digit)
  return +`${num}`[(n - 1) % digit]
}
// let a = []
// for (let i = 0; i < 1000; i++) {
//   a.push(findNthDigit(i))
// }
// console.log(a.join(''))

/**
 * 剑指 Offer 33. 二叉搜索树的后序遍历序列
 递归
 * @param postorder
 */
function verifyPostorder(postorder: number[]): boolean {
  const recur = (i, j) => {
    if (i >= j) return true // 无节点，或单节点返回true
    let p = i
    while (postorder[p] < postorder[j]) p++ // 找第一个大于根节点（当前数组末尾的值）m，左边的是根节点的左子树，右边（包括自己）是右子树
    let m = p
    while (postorder[p] > postorder[j]) p++ // p后面一直到j - 1，都应该大于根节点。
    return p === j && recur(i, m - 1) && recur(m, j - 1)
  }
  return recur(0, postorder.length - 1)
}

/**
 * 剑指 Offer 33. 二叉搜索树的后序遍历序列
 辅助单调栈
 * @param postorder
 */
function verifyPostorder2(postorder: number[]): boolean {
  /**
   * 1. 逆序遍历。即根，右，左的顺序
   * 2. 如果当前节点比根节点大，则返回false（在赋值root时，已经跳过了root的右子树节点。初始为max_value）
   * 3. 当栈不为空，并且栈顶元素比当前元素小，说明栈中的元素都是根节点的右子树。根节点也在栈中，while循环，直到将根节点赋值root
   * 4. 将当前元素入栈。（一定是当前根节点的左子树，小于root）
   */
  const stack = []
  let root = Number.MAX_VALUE
  for (let i = postorder.length - 1; i >= 0; i--) {
    if (postorder[i] > root) return false
    while (stack.length !== 0 && stack[stack.length - 1] > postorder[i]) {
      root = stack.pop()
    }
    stack.push(postorder[i])
  }
  return true
}
// console.log(verifyPostorder([4, 6, 7, 5]))

/**
 * 剑指 Offer 50. 第一个只出现一次的字符
 * @param s
 */
function firstUniqChar(s: string): string {
  if (s === '') return ' '
  const map = new Map<string, boolean>()
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i)
    map.set(c, !map.has(c))
  }
  for (let [k, v] of map.entries()) {
    if (v) return k
  }
  return ' '
}

// console.log(firstUniqChar("cc"))

/**
 * 剑指 Offer 34. 二叉树中和为某一值的路径
 * 回溯
 * @param root
 * @param target
 */
function pathSum(root: TreeNode | null, target: number): number[][] {
  const res: number[][] = []
  const path: number[] = []
  const dfs = (node: TreeNode | null, cur: number) => {
    if (!node) return
    // 加入节点路径
    path.push(node.val)
    // 叶子结点，且路径和为target
    if (!node.left && !node.right && cur + node.val === target) {
      res.push([...path])
    } else {
      dfs(node.left, cur + node.val)
      dfs(node.right, cur + node.val)
    }
    // 恢复
    path.pop()
  }
  dfs(root, 0)
  return res
}

/**
 * 剑指 Offer 51. 数组中的逆序对(困难)
 * 方法一：暴力法：超时
 * @param nums
 */
function reversePairs(nums: number[]): number {
  /**
  对每一位数字，都从该位遍历
  1. 如果遇到比它小的，res += 1
   */
  let res = 0
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        res++
      }
    }
  }
  return res
}
/**
 * 剑指 Offer 51. 数组中的逆序对(困难)
 * 方法二，动态规划
 * @param nums
 */
function reversePairs2(nums: number[]): number {
  /**
  从后向前遍历（或逆转数组）
  1. 从当前位向后遍历，遇到的第一个比它小的数字j。dp[i] = 1 + j 
   */
  let dp = [0]
  nums.reverse()
  for (let i = 1; i < nums.length; i++) {
    let min = i - 1
    for (let j = i - 1; j >= 0; j--) {
      if (nums[i] > nums[j]) {
        min = j
        break
      }
    }
    if (nums[i] > nums[min]) {
      console.log(min, nums[min])

      dp[i] = 1 + dp[min]
    } else {
      dp[i] = 0
    }
  }
  let res = 0
  console.log(dp)

  dp.forEach(v => {
    res += v
  })
  return res
}

// console.log(reversePairs2([7,5,6,4]))
/**
 * 剑指 Offer II 074. 合并区间
以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

 

示例 1：

输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
输出：[[1,6],[8,10],[15,18]]
解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
示例 2：

输入：intervals = [[1,4],[4,5]]
输出：[[1,5]]
解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。
 

提示：

1 <= intervals.length <= 104
intervals[i].length == 2
0 <= starti <= endi <= 104
 * @param intervals 
 */
function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => {
    return a[0] - b[0]
  })
  const res = [intervals[0]]
  let num = 0;
  for(let i = 0; i < intervals.length; i++){
    if(res[num][1] >= intervals[i][0]){
      // 重合。
      res[num][1] = Math.max(res[num][1], intervals[i][1])
    }else {
      res[++num] = intervals[i]
    }
  }
  return res
}
console.log(
  merge([
    [1, 4]
    
  ])
)
