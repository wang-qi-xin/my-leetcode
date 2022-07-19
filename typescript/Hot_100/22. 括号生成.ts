/**
 22. 括号生成
数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

 

示例 1：

输入：n = 3
输出：["((()))","(()())","(())()","()(())","()()()"]
示例 2：

输入：n = 1
输出：["()"]
 

提示：

1 <= n <= 8
 */
function generateParenthesis(n: number): string[] {
  const trace = [],
    res = [],
    len = 2 * n

  /**
   *
   * @param right 模拟括号栈，判断是否应该插入右括号
   * @param left 左括号的数量
   * @returns
   */
  const dfs = (right: number, left: number) => {
    if (trace.length === len) {
      res.push(trace.join(''))
      return
    }

    // 当前位置要么左括号，要么右括号
    if (left < n) {
      // 1. 还可以继续插入左括号
      trace.push('(')
      dfs(right + 1, left + 1)
      trace.pop()
    }
    if (right > 0) {
      // 2. 可以插入右括号，下一层递归right - 1
      trace.push(')')
      dfs(right - 1, left)
      trace.pop()
    }
  }
  dfs(0, 0)
  return res
}

console.log(generateParenthesis(3))
