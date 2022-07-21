/**
79. 单词搜索
给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。

单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

 

示例 1：


输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true
示例 2：


输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
输出：true
示例 3：


输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
输出：false
 

提示：

m == board.length
n = board[i].length
1 <= m, n <= 6
1 <= word.length <= 15
board 和 word 仅由大小写英文字母组成
 

进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？

 */
function exist(board: string[][], word: string): boolean {
  /**
   * 深度优先搜素
   */
  const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]
  const m = board.length,
    n = board[0].length
  // visited[i] = 0, 表示未搜素， 1=搜索中。
  const visited = [...Array(m)].map(i => [...Array(n)].fill(0))

  let res = false
  const dfs = (i: number, j: number, pos: number) => {
    if (pos === word.length || word.charAt(pos) !== board[i][j]) {
      return
    }
    if (pos === word.length - 1) {
      res = true
      return
    }
    visited[i][j] = 1
    for (let k = 0; k < 4; k++) {
      const nexti = i + d[k][0],
        nextj = j + d[k][1]
      if (nexti >= 0 && nextj >= 0 && nexti < m && nextj < n && visited[nexti][nextj] === 0) {
        dfs(nexti, nextj, pos + 1)
      }
    }
    visited[i][j] = 0
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      dfs(i, j, 0)
    }
  }
  return res
}
