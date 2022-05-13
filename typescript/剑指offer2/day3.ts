/**
 * 剑指 Offer II 086. 分割回文子字符串
 （回溯+动态规划预处理）
 * @param s
 */
function partition(s: string): string[][] {
  /**
   回溯+动态规划预处理

   1. 使用回溯来处理所有可能的分割结果
   2. 判断某个字符串是否为回文子串，如果使用双指针来判断，会进行大量的重复计算。
        所以使用动态规划预处理。dp[i][j] 表示字符串s从i到j的子串是否是回文串。
        如果i >= j 则dp[i][j] = true
        如果i < j, 那个dp[i][j] = dp[i + 1][j - 1] & s[i] === s[j]
   3. 
   */
  const res: string[][] = [],
    track: string[] = [],
    len = s.length
  const dp = [...Array(len)].map(_ => Array(len).fill(true))

  // 1. 使用动态规划预处理。dp[i][j]表示s的i->j子串是否是回文串
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j]
    }
  }

  /**
   * 2. 深度遍历所有的子串
   * @param left 当前子串的起点left
   * @returns
   */
  const dfs = (left: number) => {
    // 如果起点等于left，说明track已经放入了s所有的子串。
    if (left === len) {
      res.push([...track])
      return
    }

    for (let right = left; right < len; right++) {
      // 如果s的i->j子串是回文串
      if (dp[left][right]) {
        // 就把该子串放入track，然后开始处理其它子串
        track.push(s.slice(left, right + 1))
        dfs(right + 1)
        track.pop()
      }
    }
  }

  dfs(0)
  return res
}
// partition('google')

/**
 * 剑指 Offer II 087. 复原 IP
 （回溯+剪枝）
 * @param s
 */
function restoreIpAddresses(s: string): string[] {
  /**
  回溯+剪枝

  1. pos为当前访问的左边界，segId为当前已确定的ip的段数，范围是[0,1,2,3]
  2. dfs(0), 从第一个字符开始判断。
  3. 如果segId === 4, 说明track中已经确定了4段ip, 如果此时刚好访问完字符串s, 也就是pos = s.length， 就将track中的ip假如res中
  4. 然后结束本次循环
  5. 如果字符串已经访问完成，结束本次循环
  6. 如果当前pos位的字符是'0', 那么第segId段ip只能是0, 将track[segId] = 0, 然后开启下一层递归
  7. 否则从该位开始遍历s, 每次从字符串s的j开始选取某一段字符addr，如果> 0且小于255, 那么令第segId段ip为addr, 然后开启下一层递归
  8. 如果某一段addr不符合ip规则，直接break
   */
  if (s.length < 4 || s.length > 12) return []

  const res: string[] = [],
    track: number[] = []

  const dfs = (pos: number, segId: number) => {
    if (segId === 4) {
      if (pos === s.length) {
        res.push(track.join('.'))
      }
      // 如果track已经保存了4段ip地址, 无论字符串有没有访问完，都直接结束
      return
    }
    if (pos === s.length) {
      return
    }
    if (s.charAt(pos) === '0') {
      // 第segId段ip只能是0
      track[segId] = 0
      dfs(pos + 1, segId + 1)
      return
    }
    let addr = 0
    for (let j = pos; j < s.length; j++) {
      // 该for循环最多循环3次
      addr = addr * 10 + +s.charAt(j)
      if (addr > 0 && addr <= 0xff) {
        track[segId] = addr
        dfs(j + 1, segId + 1)
      } else {
        break
      }
    }
  }
  dfs(0, 0)
  return res
}
// restoreIpAddresses('2552552551')

/**
 * 剑指 Offer II 008. 和大于等于 target 的最短子数组
 * @param target
 * @param nums
 */
function minSubArrayLen(target: number, nums: number[]): number {
  /**
  方法一: 前缀和+二分查找

  1. 使用sum数组表示nums的前缀和，sum[i] 表示nums从0->i的和
  2. 然后遍历sum，对于sum[i], 在sum中二分查找到一个左边界bound， 使得sum[bound] - sum[i - 1] >= target   （该题nums全部为正数，所以sum数组为递增）
  3. 使用min记录最短的子数组。min = Math.min(min, bound - i)
   */
  const sum: number[] = []
  sum[0] = 0
  for (let i = 1; i <= nums.length; i++) {
    sum[i] = sum[i - 1] + nums[i - 1]
  }

  let min = Number.MAX_SAFE_INTEGER

  /**
   * 二分查找第一个大于target的数。如果没找到返回-1.

   * @param arr 
   * @param target 
   * @returns 
   */
  const binarySearch = (arr: number[], target: number) => {
    let left = 0,
      right = arr.length
    while (left < right) {
      const mid = left + ((right - left) >> 1)
      // 如果arr[mid] 比target小，那么左边界一定>= mid + 1
      if (arr[mid] < target) {
        left = mid + 1
      } else {
        // 如果令right = Mid - 1。 那么有可能丢失左边界
        right = mid
      }
    }
    return arr[left] >= target ? left : -1
  }

  for (let i = 1; i <= nums.length; i++) {
    // 在sum数组中查找第一个>= target + sum[i - 1]的数。
    let bound = binarySearch(sum, target + sum[i - 1])
    if (bound != -1) {
      min = Math.min(min, bound - i + 1)
    }
  }
  if (min === Number.MAX_SAFE_INTEGER) {
    min = 0
  }
  return min
}

