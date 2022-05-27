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

/**
 * 剑指 Offer II 107. 矩阵中的距离
 (广度优先遍历。 超级源点0到其它节点的最短距离)
 * @param mat
 */
function updateMatrix(mat: number[][]): number[][] {
  /**
   广度优先遍历。超级源点0到其它节点的最短距离。

   1. 将所有的0看做一个整体，计算距离超级源点0距离为1的节点，将其打上访问标记。然后假如队列中。
   2. 从队列中拿出一个点，如果改点已经访问过，就直接跳过。
   */
  const queue: number[][] = []
  const d = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ]
  const visited = [...Array(mat.length)].map(i => [...Array(mat[0].length)].fill(false))

  for (let i = 0; i < mat.length; i++) {
    for (let j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j])
        visited[i][j] = true
      }
    }
  }

  while (queue.length) {
    const point = queue.shift()
    const i = point[0],
      j = point[1]
    for (let k = 0; k < 4; k++) {
      const next_i = i + d[k][0],
        next_j = j + d[k][1]
      if (next_i >= 0 && next_i < mat.length && next_j >= 0 && next_j < mat[0].length && !visited[next_i][next_j]) {
        mat[next_i][next_j] = mat[i][j] + 1
        queue.push([next_i, next_j])
        visited[next_i][next_j] = true
      }
    }
  }
  return mat
}

/**
 * 剑指 Offer II 107. 矩阵中的距离
 (动态规划)
 * @param mat
 */
function updateMatrix2(mat: number[][]): number[][] {
  /**
  动态规划

  求point[i][j]距离上下左右四个方向直线上和0的最短距离。再取最小值。

  1. 先从左上角向右下角来一次动态规划。
      dp[i][j]表示point[i][j]距离最近的0的距离。

      如果mat[i][j] == 0, dp[i][j] = 0
      否则dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1])
  2. 从右下角向左上角来一次动态规划。这一次还要考虑dp[i][j]本身的大小。

  边界:
  1. 当位于边界时，只需要判断某一个方向的最小值。
  2. 当位于左上角顶点时，如果mat[i][j] == 0, 那么dp[i][j] == 0, 
      否则直接跳过。

  优化：
  1. 将dp的大小额外增加2，则不用判断边界条件。最后返回删减后的dp
  */
  const dp = [...Array(mat.length + 2)].map(i => [...Array(mat[0].length + 2)].fill(Number.MAX_SAFE_INTEGER))
  for (let i = 1; i < dp.length - 1; i++) {
    for (let j = 1; j < dp[0].length - 1; j++) {
      if (mat[i - 1][j - 1] !== 0) {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1
      } else {
        dp[i][j] = 0
      }
    }
  }

  for (let i = dp.length - 2; i > 0; i--) {
    for (let j = dp[0].length - 2; j > 0; j--) {
      if (mat[i - 1][j - 1] === 0) {
        dp[i][j] = 0
      } else {
        // dp[i][j]可能对于左上方向，有距离更近的0.
        dp[i][j] = Math.min(dp[i][j], Math.min(dp[i + 1][j], dp[i][j + 1]) + 1)
      }
    }
  }

  return dp.slice(1, dp.length - 1).map(row => row.slice(1, row.length - 1))
}

/**
 * 剑指 Offer II 044. 二叉树每层的最大值
 * @param root
 */
function largestValues(root: TreeNode | null): number[] {
  /**
 层次遍历root
 1. 每一层之间用MAX_VALUE节点来分割。
 2. 用max来记录每一层的最大值
 */
  if (!root) return []
  const queue: TreeNode[] = [root, new TreeNode(Number.MAX_SAFE_INTEGER)]
  const res: number[] = []
  while (queue.length > 1) {
    let max = Number.MIN_SAFE_INTEGER
    while (queue[0].val !== Number.MAX_SAFE_INTEGER) {
      const node = queue.shift()
      max = Math.max(max, node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(max)
    queue.shift()
    queue.push(new TreeNode(Number.MAX_SAFE_INTEGER))
  }
  return res
}

/**
 * 剑指 Offer II 045. 二叉树最底层最左边的值
 * @param root
 */
function findBottomLeftValue(root: TreeNode | null): number {
  /**
   层次遍历

   1. 将root入队。
   2. 当queue不为空时循环。
   3. 记录queue的长度len，为该层的节点数，然后取queue的前len个元素
   4. 使用left记录第一个元素的值，并且将所有的元素的子节点加入队列。
   */

  let left = 0
  const queue: TreeNode[] = [root]
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      if (i === 0) left = node.val
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return left
}

/**
 * 剑指 Offer II 046. 二叉树的右侧视图
 * @param root
 */
function rightSideView(root: TreeNode | null): number[] {
  /**
  层次遍历

   也就是将每一层的最右侧节点按顺序添加到res中
   */
  if (!root) return []
  const queue: TreeNode[] = [root],
    res: number[] = []
  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      if (i === len - 1) res.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }
  return res
}

/**
 * 剑指 Offer II 108. 单词演变
  (困难)
 (广度优先遍历)
 * @param beginWord
 * @param endWord
 * @param wordList
 */
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  /**
   广度优先搜索
   */
  const wordId = new Map<string, number>(),
    edge: number[][] = []

  let nodeNum = 0
  /**
   *添加边

   1.首先把word添加到map中，并拿到对应的单词id
   2. 遍历单词，将每一位都变为*,构造为新单词newWord
   3. 将newWord添加到map中，并拿到对应的单词id2
   4. 在edge中添加双向边。
   * @param word 
   */
  const addEdge = (word: string) => {
    addWord(word)
    const id1 = wordId.get(word)
    for (let i = 0; i < word.length; i++) {
      const newWord = `${word.slice(0, i)}*${word.slice(i + 1, word.length)}`
      console.log(word, newWord, i)

      addWord(newWord)
      const id2 = wordId.get(newWord)
      edge[id1].push(id2)
      edge[id2].push(id1)
    }
  }

  /**
    * 添加单词

      key = word, value = wordId
      并初始化对应的边为[]
    * @param word 
    */
  const addWord = (word: string) => {
    if (!wordId.has(word)) {
      wordId.set(word, nodeNum++)
      edge.push([])
    }
  }
  for (let i = 0; i < wordList.length; i++) {
    addEdge(wordList[i])
  }
  addEdge(beginWord)
  // 如果单词列表里没有endWord，则一定无法转换
  if (!wordId.has(endWord)) return 0

  /**
   将beginWord加入队列，进行搜索，如果搜索到了endWord,则返回搜索 层数
   */
  const d = [...Array(nodeNum)].fill(Number.MAX_SAFE_INTEGER)
  const beginId = wordId.get(beginWord),
    endId = wordId.get(endWord)
  const queue: number[] = [beginId]
  d[beginId] = 0
  while (queue.length) {
    const nodeId = queue.shift()
    if (nodeId === endId) {
      return d[nodeId] / 2 + 1
    }
    for (let i = 0; i < edge[nodeId].length; i++) {
      if (d[edge[nodeId][i]] === Number.MAX_SAFE_INTEGER) {
        d[edge[nodeId][i]] = d[nodeId] + 1
        queue.push(edge[nodeId][i])
      }
    }
  }
  return 0
}

