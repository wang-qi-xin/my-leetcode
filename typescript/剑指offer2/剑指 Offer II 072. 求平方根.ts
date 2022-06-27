/**
剑指 Offer II 072. 求平方根
给定一个非负整数 x ，计算并返回 x 的平方根，即实现 int sqrt(int x) 函数。

正数的平方根有两个，只输出其中的正数平方根。

如果平方根不是整数，输出只保留整数的部分，小数部分将被舍去。

 

示例 1:

输入: x = 4
输出: 2
示例 2:

输入: x = 8
输出: 2
解释: 8 的平方根是 2.82842...，由于小数部分将被舍去，所以返回 2
 

提示:

0 <= x <= 231 - 1
 */

function mySqrt(x: number): number {
  if (x === 0) return 0

  /**
   设函数y = a ^ 2 - x。
   当函数y取0时，x = a ^ 2.

   也就是求函数y的零点。使用切线法开始求解。
   */

  let C = x,
    x0 = x
  while (true) {
    const x1 = 0.5 * (x0 + C / x0)
    if (Math.abs(x0 - x1) < 1e-22) break
    x0 = x1
  }
  return Math.floor(x0)
}
console.log(mySqrt(8))