/**
 * 剑指 Offer II 008. 和大于等于 target 的最短子数组
 (滑动窗口)
 * @param target 
 * @param nums 
 */
function minSubArrayLen2(target: number, nums: number[]): number {
  /**
   1. start, end初始为0, len = nums.length 当end < len时循环
   2. 令sum += nums[end]
   3. 如果sum >= target, 就令start++，sum -= nums[start], 同时使用res记录(end - start)的最小值
   4. 循环，直到sum < target, 然后end++
   */
  let sum = 0,
    start = 0,
    end = 0,
    len = nums.length,
    res = Number.MAX_SAFE_INTEGER
  while (end < len) {
    sum += nums[end]
    while (sum >= target) {
      sum -= nums[start]
      console.log(sum, res, end - start + 1)
      res = Math.min(res, end - start + 1)
      start++
    }
    end++
  }
  console.log(res)

  return res === Number.MAX_SAFE_INTEGER ? 0 : res
}
// console.log(minSubArrayLen2(15, [1, 2, 3, 4, 5]))
// console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]))
// console.log(minSubArrayLen(213, [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12]))

/**
 * 剑指 Offer II 088. 爬楼梯的最少成本
 * @param cost
 */
function minCostClimbingStairs(cost: number[]): number {
  /**
   * 动态规划

   dp[i]表示到达第i个台阶所需要的最小体力
   1. 要么从i - 1 到达i, 花费体力dp[i - 1] + cost[i - 1]
   2. 要么从i - 2 到达i, 花费体力dp[i - 2] + cost[i - 2]
   3. dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
   4. 由于可以选择从第0或1阶开始, 所以初始dp[0] = 0, dp[1] = 0
   5. 返回dp[cost.length]
   */
  // const dp = [...Array(cost.length)].map(_ => 0)
  // for(let i = 2; i <= cost.length; i++){
  //   dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2])
  // }
  // return dp[cost.length]

  /**
   其实只需要使用2个变量
   */
  let pre = 0,
    next = 0
  for (let i = 2; i <= cost.length; i++) {
    ;[pre, next] = [next, Math.min(next + cost[i - 1], pre + cost[i - 2])]
  }
  return next
}

// console.log(minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));
// console.log(minCostClimbingStairs([10, 15, 20]));

/**
 * 剑指 Offer II 009. 乘积小于 K 的子数组
 * @param nums
 * @param k
 */
function numSubarrayProductLessThanK(nums: number[], k: number): number {
  /**
   滑动窗口

   j每次+1,都要保证窗口[i,j]之间的乘积小于k， 
   此时由于新增了一个nums[j], 那么子数组小于k的个数为窗口的长度j - i + 1.
   比如([a, b] 增加一个c, 那么组合增加了([[c], [b,c], [a,b,c]])长度为3，刚好是新数组的长度)
   */
  let res = 0,
    len = nums.length,
    pos = 1
  for (let i = 0, j = 0; j < len; j++) {
    pos *= nums[j]
    // 如果nums[j] >= k
    // 那么i需要一直递增到j + 1, 让pos把nums[j]也除掉
    // 此时j - i + 1 = 0
    while (pos >= k && i <= j) {
      pos /= nums[i]
      i++
    }
    //
    res += j - i + 1
  }
  return res
}
// console.log(numSubarrayProductLessThanK([10, 5, 2, 6], 100))
// console.log(numSubarrayProductLessThanK([1,2,3], 0))

/**
 * 剑指 Offer II 089. 房屋偷盗
 * @param nums
 */
