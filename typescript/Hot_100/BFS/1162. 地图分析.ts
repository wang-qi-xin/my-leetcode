/**
1162. 地图分析
你现在手里有一份大小为 n x n 的 网格 grid，上面的每个 单元格 都用 0 和 1 标记好了。其中 0 代表海洋，1 代表陆地。

请你找出一个海洋单元格，这个海洋单元格到离它最近的陆地单元格的距离是最大的，并返回该距离。如果网格上只有陆地或者海洋，请返回 -1。

我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：(x0, y0) 和 (x1, y1) 这两个单元格之间的距离是 |x0 - x1| + |y0 - y1| 。

 

示例 1：



输入：grid = [[1,0,1],[0,0,0],[1,0,1]]
输出：2
解释： 
海洋单元格 (1, 1) 和所有陆地单元格之间的距离都达到最大，最大距离为 2。
示例 2：



输入：grid = [[1,0,0],[0,0,0],[0,0,0]]
输出：4
解释： 
海洋单元格 (2, 2) 和所有陆地单元格之间的距离都达到最大，最大距离为 4。
 

提示：

n == grid.length
n == grid[i].length
1 <= n <= 100
grid[i][j] 不是 0 就是 1
 */

function maxDistance(grid: number[][]): number {
  /**
   方法一：广度优先遍历 

   */
  const n = grid.length,
    d = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ]

  const queue = []
  //  1. 先将所有的陆地格子放入队列queue
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1) {
        queue.push([i, j])
      }
    }
  }
  if (queue.length === 0 || queue.length === n * n) return -1
  // 距离初始化为-1.
  let res = -1

  while (queue.length) {
    res++
    const len = queue.length

    // 2. 从陆地开始，每一层的遍历周围的海水格子。每一层res++
    for (let f = 0; f < len; f++) {
      const point = queue.pop()

      for (let k = 0; k < 4; k++) {
        const nexti = point[0] + d[k][0],
          nextj = point[1] + d[k][1]
        if (nexti >= 0 && nexti < n && nextj >= 0 && nextj < n && grid[nexti][nextj] === 0) {
          grid[nexti][nextj] = 2
          // 需要插入到数组首位
          queue.unshift([nexti, nextj])
        }
      }
    }
  }
  return res
}
console.log(
  maxDistance([
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1]
  ])
)
