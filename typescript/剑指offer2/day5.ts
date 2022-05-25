import { quickSort } from '../utils/排序/quickSort'

/**
 * 剑指 Offer II 095. 最长公共子序列
 (动态规划)
 * @param text1
 * @param text2
 */
function longestCommonSubsequence(s: string, t: string): number {
  /**
  动态规划
  
  m = s.length
  n = t.length
  创建dp[m][n]
  其中dp[i][j]表示s[0 - i]和t[0 - j]的最长公共子序列
  
  如果s[i] === t[j], dp[i][j] = dp[i - 1][j - 1] + 1
  否则 dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])

  if(s[0] === t[0]) dp[0][0] = 1
  else dp[0][0] = 0
  */

  const dp = [...Array(s.length + 1)].map(_ => [...Array(t.length + 1)].fill(0))

  for (let i = 1; i <= s.length; i++) {
    const sc = s.charAt(i - 1)
    for (let j = 1; j <= t.length; j++) {
      if (sc === t.charAt(j - 1)) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[s.length][t.length]
}

/**
 * 剑指 Offer II 033. 变位词组
 * @param strs
 */
function groupAnagrams(strs: string[]): string[][] {
  /**
   1. 遍历strs
   2. 由于strs仅包含小写字母，创建长为26的数组num
   3. 保存strs[i]每一位出现的次数。然后将num转为string
   4. 将num存入map，value为数组[strs[i]]
   5. 如果map.has(num), 说明存在同位词，则map.get(num).push(strs[i])
   */
  const map = new Map<string, string[]>()
  for (let i = 0; i < strs.length; i++) {
    const num: number[] = [...Array(26)].fill(0),
      str = strs[i]

    for (let j = 0; j < str.length; j++) {
      num[str.charCodeAt(j) - 97]++
    }

    const numStr = num.toString()
    if (map.has(numStr)) {
      map.get(numStr).push(str)
    } else {
      map.set(numStr, [str])
    }
  }
  return [...map.values()]
}

/**
 * 剑指 Offer II 096. 字符串交织
 (动态规划)
 * @param s1
 * @param s2
 * @param s3
 */
function isInterleave(s1: string, s2: string, s3: string): boolean {
  /**
   动态规划

   dp[i][j] 表示s1[0-i]和s2[0-j]是否 可以交织成s3[0-(i + j + 1)]

   假如s1[i] == s3[i + j], 只要dp[i - 1][j]为true，(也就是s1[0-(i - 1)]和s2[0 - j]可以交织成s3[0-(i + j + 1)])则dp[i][j] = true
   同理s2[j] == s3[i + j], 只要dp[i][j - 1]为true, 则dp[i][j] = true

   假如s1长度为len， 下标范围为0 - len - 1. 而s1与s2交织时，s1的子串可以是空字符串"", 只要s2 == s3。
   所以dp[0][j], 表示s1取空串。dp[len]表示取整个s1。
   */
  const len1 = s1.length,
    len2 = s2.length,
    len3 = s3.length
  if (len1 + len2 !== len3) return false
  const dp = [...Array(len1 + 1)].map(i => [...Array(len2 + 1)].fill(false))

  // 两个空串可以交织成空串
  dp[0][0] = true

  // s1[0 - > i]是否可以和空串交织成s3[0->i]取决于s1.charAt(i) === s3.charAt(i)
  for (let i = 0; i < len1 && s1.charAt(i) === s3.charAt(i); i++) {
    dp[i + 1][0] = true
  }

  // s2同理
  for (let j = 0; j < len2 && s2.charAt(j) === s3.charAt(j); j++) {
    dp[0][j + 1] = true
  }

  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len2; j++) {
      dp[i + 1][j + 1] = (s1.charAt(i) === s3.charAt(i + j + 1) && dp[i][j + 1]) || (s2.charAt(j) === s3.charAt(i + j + 1) && dp[i + 1][j])
    }
  }
  return dp[len1][len2]
}

/**
 * 剑指 Offer II 035. 最小时间差
 * @param timePoints
 */
function findMinDifference(timePoints: string[]): number {
  /**
   时间总共有24 * 60 = 1440个。
   如果timePoints.length > 1440. 那么其中肯定有两个时间一样，此时返回0

   1. 将timePoints转为二维数组。[[h, m], [h, m]]
   2. 对二维数组进行排序，优先h
   3. 遍历排序后的数组。找出间隔最小的时间差。

   */
  if (timePoints.length > 1440) return 0
  let times: number[][] = timePoints.map(time => {
    let t = time.split(':')
    return [+t[0], +t[1]]
  })
  const compareFn = (a: number[], b: number[]) => {
    if (a[0] === b[0]) return a[1] - b[1]
    return a[0] - b[0]
  }
  quickSort(times, compareFn)
  console.log(times)
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 1; i < times.length; i++) {
    const interval = (times[i][0] - times[i - 1][0]) * 60 + times[i][1] - times[i - 1][1]
    min = Math.min(interval, min)
  }
  min = Math.min(min, times[0][0] * 60 + times[0][1] + (24 - times[times.length - 1][0]) * 60 - times[times.length - 1][1])
  console.log(min)

  return min
}