function rob(nums: number[]): number {
  /**
   动态规划

   dp[i]表示第i天能够偷到的最多金钱
   由于第i天有两种情况，偷或不偷。
   1. 偷：那么前一天i-1天就不能偷。dp[i] = dp[i - 2] + nums[i]
   2. 不偷，那么昨天就可以偷。dp[i] = dp[i - 1]
   dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
   */
  const len = nums.length
  // 本题nums.length >= 1
  if (len === 1) return nums[0]
  const dp = [...Array(len)].map(_ => 0)
  dp[0] = nums[0]
  // 第二天能偷到的最大值，是前两天的较大值。因为第二天可以选择不偷。
  dp[1] = Math.max(nums[0], nums[1])
  for (let i = 2; i < len; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
  }
  console.log(dp)

  return Math.max(dp[len - 1], dp[len - 2])
}

// console.log(rob([2,1,1,2]));

/**
 * 剑指 Offer II 010. 和为 k 的子数组
 * @param nums
 * @param k
 */
function subarraySum(nums: number[], k: number): number {
  /**

   pre[i]表示[0, i]的和。
   那么[i, j]的和等于pre[j] - pre[i - 1],
      令pre[j] - pre[i - 1] = k, 表示以j为结尾的子数组[i, j]和为k
      而pre[j]已知, k已知。
          即求i的个数，也就是[i, j]和为k的个数。
      pre[i - 1] = pre[j] - k
      由于i <= j。 所以当累加到pre[j]时, pre[i]已经计算过了。使用map保存每一个位置的pre[i]出现的个数。

   */
  let res = 0,
    pre = 0
  const map = new Map<number, number>()
  // 前缀和为0出现的次数默认为1，表示一个数也不选。
  map.set(0, 1)
  for (let i = 0; i < nums.length; i++) {
    pre += nums[i]
    if (map.has(pre - k)) {
      const n = map.get(pre - k)
      res += n
      map.set(pre, n + 1)
    } else {
      map.set(pre, 1)
    }
  }
  return res
}

// console.log(subarraySum([-1,-1,1], 0))

/**
 * 剑指 Offer II 011. 0 和 1 个数相同的子数组
  （前缀和+哈希表）
 * @param nums 
 */
function findMaxLength(nums: number[]): number {
  /**
   如果将0转为-1， 即求和为0的最长子数组

   1. 先求前缀和数组sums[]
   2. 求sums[i] == sums[j] 且j - i 最大
   3. 使用map保存sums[i], value为i (其实就是前缀和为sums[i]的第一次出现的下标)
   4. 当访问nums[j]时，i = map.get(nums[j]), 使用res保存最大的j - i
   5. 如果nums[j]第一次出现，就存入nums[j]
   6. 由于每个sum[i]只和sum[i - 1]关联，所以可以优化为sum元素，然后更新sum就可以了。
   */
  let res = 0,
    sum = 0
  const map = new Map<number, number>()
  map.set(0, -1)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      sum -= 1
    } else {
      sum += 1
    }
    if (map.has(sum)) {
      res = Math.max(res, i - map.get(sum))
    } else {
      map.set(sum, i)
    }
  }
  return res
}

// console.log(findMaxLength([0,1,1,1,0,0,1,1,0])); 6
// console.log(findMaxLength([1,1,0,0,1,0,1,0,1,1,1,0,0,1,1,1,0,0])); 16

/**
 * 剑指 Offer II 012. 左右两边子数组的和相等
 * @param nums
 */
function pivotIndex(nums: number[]): number {
  /**
   使用left， right保存前缀和后缀和。

   1. 求和。
      left[i] = nums[0] + ... + nums[i]
      right[i] = nums[i] + ... + nums[len - 1]
   2. 如果right[1] == 0, 说明0就是中心
   3. 遍历left[1, len - 2]
        如果left[i - 1] == right[i + 1] 就返回i
   4. 如果left[len - 2] == 0， 说明len - 1就是中心
   5. 没有中心，返回-1
   */
  const len = nums.length
  const left = [nums[0]],
    right = []
  for (let i = 1; i < len; i++) {
    left[i] = left[i - 1] + nums[i]
  }
  right[0] = left[len - 1]
  for (let i = 1; i < len; i++) {
    right[i] = right[i - 1] - nums[i - 1]
  }
  if (right[1] === 0) return 0
  for (let i = 1; i < len - 1; i++) {
    if (left[i - 1] === right[i + 1]) return i
  }
  if (left[len - 2] === 0) return len - 1
  return -1
}
// console.log(pivotIndex([-1, -1, 1, 1, 0, 0]))

/**
 * 剑指 Offer II 012. 左右两边子数组的和相等
 （前缀和优化）
 * @param nums
 */
