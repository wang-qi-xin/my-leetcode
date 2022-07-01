/**
827. 最大人工岛
给你一个大小为 n x n 二进制矩阵 grid 。最多 只能将一格 0 变成 1 。

返回执行此操作后，grid 中最大的岛屿面积是多少？

岛屿 由一组上、下、左、右四个方向相连的 1 形成。

 

示例 1:

输入: grid = [[1, 0], [0, 1]]
输出: 3
解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。
示例 2:

输入: grid = [[1, 1], [1, 0]]
输出: 4
解释: 将一格0变成1，岛屿的面积扩大为 4。
示例 3:

输入: grid = [[1, 1], [1, 1]]
输出: 4
解释: 没有0可以让我们变成1，面积依然为 4。
 

提示：

n == grid.length
n == grid[i].length
1 <= n <= 500
grid[i][j] 为 0 或 1
 */

function largestIsland(grid: number[][]): number {
  /**
   方法一：深度优先搜索
   */
  let areas = [0, 0],
    count = 2 // 岛屿的下标从2开始，因为0代表水，1代表陆地，不能从1开始。
  const m = grid.length,
    d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]
  const dfs = (i: number, j: number): number => {
    // 给同一块岛屿的每个格子打上标记，该标记在areas中对应的数字就是岛屿的面积
    grid[i][j] = count
    let area = 1
    for (let k = 0; k < 4; k++) {
      const nexti = i + d[k][0],
        nextj = j + d[k][1]
      if (nexti >= 0 && nexti < m && nextj >= 0 && nextj < m && grid[nexti][nextj] === 1) {
        area += dfs(nexti, nextj)
      }
    }
    return area
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        areas[count] = dfs(i, j)
        count++
      }
    }
  }
  // 初始化为areas[2]，第一块岛屿的面积。如果一块儿岛屿也没有，那就初始化为1
  let res = areas[2] ? areas[2] : 1
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      // 1. 如果grid[i][j]可以添为岛屿
      if (grid[i][j] === 0) {
        let area = 1
        // 用来给grid[i][j]四周相邻的岛屿坐标去重。
        const set = new Set<number>()
        for (let k = 0; k < 4; k++) {
          const nexti = i + d[k][0],
            nextj = j + d[k][1]
          if (nexti >= 0 && nexti < m && nextj >= 0 && nextj < m && grid[nexti][nextj] !== 0) {
            set.add(grid[nexti][nextj])
          }
        }
        // 2. 将grid[i][j]四周相邻的不同的岛屿面积相加。
        const indexs = [...set.values()]
        for (let k = 0; k < indexs.length; k++) {
          area += areas[indexs[k]]
        }
        res = Math.max(res, area)
      }
    }
  }

  return res
}
largestIsland([
  [1, 0],
  [0, 1]
])