// findMinDifference(['00:00', '12:18', '19:19', '23:11'])
/**
 * 剑指 Offer II 036. 后缀表达式
 * @param tokens
 */
function evalRPN(tokens: string[]): number {
  /**
   1. 将+-*\放入set用来判断
   2. 遍历tokens， 如果token是数字，就将其压入栈中stack
   2. 如果token是符号，就将栈顶两个数字取出，进行运算后压入栈中
   */
  const stack: number[] = []
  for (let i = 0; i < tokens.length; i++) {
    const c = tokens[i]
    if (isNaN(+c)) {
      let result = 0,
        one = stack.pop(),
        two = stack.pop()
      if (c === '+') {
        result = one + two
      } else if (c === '-') {
        result = two - one
      } else if (c === '*') {
        result = two * one
      } else {
        result = two / one
        if (result < 0) {
          result = Math.ceil(result)
        } else {
          result = Math.floor(two / one)
        }
      }
      stack.push(result)
    } else {
      stack.push(+c)
    }
  }
  console.log(stack)

  return stack[0]
}

/**
 * 剑指 Offer II 097. 子序列的数目---困难
 （动态规划）
 * @param s
 * @param t
 */
function numDistinct(s: string, t: string): number {
  /**
  动态规划

  dp[i][j] 表示s[:i]中子序列包含t[:j]的个数
  1. 首先如果s[i] !== t[j], 则dp[i][j] = dp[i - 1][j]. 因为s[:i]的包含t[:j]的子序列，一定不包含s[i], 有没有s[i]无所谓。
      所以等于s[:i - 1]中包含t[:j]的子序列数，也就是dp[i - 1][j]
  2. 如果s[i] === t[j], 有2个情况
      a. 包含s[i], 也就是s[:i]中包含t[:j]的子序列，的最后一位是s[i] == t[j], dp[i][j] = s[:i - 1]中包含t[:j - 1]的子序列数dp[i - 1][j - 1]
      b. 不包含s[i], 也就是s[:i - 1]中包含t[:j]的子序列数，也就是dp[i - 1][j]
  

  边界
  1. 当i < j时，dp[i][j] = 0. 因为短的字符串一定不包含长的字符串
  2. dp[i][0] = 1. 因为s[:i]包含空串的子序列为1
   */

  if (s.length < t.length) return 0
  const dp = [...Array(s.length + 1)].map(i => [...Array(t.length + 1)].fill(0))
  // 边界1：dp[i][0] = 1. 因为s[:i]包含空串的子序列为1
  for (let i = 0; i < dp.length; i++) dp[i][0] = 1
  for (let i = 1; i < dp.length; i++) {
    const sc = s.charAt(i - 1)
    // 边界2：当i < j时，dp[i][j] = 0. 因为短的字符串一定不包含长的字符串
    for (let j = 1; j <= i && j < dp[0].length; j++) {
      const st = t.charAt(j - 1)
      if (sc === st) {
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }
  return dp[s.length][t.length]
}

/**
 * 剑指 Offer II 037. 小行星碰撞
 * @param asteroids
 */
function asteroidCollision(a: number[]): number[] {
  /**
  使用栈A: number[][], A[i]存储a[i]和下标i

  1. 遍历a, 如果a[i] > 0, 直接把[a[i], i]压入A
  2. 如果a[i] < 0.
     从栈顶开始遍历栈A,如果|A[k][0]| < |a[i]|, 则移除栈顶A[k], 并把a[k] = 0
     如果|A[k]| > |a[i]|, 则令a[i] = 0, 然后break
     如果|A[k]| == |a[i]|, 则移除栈顶A[k]，且令a[k] = 0, 然后break
  3. 把a[i] == 0 的过滤
   */

  const A: number[][] = []
  for (let i = 0; i < a.length; i++) {
    if (a[i] > 0) {
      A.push([a[i], i])
      continue
    }
    while (A.length) {
      const len = A.length - 1
      if (Math.abs(A[len][0]) < -a[i]) {
        a[A.pop()[1]] = 0
      } else if (Math.abs(A[len][0]) > -a[i]) {
        a[i] = 0
        break
      } else {
        a[A.pop()[1]] = 0
        a[i] = 0
        break
      }
    }
  }

  return a.filter(i => i !== 0)
}

/**
 * 剑指 Offer II 038. 每日温度
 （逆向思考）
 * @param temperatures
 */
function dailyTemperatures(temperatures: number[]): number[] {
  /**
   逆向思维: 对于每一天，向前看，把比该天气温低的都修改一下。

   使用单调栈stack
   1. 遍历t, 如果栈不为空，且栈顶元素j, t[j]小于t[i], 
      就把栈顶元素对应的下标j取出。
      令res[j] = i - j 
   2. 然后把栈顶元素pop出去。直到栈顶元素小于t[i],或为空
   3. 把当前元素下标i存入stack
   */

  const stack: number[] = [],
    res: number[] = [...Array(temperatures.length).fill(0)]
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop()
      res[j] = i - j
    }
    stack.push(i)
  }
  return res
}

