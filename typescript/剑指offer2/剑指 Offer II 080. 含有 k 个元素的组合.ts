/**
剑指 Offer II 080. 含有 k 个元素的组合
给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

 

示例 1:

输入: n = 4, k = 2
输出:
[
  [2,4],
  [3,4],
  [2,3],
  [1,2],
  [1,3],
  [1,4],
]
示例 2:

输入: n = 1, k = 1
输出: [[1]]
 

提示:

1 <= n <= 20
1 <= k <= n
 
 */

/**
 * 方法一： 回溯
 * @param n
 * @param k
 * @returns
 */
function combine(n: number, k: number): number[][] {
  const res = []
  const dfs = (pos: number, trace: number[]) => {
    if (pos > n) return
    for (let i = pos; i <= n; i++) {
      trace.push(i)
      if (trace.length === k) res.push([...trace])
      dfs(i + 1, trace)
      trace.pop()
    }
  }
  dfs(1, [])
  return res
}

/**
 * 剪枝优化
 * @param n 
 * @param k 
 * @returns 
 */
function combine2(n: number, k: number): number[][] {
  const res = []
  const dfs = (pos: number, k: number, trace: number[]) => {
    // 如果从pos到n所有的数字个数，都小于k。说明该组合不可能凑齐k个数。直接返回
    if (n - pos + 1 < k) return

    // 如果k===0，说明当前组合不用再添加任何数字了。复制到res中，并返回
    if (k === 0) {
      res.push([...trace])
      return
    }

    // 1. 将pos加入当前组合，并且进入下一层递归。k减去1
    trace.push(pos)
    dfs(pos + 1, k - 1, trace)

    // 2. 将pos从当前组合去掉，进入下一层递归。k不变
    trace.pop()
    dfs(pos + 1, k, trace)
  }

  // 从1开始
  dfs(1, k, [])

  return res
}

combine2(4, 2)
