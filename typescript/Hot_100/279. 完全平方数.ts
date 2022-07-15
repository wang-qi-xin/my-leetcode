/**
279. 完全平方数
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

 

示例 1：

输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
示例 2：

输入：n = 13
输出：2
解释：13 = 4 + 9
 
提示：

1 <= n <= 104
 */
function numSquares(n: number): number {
  /**
   方法一：动态规划

   1. 对于一个数n, 它的完全平方数最大是n。
   2. 枚举所有小于n的完全平方数k
   3. 则n = k * k + m, 然后看一下m的完全平方数是多少,再加上1，就是n的完全平方数。（dp[n] = Math.min(dp[n], dp[m] + 1)） 
   4. 其中m = n - k * k
   5. 

   */
  const dp = [0]
  for (let i = 1; i <= n; i++) {
    dp[i] = i
    for (let j = 1; j * j <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - j * j] + 1)
    }
  }
  return dp[n]
}


function numSquares2(n: number): number {
  /**
   方法一：动态规划

   类似于给定硬币面值，问购买价格为n的物品，最少需要多少硬币。
   
   */
  const coins = [0, 1]
  // 1. 定制硬币面值1 4 9 16 。。。一直到n
  for (let i = 2; i * i <= n; i++) {
    coins[i] = i * i
  }

  const dp = [0]
  for (let i = 1; i <= n; i++) {
    // 2. 价格为i的物品，最多需要i个面值为1的硬币
    dp[i] = i
    // 3. 判断价格为i的物品，是否能由一个面值为coins[j]的硬币，加上dp[i - coins[j]]个硬币获取。
    for (let j = 1; coins[j] <= i; j++) {
      dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
    }
  }

  return dp[n]
}


function numSquares3(n: number): number {
  /**
   方法三：数学

   四平方和定理: 1. 任意一个数，最多由4个平方和组成。
                2. 如果n != 4 ^ k * (8m + 7), 则n最多由3个平方和组成。
   
   所以使用排除法


   */
  const isPerfect = (n: number): boolean => {
    return n === Math.pow(Math.floor(Math.sqrt(n)), 2)
  }

  const isChecked4 = (n: number): boolean => {
    while (n % 4 === 0) {
      n /= 4
    }
    return n % 8 === 7
  }
  // 1. n 是完全平方数
  if (isPerfect(n)) return 1
  // 2. 如果n != 4 ^ k * (8m + 7), 则n最多由3个平方和组成。
  if (isChecked4(n)) return 4

  // 3. n = a ^ 2 + b ^ 2.
  for (let i = 1; i * i < n; i++) {
    // 计算n - i * i是否是完全平方数
    if (isPerfect(n - i * i)) return 2
  }
  // 4. 排除了1 2 4
  return 3
}
