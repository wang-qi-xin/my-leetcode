import { TreeNode } from '../utils/数据结构/struct'

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

/**
 * 剑指 Offer II 043. 往完全二叉树添加节点
 */
class CBTInserter {
  root: TreeNode
  queue: TreeNode[]
  /**
   1. 使用层次遍历法，
   2. 如果某个节点的右子树为空，或者该节点时叶子结点，就开始把后续的节点全部加入队列queue
   * @param root 
   */
  constructor(root: TreeNode | null) {
    this.root = root
    this.queue = [root]
    // 如果该节点的left为空，那该节点就是叶子结点。
    while (this.queue[0].left !== null && this.queue[0].right !== null) {
      const firstNode = this.queue.shift()
      this.queue.push(firstNode.left)
      this.queue.push(firstNode.right)
    }
    if (this.queue[0].left !== null) {
      this.queue.push(this.queue[0].left)
    }
  }
  /**
     1. 从队首拿出一个节点node,将新节点加入queue，
     2. 如果node节点的左子树为空，就将新节点当做node的左子树。
     3. 如果node节点的右子树不为空，就将新节点当做node的右子树。将node从queue中取出
     4. 并返回node
     * 
     * @param v 
     */
  insert(v: number): number {
    const parentNode = this.queue[0]
    const newNode = new TreeNode(v)
    this.queue.push(newNode)
    if (parentNode.left === null) {
      parentNode.left = newNode
    } else if (parentNode.right === null) {
      parentNode.right = newNode
      this.queue.shift()
    }
    return parentNode.val
  }

  get_root(): TreeNode | null {
    return this.root
  }
}