/**
 * 剑指 Offer II 039. 直方图最大矩形面积
 (单调栈)
 * @param heights
 */
function largestRectangleArea(heights: number[]): number {
  /**
   单调栈

   求出以heights[i]为高的面积最大的矩阵。需要以i为中心左右扩展，找到第一个比heights[i]小的柱子。
   如果使用暴力法，时间复杂度O(N)

   1. 使用单调栈保存单调递增的height，如果当前height[i]比栈顶元素大，则入栈。
   2. 如果height[i] <= 栈顶元素height[j]，j = stack.pop(), 说明以height[j]为高的面积最大的矩阵的右边界就是i
      而左边界就是stack.peek(), 因为stack单调递增，stack.peek()刚好就是第一个小于height[j]的数
   3. 那么以height[j]为高的矩阵面积就是height[j] * (i - stack.peek() - 1)
   4. 循环，直到stack中没有元素，或者height[i] 比栈顶元素大。

   边界处理
   1. 假设heights = [5, 1], 那么当i = 1时，栈中就一个0（height[0] = 5 < height[1]）
      那么当stack.pop()，以后，stack.peek()就会报错
      而正确的计算面积方式的width为（i - stack.peek() - 1） = 1
      
      * 所以给stack中提前放入一个-1，就可以省去判断边界了。
   2. 假设heights = [1, 2, 3], 那么当for循环结束后，栈中还剩余[1,2,3], 而面积还未计算过。此时还需要额外判断

      * 可以给heights末尾添加一个0.那么for循环结束以后，栈中一定为空。
  
   */

  const stack: number[] = [-1]
  heights.push(0)
  let max = 0
  for (let i = 0; i < heights.length; i++) {
    while (stack.length > 1 && heights[stack[stack.length - 1]] >= heights[i]) {
      const h = stack.pop()
      max = Math.max(max, heights[h] * (i - stack[stack.length - 1] - 1))
    }

    stack.push(i)
  }
  return max
}

/**
 * 剑指 Offer II 040. 矩阵中最大的矩形
 * @param matrix
 */
function maximalRectangle(matrix: string[]): number {
  /**
   与 剑指 Offer II 039. 直方图最大矩形面积
   息息相关

   先使用动态规划对matrix进行预处理。然后对每一行都调用largestRectangleArea。求出最大值。
   */
  if (matrix.length === 0 || matrix[0].length === 0) return 0
  const dp = [...Array(matrix.length + 1)].map(i => [...Array(matrix[0].length)].fill(0))
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      const c = +matrix[i].charAt(j)
      if (c === 1) {
        dp[i + 1][j] = 1 + dp[i][j]
      }
    }
  }

  let max = 0
  for (let i = 1; i < dp.length; i++) {
    max = Math.max(max, largestRectangleArea(dp[i]))
  }
  return max
}

/**
 * 剑指 Offer II 099. 最小路径之和
 * @param grid
 */
function minPathSum(grid: number[][]): number {
  /**
  动态规划。
  
  dp[i][j] 表示从[0][0]到[i][j]格子的最小路径和。
  dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1])

  边界条件。
  1. dp[0][0] = grid[0][0]
  2. dp[i][0] += dp[i - 1][0], 第一列
  3. dp[0][j] += dp[0][j - 1], 第一行
  */
  const m = grid.length,
    n = grid[0].length
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 && j === 0) continue
      if (i === 0) {
        grid[i][j] += grid[i][j - 1]
      } else if (j === 0) {
        grid[i][j] += grid[i - 1][j]
      } else if (i !== 0 && j !== 0) {
        grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1])
      }
    }
  }
  return grid[m - 1][n - 1]
}

