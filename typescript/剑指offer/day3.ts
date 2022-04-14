/**
 * 867. 转置矩阵
 * @param matrix
 */
function transpose(matrix: number[][]): number[][] {
  const arr = [...Array(matrix[0].length)].map(_ => [])

  matrix.forEach(r => {
    r.forEach((c, columnIndex) => {
      arr[columnIndex].push(c)
    })
  })
  return arr
}

/**
 * 剑指 Offer 16. 数值的整数次方
 * @param x
 * @param n
 */
function myPow(x: number, n: number): number {
  /**
   快速幂：二进制
   x^n 将n进行二进制拆解。
   x^n = (x^2)^(n / 2) = (x ^ 4) ^ (n / 4) = ...
   当n为奇数时，n/2向下取整，会少乘一次x,所以额外x *= x;
   一直循环，直到n二进制拆解到0。
   */
  let N = BigInt(n) // 该题的n可能会超出限制，所以转为bigint
  if (x === 0) return 0
  if (N < 0) {
    x = 1 / x
    N = -N
  }
  let res = 1.0
  while (N) {
    // n & 1判断二进制最后一位是1还是0.也就是奇偶性
    if (N & 1n) {
      res *= x
    }
    x *= x
    // 右移一位，也就是/2向下取整。
    N >>= 1n
  }
  return res
}

/**
 * 方法一：dfs不考虑大数
 * 剑指 Offer 17. 打印从1到最大的n位数
 * @param n
 */
function printNumbers(n: number): number[] {
  const num = [...Array(n)].fill('0')
  const res: number[] = []

  const dfs = (x: number) => {
    if (x === n) {
      const s = +num.join('')
      if (s === 0) return
      res.push(s)
    } else {
      for (let i = 0; i < 10; i++) {
        num[x] = `${i}`
        dfs(x + 1)
      }
    }
  }

  dfs(0)
  return res
}

/**
 * 方法二：dfs考虑大数
 * 剑指 Offer 17. 打印从1到最大的n位数
 * @param n
 */
function printNumbers2(n: number): string[] {
  const num = [...Array(n)].fill('0')
  const res: string[] = []
  let start = n - 1,
    nine = 0

  const dfs = (x: number) => {
    if (x === n) {
      const s = num.slice(start).join('')
      if (n - start === nine) start -= 1 // 判断当前num组成的数字，每一位都是9
      if (s === '0') return
      res.push(s)
    } else {
      for (let i = 0; i < 10; i++) {
        if (i === 9) nine += 1 // 当该位填充9时，nine++
        num[x] = `${i}`
        dfs(x + 1)
      }
      nine -= 1 // 该位0 - 9 一轮递归完成，nine数量减一
    }
  }

  dfs(0)
  return res
}
/**
 * 动态规划
 * 剑指 Offer 19. 正则表达式匹配(困难)
 * @param s
 * @param p
 * @returns
 */
function isMatch(s: string, p: string): boolean {
  /*
  dp[i][j]: 表示s的前i个字符， 和p的前j个字符的匹配情况。
  1. 如果p[j]是字母 。
      那么dp[i][j] = (s[i] == [j]) && dp[i - 1][j - 1]
  2. 如果p[j]是.
      那么dp[i][j] = dp[i - 1][j - 1]
  3. 如果p[j]是*, 表示p[j - 1] 出现0或多次。
      dp[i][j] = true: 
      仅当s[i] == p[j - 2]（即dp[i][j - 2]）表示p[j - 1] 出现0次，
      或dp[i - 1][j] & (s[i] == p[j - 1] | p[j - 1] == ".") (表示p[j - 1] 匹配1次)
   */

  /**
   * 验证s[i - 1] 和p[i - 1]是否匹配
   * 因为传入的i,j比实际上多1
   * @param i
   * @param j
   * @returns
   */
  const match = (i: number, j: number): boolean => {
    if (i === 0) return false
    if (p[j - 1] === '.') return true
    if (s[i - 1] === p[j - 1]) return true
    return false
  }
  const m = s.length,
    n = p.length
  const dp = [...Array(m + 1)].map(_ => Array(n + 1).fill(false))
  dp[0][0] = true // 空字符串，表示匹配成功
  for (let i = 0; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] !== '*') { // 如果p[j](实际上是p[j - 1]) 不是 * 。dp[i][j]取决于s[i], p[j]是否匹配，以及dp[i - 1][j - 1]
        if (match(i, j)) {
          dp[i][j] = dp[i - 1][j - 1]
        }
      } else {// 如果p[j] 是 * 。
        dp[i][j] = dp[i][j - 2] // 1. 如果去掉*p[j]和前面的字母p[j - 1]（相当于字母p[j - 1]出现0次），看看s[i]和p[j - 2]是否匹配（即dp[i][j - 2]）
        if (match(i, j - 1)) { // 2. 如果p[j]（*号）前面的字母p[j - 1]和s[i]相等，那么p[j]（*号）可以表示p[j - 1]出现了1次。 dp[i][j] = dp[i - 1]dp[j]
          // 以上两个结果取||运算，表示0次或1次匹配成功都算。
          dp[i][j] = dp[i - 1][j] || dp[i][j]
        }
      }
    }
  }

  return dp[m][n]
}
