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