/**
 * 剑指 Offer II 100. 三角形中最小路径之和
 * @param triangle
 */
function minimumTotal(triangle: number[][]): number {
  /**
 dp[i][j] 表示自顶点到triangle[i][j]的最小路径和
  
 每一点只能由上一层的j或j-1过来。
 dp[i][j] = triangle[i][j] + Math.min(dp[i - 1][j], dp[i - 1][j - 1])

 边界值
 1. dp[0][0] = triangle[0][0]
 2. dp[i][0] += dp[i - 1][0], 第一列只能由上一层的第一列过来。
 3. dp[i][triangle[i].length - 1] += dp[i - 1][triangle[i - 1].length - 1]. 每一行最右边的点，只能由上一层最右边的点过来。
 */
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      if (j === 0) {
        triangle[i][0] += triangle[i - 1][0]
      } else if (j === triangle[i].length - 1) {
        triangle[i][j] += triangle[i - 1][triangle[i - 1].length - 1]
      } else {
        triangle[i][j] += Math.min(triangle[i - 1][j], triangle[i - 1][j - 1])
      }
    }
  }
  for (let i = 0, last = triangle.length - 1; i < triangle[last].length; i++) {
    min = Math.min(min, triangle[last][i])
  }
  return min
}

/**
 * 剑指 Offer II 101. 分割等和子集
 (动态规划-01背包)
 * @param nums
 */
function canPartition(nums: number[]): boolean {
  /**
动态规划

1. 首先如果nums.length < 2，肯定不能分割，直接返回false
2. 遍历nums, 求和sum, 以及maxValue.
   如果sum 是奇数，肯定不能分割，直接返回false
   如果maxValue > sum / 2, 肯定不能分割，直接返回false

dp[i][j] 表示能否从nums[0:i]中取出若干元素，使得它们的和为j
对于nums[i][j] 有选或不选两种状态。所以dp[i][j]取决于nums[i][j]选或不选。
1. 假如nums[i][j]需要选择，
   dp[i - 1][j - nums[i][j]] = true表示能从nums[0:i - 1]中选出若干元素，使其和为j - nums[i][j], 
   则再加上nums[i][j], 则dp[i][j] = true
2. 假如nums[i][j]不需要选择
   dp[i - 1][j] = true, 表示能从nums[0:i - 1]中选入若干元素，使其和为j，此时就不用nums[i][j]了
 

边界值
1. dp[i][0] = true， 从i个元素中，选择0个元素其和为0
2. dp[0][j] = false, 不能从0个元素中，选择其和为j, (j > 0)
 */
  if (nums.length < 2) return false
  let sum = 0,
    maxValue = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    maxValue = Math.max(maxValue, nums[i])
  }
  if (sum & 1) return false

  const target = sum / 2
  if (target < maxValue) return false

  // dp[i][j], 0 <= i <= nums.length, 表示选择nums里的元素数量
  // 0 <= j <= target, 表示元素和为0 -> target
  const dp = [...Array(nums.length + 1)].map(i => [...Array(target + 1)].fill(false))

  for (let i = 0; i < dp.length; i++) {
    dp[i][0] = true
  }
  for (let i = 1; i < dp.length; i++) {
    for (let j = 1; j < dp[0].length; j++) {
      // 不选择nums[i - 1]
      dp[i][j] = dp[i - 1][j]
      if (j - nums[i - 1] >= 0) {
        dp[i][j] ||= dp[i - 1][j - nums[i - 1]]
      }
    }
  }
  return dp[nums.length][target]
}

/**
 * 剑指 Offer II 101. 分割等和子集
 (动态规划-01背包)
 * @param nums
 */
function canPartition2(nums: number[]): boolean {
  /**
   空间优化
   */
  if (nums.length < 2) return false
  let sum = 0,
    maxValue = Number.MIN_SAFE_INTEGER
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
    maxValue = Math.max(maxValue, nums[i])
  }
  if (sum & 1) return false

  const target = sum / 2
  if (target < maxValue) return false

  // dp[i][j], 0 <= i <= nums.length, 表示选择nums里的元素数量
  // 0 <= j <= target, 表示元素和为0 -> target
  const dp = [...Array(target + 1)].fill(false)
  dp[0] = true

  for (let i = 1; i <= nums.length; i++) {
    for (let j = dp.length - 1; j >= 0; j--) {
      if (j - nums[i - 1] >= 0) {
        dp[j] ||= dp[j - nums[i - 1]]
      }
    }
  }
  return dp[target]
}

/**
 * 剑指 Offer II 102. 加减的目标值
 (回溯--超时)
 * @param nums
 * @param target
 */
