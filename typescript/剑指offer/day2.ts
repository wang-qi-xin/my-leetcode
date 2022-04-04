/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-04 22:55:55
 * @LastEditors: one
 * @LastEditTime: 2022-04-04 23:36:43
 */

/** 深度优先遍历
 * 剑指 Offer 12. 矩阵中的路径
 * @param board
 * @param word
 */
function exist(board: string[][], word: string): boolean {
  const dfs = (i: number, j: number, k: number) => {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || word[k] !== board[i][j]) return false
    if (k === word.length - 1) return true
    board[i][j] = '+'
    const res = dfs(i + 1, j, k + 1) || dfs(i - 1, j, k + 1) || dfs(i, j + 1, k + 1) || dfs(i, j - 1, k + 1)
    board[i][j] = word[k]
    return res
  }
  for (let i = 0, len = board.length; i < len; i++) {
    for (let j = 0, len2 = board[i].length; j < len2; j++) {
      if (dfs(i, j, 0)) return true
    }
  }
  return false;
}
