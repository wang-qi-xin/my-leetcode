/**
剑指 Offer II 116. 省份数量
有 n 个城市，其中一些彼此相连，另一些没有相连。如果城市 a 与城市 b 直接相连，且城市 b 与城市 c 直接相连，那么城市 a 与城市 c 间接相连。

省份 是一组直接或间接相连的城市，组内不含其他没有相连的城市。

给你一个 n x n 的矩阵 isConnected ，其中 isConnected[i][j] = 1 表示第 i 个城市和第 j 个城市直接相连，而 isConnected[i][j] = 0 表示二者不直接相连。

返回矩阵中 省份 的数量。

 

示例 1：


输入：isConnected = [[1,1,0],[1,1,0],[0,0,1]]
输出：2
示例 2：


输入：isConnected = [[1,0,0],[0,1,0],[0,0,1]]
输出：3
 

提示：

1 <= n <= 200
n == isConnected.length
n == isConnected[i].length
isConnected[i][j] 为 1 或 0
isConnected[i][i] == 1
isConnected[i][j] == isConnected[j][i]
 */

function findCircleNum(isConnected: number[][]): number {
  /**
   求图里的联通分量

   深度遍历图中每一个顶点。如果该顶点尚未访问过，就表示该顶点是新的省份。
   */
  let res = 0
  const n = isConnected.length,
    visited = [...Array(n)].fill(false)

  const dfs = (p: number) => {
    visited[p] = true
    for (let i = 0; i < n; i++) {
      // 如果节点i尚未访问过，并且节点p到i直接相连。就dfs(i)
      if (!visited[i] && isConnected[p][i]) dfs(i)
    }
  }
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i)
      res++
    }
  }
  console.log(res)

  return res
}

function findCircleNum2(isConnected: number[][]): number {
  /**
   并查集

   初始时，每个点都是一个单独的联通分量。
   遍历isConnected，如果a和b是相连，则将a与b放入同一个联通分量
   */
  let res = 0
  const parent = [],
    n = isConnected.length
  // 1. 初始化parent，parent[i] = i， 表示每个节点的父亲都是自己
  for (let i = 0; i < n; i++) {
    parent[i] = i
  }
  const findParent = (p: number) => {
    if (parent[p] !== p) parent[p] = findParent(parent[p])
    return parent[p]
  }
  const union = (i: number, j: number) => {
    parent[findParent(i)] = findParent(j)
  }

  // 2. 如果节点i和j联通，就将i和j放入同一个集合
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isConnected[i][j]) {
        union(i, j)
      }
    }
  }

  // 3. 计算parent中的联通分量数
  for (let i = 0; i < n; i++) {
    if (parent[i] === i) res++
  }
  return res
}
const isConnected = [
  [1, 1, 0],
  [1, 1, 0],
  [0, 0, 1]
]
findCircleNum2(isConnected)
