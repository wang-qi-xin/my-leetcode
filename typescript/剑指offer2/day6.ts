/**
 * 剑指 Offer II 106. 二分图
 (染色法。 深度优先遍历。)
 * @param graph
 */
function isBipartite(graph: number[][]): boolean {
  /**
  染色法。 深度优先遍历。

  1. 任选某个点，将其染为红色，然后将其相邻的点next[i]全部然后绿色。
  2. 对next[i]染色后， 就继续遍历next[i]的相邻节点。
  3. 在染色过程中，遇到以下情况说明该图不是二分图。
     a: next[i]已经染色过了，且和当前节点颜色一样。
  4. 由于图肯能不是连通图，所以要对每一个节点都要遍历一次
  */
  const RED = 1,
    GREEN = 2,
    UN_COLORED = 0
  // 节点的颜色
  const nodes: number[] = [...Array(graph.length)].fill(UN_COLORED)
  let valid = true
  const dfs = (node: number, color: number) => {
    nodes[node] = color
    const nextColor = color === RED ? GREEN : RED
    // 遍历node的相邻节点。
    for (let i = 0; i < graph[node].length; i++) {
      const nextNode = graph[node][i]
      // 1. 相邻节点尚未染色
      if (nodes[nextNode] === UN_COLORED) {
        dfs(nextNode, nextColor)
        if (!valid) return
        //  2. 相邻节点已经染色，且和当前节点颜色一样。直接返回
      } else if (nodes[nextNode] === color) {
        valid = false
        return
      }
    }
  }
  for (let i = 0; i < graph.length && valid; i++) {
    if (nodes[i] === UN_COLORED) dfs(i, RED)
  }
  return valid
}
