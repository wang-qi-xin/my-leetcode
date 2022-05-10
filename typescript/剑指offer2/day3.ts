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

// console.log(minSubArrayLen(15, [1, 2, 3, 4, 5]))
// console.log(minSubArrayLen(11, [1, 1, 1, 1, 1, 1, 1, 1]))
// console.log(minSubArrayLen(213, [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12]))