/**
 * 剑指 Offer II 108. 单词演变
  (困难)
 (双向广度优先遍历)
 * @param beginWord
 * @param endWord
 * @param wordList
 */
function ladderLength2(beginWord: string, endWord: string, wordList: string[]): number {
  /**
   广度优先搜索
   */
  const wordId = new Map<string, number>(),
    edge: number[][] = []

  let nodeNum = 0
  /**
   *添加边

   1.首先把word添加到map中，并拿到对应的单词id
   2. 遍历单词，将每一位都变为*,构造为新单词newWord
   3. 将newWord添加到map中，并拿到对应的单词id2
   4. 在edge中添加双向边。
   * @param word 
   */
  const addEdge = (word: string) => {
    addWord(word)
    const id1 = wordId.get(word)
    for (let i = 0; i < word.length; i++) {
      const newWord = `${word.slice(0, i)}*${word.slice(i + 1, word.length)}`
      addWord(newWord)
      const id2 = wordId.get(newWord)
      edge[id1].push(id2)
      edge[id2].push(id1)
    }
  }

  /**
    * 添加单词

      key = word, value = wordId
      并初始化对应的边为[]
    * @param word 
    */
  const addWord = (word: string) => {
    if (!wordId.has(word)) {
      wordId.set(word, nodeNum++)
      edge.push([])
    }
  }
  for (let i = 0; i < wordList.length; i++) {
    addEdge(wordList[i])
  }
  addEdge(beginWord)
  // 如果单词列表里没有endWord，则一定无法转换
  if (!wordId.has(endWord)) return 0

  /**
   将beginWord加入队列，进行搜索，如果搜索到了endWord,则返回搜索 层数
   */
  const beginId = wordId.get(beginWord),
    endId = wordId.get(endWord)
  const dBegin = [...Array(nodeNum)].fill(Number.MAX_SAFE_INTEGER)
  dBegin[beginId] = 0
  const queueBegin: number[] = [beginId]

  const dEnd = [...Array(nodeNum)].fill(Number.MAX_SAFE_INTEGER)
  dEnd[endId] = 0
  const queueEnd: number[] = [endId]

  while (queueBegin.length && queueEnd.length) {
    const queueBeginLen = queueBegin.length
    for (let i = 0; i < queueBeginLen; i++) {
      const beginNodeId = queueBegin.shift()
      // 如果该点在dEnd中已经访问过了，说明双向搜索已经有了交点
      if (dEnd[beginNodeId] !== Number.MAX_SAFE_INTEGER) {
        return (dBegin[beginNodeId] + dEnd[beginNodeId]) / 2 + 1
      }
      for (let j = 0; j < edge[beginNodeId].length; j++) {
        if (dBegin[edge[beginNodeId][j]] === Number.MAX_SAFE_INTEGER) {
          dBegin[edge[beginNodeId][j]] = dBegin[beginNodeId] + 1
          queueBegin.push(edge[beginNodeId][j])
        }
      }
    }
    const queueEndLen = queueEnd.length
    for (let i = 0; i < queueEndLen; i++) {
      const endNodeId = queueEnd.shift()
      // 如果该点在dBegin中已经访问过了，说明双向搜索已经有了交点
      if (dBegin[endNodeId] !== Number.MAX_SAFE_INTEGER) {
        return (dBegin[endNodeId] + dEnd[endNodeId]) / 2 + 1
      }
      for (let j = 0; j < edge[endNodeId].length; j++) {
        if (dEnd[edge[endNodeId][j]] === Number.MAX_SAFE_INTEGER) {
          dEnd[edge[endNodeId][j]] = dEnd[endNodeId] + 1
          queueEnd.push(edge[endNodeId][j])
        }
      }
    }
  }
  return 0
}

// console.log(ladderLength2('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog']))
