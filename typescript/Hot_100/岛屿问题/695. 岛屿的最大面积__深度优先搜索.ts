/**
695. 岛屿的最大面积
给你一个大小为 m x n 的二进制矩阵 grid 。

岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

岛屿的面积是岛上值为 1 的单元格的数目。

计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

 

示例 1：


输入：grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0]]
输出：6
解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
示例 2：

输入：grid = [[0,0,0,0,0,0,0,0]]
输出：0
 

提示：

m == grid.length
n == grid[i].length
1 <= m, n <= 50
grid[i][j] 为 0 或 1
 */

function maxAreaOfIsland(grid: number[][]): number {
  /**
   方法一：深度优先搜索
   */
  let res = 0
  const m = grid.length,
    n = grid[0].length,
    d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]
  const dfs = (i: number, j: number): number => {
    grid[i][j] = 0
    let area = 1
    // 把和该点相邻的点全部置为"0"
    for (let k = 0; k < 4; k++) {
      const nexti = i + d[k][0],
        nextj = j + d[k][1]
      if (nexti >= 0 && nexti < m && nextj >= 0 && nextj < n && grid[nexti][nextj] === 1) {
        area += dfs(nexti, nextj)
      }
    }
    return area
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        res = Math.max(dfs(i, j), res)
      }
    }
  }

  return res
}
