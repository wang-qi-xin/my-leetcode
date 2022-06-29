/**
剑指 Offer II 098. 路径的数目
一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

 

示例 1：



输入：m = 3, n = 7
输出：28
示例 2：

输入：m = 3, n = 2
输出：3
解释：
从左上角开始，总共有 3 条路径可以到达右下角。
1. 向右 -> 向下 -> 向下
2. 向下 -> 向下 -> 向右
3. 向下 -> 向右 -> 向下
示例 3：

输入：m = 7, n = 3
输出：28
示例 4：

输入：m = 3, n = 3
输出：6
 

提示：

1 <= m, n <= 100
题目数据保证答案小于等于 2 * 109
 
 */

function uniquePaths(m: number, n: number): number {
  // 由于m，n的顺序不影响结果，所以令n取较小值，可以节省空间
  if (m < n) {
    const t = m
    m = n
    n = t
  }
  const dp = [...Array(n + 1)].fill(1)
  dp[0] = 0
  for (let i = 1; i < m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[j] += dp[j - 1]
    }
  }
  return dp[n]
}

/**
 * 组合数学
 * @param m
 * @param n
 * @returns
 */
function uniquePaths2(m: number, n: number): number {
  // 令m取较小值，可以减少循环数
  if (m > n) {
    const t = m
    m = n
    n = t
  }
  /**
   从左上角到右下角共需走a = m + n - 2步。其中必须向下走b = m - 1步。
   也就等同于求 m + n - 2次移动中，向下走m - 1次的情况数。
   求组合C(b.a)
   */
  let res = 1
  for (let x = n, y = 1; y < m; y++, x++) {
    res *= x / y
  }
  return res
}
console.log(uniquePaths2(3, 3))