function findTargetSumWays(nums: number[], target: number): number {
  /**
 回溯
 */
  let res = 0,
    sum = 0,
    len = nums.length
  const dfs = (pos: number) => {
    if (pos === len) {
      if (sum === target) res++
      return
    }
    sum += nums[pos]
    dfs(pos + 1)
    sum -= 2 * nums[pos]
    dfs(pos + 1)
    sum += nums[pos]
  }
  dfs(0)
  return res
}

/**
 * 剑指 Offer II 102. 加减的目标值
 (动态规划)
 * @param nums
 * @param target
 */
function findTargetSumWays2(nums: number[], target: number): number {
  /**
  假设某个符合条件的集合中，前面添加-的元素之和为neg, 添加+的元素和为sum - neg.
  则右target = (sum - neg) - neg = sum - 2 * neg = target
      neg = (sum - target) / 2
  
  由于nums全部为非负正整数，则neg也是非负正整数。则sum - target 需要为非负偶数。

  相当于在nums中寻找若干个元素，使得元素和为neg。转化为01背包问题。

  1. dp[i][j] 表示在nums[0:i]中选取若干元素，使其和为j的选择方式数量。
  2. 对于nums[i], 有两种状态，选或不选。
     选: 则dp[i][j] = dp[i - 1][j - nums[i]]
     不选: 则dp[i][j] = dp[i - 1][j]
  3. 所以dp[i][j] = dp[i - 1][j - nums[i]] + dp[i - 1][j]

  边界条件
  1. dp[0][0] = 1, 在0个元素中选择若干元素，使其和为0的选择方式只有一种。
  2. dp[0][j] = 0,(j > 0), 在0个元素中选择若干元素，使其和为j > 0的选择方式为0。
 */
  let sum = 0
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i]
  }

  if (sum - target < 0 || (sum - target) & 1) return 0
  const neg = (sum - target) / 2

  const dp = [...Array(nums.length + 1)].map(i => [...Array(neg + 1)].fill(0))
  dp[0][0] = 1

  for (let i = 1; i < dp.length; i++) {
    for (let j = 0; j < dp[i].length; j++) {
      dp[i][j] = dp[i - 1][j]
      if (j - nums[i - 1] >= 0) {
        dp[i][j] += dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[nums.length][neg]
}

/**
 * 剑指 Offer II 103. 最少的硬币数目
 （回溯）
 * @param coins
 * @param amount
 */
function coinChange(coins: number[], amount: number): number {
  /**
   回溯

   在coins中选择若干硬币使得和为amount的最小数量s = 在coins中选择若干硬币使得和为(amount - coins[i])的最小数量 + 1, 取最小值。
   也就是s(amount) = Math.min(s(amount - coins[i])) + 1

   使用conut[i]表示凑齐和为i的最小硬币数量。

   边界
   1. s(0) = 0, 选择0个硬币，和为0
   2. s(负数) = -1, 表示无法选择一个数量，使得和为负数 
   */
  if (amount < 1) return 0

  const dfs = (rem: number, count: number[]): number => {
    if (rem === 0) return 0
    if (rem < 0) return -1

    // 和为rem - 1的情况已经计算过了，就不用再算了。
    if (count[rem - 1] !== 0) return count[rem - 1]
    let min = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < coins.length; i++) {
      const res = dfs(rem - coins[i], count)
      if (res >= 0) min = Math.min(min, res)
    }
    count[rem - 1] = min === Number.MAX_SAFE_INTEGER ? -1 : min + 1
    return count[rem - 1]
  }
  return dfs(amount, [...Array(amount)].fill(0))
}

// coinChange([1, 2, 5], 11)

/**
 * 剑指 Offer II 104. 排列的数目
 （动态规划）
 * @param nums
 * @param target
 */
function combinationSum4(nums: number[], target: number): number {
  /**
   dp[i] 表示从nums中选择若干元素，和为i的数量。 

   遍历nums, 对于nums[i]来说，dp[i - nums[i]]表示从nums中选择若干元素，使得和为i - nums[i]的排列数。
   如果在该排列后面添加一个nums[i], 则该排列的和刚好为i。对所有的dp[i - nums[i]]进行累加，就是dp[i]
   所以dp[i] += dp[i - nums[i]]

   边界：
   1. dp[0] = 1, 和为0的排列数只有一种。
   */
  const dp = [...Array(target + 1)].fill(0)
  dp[0] = 1

  for (let i = 1; i <= target; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i - nums[j] >= 0) {
        dp[i] += dp[i - nums[j]]
      }
    }
  }

  return dp[target]
}
