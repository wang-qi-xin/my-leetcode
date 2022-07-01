/**
463. 岛屿的周长
给定一个 row x col 的二维网格地图 grid ，其中：grid[i][j] = 1 表示陆地， grid[i][j] = 0 表示水域。

网格中的格子 水平和垂直 方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。

岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100 。计算这个岛屿的周长。


示例 1：

输入：grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
输出：16
解释：它的周长是上面图片中的 16 个黄色的边
示例 2：

输入：grid = [[1]]
输出：4
示例 3：

输入：grid = [[1,0]]
输出：4
 

提示：

row == grid.length
col == grid[i].length
1 <= row, col <= 100
grid[i][j] 为 0 或 1
 */

function islandPerimeter(grid: number[][]): number {
  /**
   方法一：深度优先搜索
   */
  const m = grid.length,
    n = grid[0].length,
    d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]
  const dfs = (i: number, j: number): number => {
    // 给同一块岛屿的每个格子打上标记，该标记在areas中对应的数字就是岛屿的面积
    grid[i][j] = 2
    let len = 0
    for (let k = 0; k < 4; k++) {
      const nexti = i + d[k][0],
        nextj = j + d[k][1]
      if (nexti >= 0 && nexti < m && nextj >= 0 && nextj < n) {
        if (grid[nexti][nextj] === 1) {
          len += dfs(nexti, nextj)
        } else if (grid[nexti][nextj] === 0) {
          len += 1
        }
      } else {
        len += 1
      }
    }
    return len
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        return dfs(i, j)
      }
    }
  }
  console.log(grid)

  return 0
}

function islandPerimeter2(grid: number[][]): number {
  /**
   方法一：迭代
  
   缺点：只能用于本题，一个岛屿的情况。

   深度优先搜索，可以用于计算多个岛屿的周长。
   */
  const m = grid.length,
    n = grid[0].length,
    d = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1]
    ]
  let res = 0
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        // 1. 如果grid[i][j]是陆地，为结果增加的周长，可能为4
        res += 4
        for (let k = 0; k < 4; k++) {
          const nexti = i + d[k][0],
            nextj = j + d[k][1]
          if (nexti >= 0 && nexti < m && nextj >= 0 && nextj < n) {
            if (grid[nexti][nextj] === 1) {
              // 2. 如果grid[i][j]四周存在陆地，则与该陆地相邻的边，不为岛屿提供周长1.所以从res中减去
              res -= 1
            }
          }
        }
      }
    }
  }

  return res
}

console.log(islandPerimeter([[0, 1]]))