function pivotIndex2(nums: number[]): number {
  /**

   1. 求和total
   2. 遍历nums[i].sum = nums[0, i - 1]之和
   3. 如果sum * 2 + nums[i] === total， 说明i右侧的和也为sum，返回中心点i
   4. 最后返回-1
   */
  const len = nums.length
  let total = 0
  for (let i = 0; i < len; i++) {
    total += nums[i]
  }
  for (let i = 0, sum = 0; i < len; i++) {
    if (sum * 2 + nums[i] === total) return i
    sum += nums[i]
  }
  return -1
}

/**
 * 剑指 Offer II 013. 二维子矩阵的和
 */
class NumMatrix {
  sum: number[][]
  /**
     * 初始化矩阵
     sum[m+1][n+1]
     sum[i][j] 表示[0][0] -> [i - 1][j - 1]子矩阵的和
     * @param matrix 
     */
  constructor(matrix: number[][]) {
    const m = matrix.length,
      n = matrix[0].length
    this.sum = [...Array(m + 1)].map(_ => Array(n + 1).fill(0))
    // sum比matrix多一维，用来处理边界条件
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        this.sum[i + 1][j + 1] = this.sum[i + 1][j] + matrix[i][j] + this.sum[i][j + 1] - this.sum[i][j]
      }
    }
    console.log(this.sum)
  }

  /**
   * @param row1
   * @param col1
   * @param row2
   * @param col2
   */
  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    return this.sum[row2 + 1][col2 + 1] - this.sum[row1][col2 + 1] - this.sum[row2 + 1][col1] + this.sum[row1][col1]
  }
}

/**
 * 剑指 Offer II 014. 字符串中的变位词
 (模拟法)
 * @param s1 
 * @param s2 
 */
function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false
  /**
   1. 使用长度为26的数组a1保存s1每个字母出现的次数
   2. 使用长度为26的数组a2保存s2的长度为s1.length的字串，的每个字母出现的次数
   3. 如果a1 = a2, 返回true
   4. s2的窗口向右滑动一格，重新计算a2,比较a1,a2
   */
  const a1 = [...Array(26)].map(i => 0),
    a2 = [...Array(26)].map(i => 0),
    len1 = s1.length,
    len2 = s2.length
  let i = 0
  for (; i < len1; i++) {
    a1[s1.charCodeAt(i) - 97] += 1
    a2[s2.charCodeAt(i) - 97] += 1
  }
  if (a1.toString() === a2.toString()) return true
  for (; i < len2; i++) {
    a2[s2.charCodeAt(i) - 97] += 1
    a2[s2.charCodeAt(i - len1) - 97] -= 1
    if (a1.toString() === a2.toString()) return true
  }
  return false
}
// checkInclusion("abca", "bbabc")

/**
 * 剑指 Offer II 014. 字符串中的变位词
 (优化模拟法)
 * @param s1 
 * @param s2 
 */
function checkInclusion2(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false
  const a1 = [...Array(26)].map(i => 0),
    len1 = s1.length,
    len2 = s2.length
  // a1[1] = 2， 表示s2的字串比s1，多了两个字符b
  for (let i = 0; i < len1; i++) {
    a1[s1.charCodeAt(i) - 97] -= 1
    a1[s2.charCodeAt(i) - 97] += 1
  }
  // a1[i]表示字母char在s1,和s2的字串中，出现的次数之差。
  // diff表示a1中不等于0的个数
  let diff = 0
  for(let i = 0; i < 26; i++){
    if(a1[i] !== 0) diff++
  }
  if(diff === 0) return true

  for(let i = len1; i < len2; i++){
    const x = s2.charCodeAt(i) - 97, y = s2.charCodeAt(i - len1) - 97
    if(x === y) continue

    // 1. 在增加字符x之前，如果a1[x] == 0, 说明x字符在两个子串出现的次数一样。增加x以后，需要给diff+1
    if(a1[x] === 0) {
      diff++
    }

    // 2. s2的字串增加一个x，则a1[x] += 1
    a1[x]++

    // 3. 增加以后如果a1[x] === 0, 表示字符x在s1和s2字串出现的次数已经一样了。则diff需要-1
    if(a1[x] === 0) {
      diff--
    }

    // 4. y同理。不过y是从s2的字串中去除，所以a1[y]需要-1
    if(a1[y] === 0) {
      diff++
    }
    a1[y]--
    if(a1[y] === 0) {
      diff--
    }
    // 5. 如果s2的字串右移一位（也就是去除最左侧字符y，右侧增加新字符x）,s1和s2的新字串中字符的差diff===0， 就直接返回true
    if(diff === 0) return true
  }
  return false
}
