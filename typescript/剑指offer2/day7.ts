import { TreeNode } from '../utils/数据结构/struct'

/*
 * 剑指 Offer II 048. 序列化与反序列化二叉树
 */
function serialize(root: TreeNode | null): string {
  /**
   1. 前序遍历root，到遇到root为null时，给字符res拼接#
   */
  let data = ''
  const pre = (root: TreeNode) => {
    if (root === null) {
      data += '#,'
    } else {
      data += `${root.val},`
      pre(root.left)
      pre(root.right)
    }
  }
  pre(root)
  return data
}

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
  /**
   1. 将data以,分割成数组。其中的#表示空节点。
   2. 然后递归生成树。
   3. 当数组arr[0] == "#"，返回null
   4. 否则，用arr.shift()构造新节点，然后递归生成node的左子树和右子树。
   5. 返回newNode
   */
  const arr = data.split(',')

  const dfs = () => {
    if (arr.length === 0 || arr[0] === '#') {
      arr.shift()
      return null
    } else {
      const node = new TreeNode(+arr.shift())
      node.left = dfs()
      node.right = dfs()
      return node
    }
  }
  return dfs()
}

/**
 * 剑指 Offer II 111. 计算除法
 (多源最短路径-Floyd算法)
 * @param equations 
 * @param values 
 * @param queries 
 */
function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
  /**
  1. 将equations和values转换为graph
     其中equations[i] = a, values = b, 则graph[a[0]][a[1]] = b  graph[a[1]][a[0]] = 1 / b

  2. 求queries中两个点的路径。（a->b->c）多段路径之比
   */
  let n = 0
  const map = new Map<string, number>()
  // 1. 使用map将所有变量字符变为数字
  for (let i = 0; i < equations.length; i++) {
    if (!map.has(equations[i][0])) {
      map.set(equations[i][0], n++)
    }
    if (!map.has(equations[i][1])) {
      map.set(equations[i][1], n++)
    }
  }

  const graph = [...Array(n)].map(i => [...Array(n)].fill(-1))
  // 2. 建图。
  for (let i = 0; i < equations.length; i++) {
    const a = map.get(equations[i][0]),
      b = map.get(equations[i][1])
    graph[a][b] = values[i]
    graph[b][a] = 1 / values[i]
  }

  // 3. 使用Floyd算法进行预处理
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (graph[j][k] > 0) continue
        if (graph[j][i] > 0 && graph[i][k] > 0) {
          /**
           若a / b = 2, b / c = 3
           则a / c = 2 * 3

           问题: graph[j][k]最多会更新i次，每次都覆盖上一次的数字，不会错误吗？
           答: 由于abcdefg之间全部都是乘除关系，
               假设a / b = 2, b / c = 3.
                 而a / f = 7, f / c 一定是等于6 / 7的，否则各个变量之间的关系就会产生矛盾。
               所以a / c 不仅可以通过中间变量b，2 * 3得到
                 也可以通过中间变量f， 7 * 6 / 7 得到。

            优化: 100时间击败
               如果graph[j][k] > 0, 说明已经有结果了。就不用继续算了。
           */
          graph[j][k] = graph[j][i] * graph[i][k]
        }
      }
    }
  }

  // 4. 求解路径集合
  const res: number[] = []
  for (let i = 0; i < queries.length; i++) {
    let result = -1
    if (map.has(queries[i][0]) && map.has(queries[i][1])) {
      const a = map.get(queries[i][0]),
        b = map.get(queries[i][1])
      if (graph[a][b] > 0) {
        result = graph[a][b]
      }
    }
    res[i] = result
  }
  return res
}

// calcEquation(
//   [
//     ['a', 'c'],
//     ['b', 'e'],
//     ['c', 'd'],
//     ['e', 'd']
//   ],
//   [2.0, 3.0, 0.5, 5.0],
//   [['a', 'b']]
// )

/**
 * 剑指 Offer II 049. 从根节点到叶节点的路径数字之和
  (DFS)
 * @param root
 */
function sumNumbers(root: TreeNode | null): number {
  const stack: TreeNode[] = []
  let res = 0
  const pre = (root: TreeNode | null) => {
    if (root) {
      stack.push(root)
      pre(root.left)
      pre(root.right)
      if (root.left === null && root.right === null) {
        res += +stack.map(v => v.val).join('')
      }
      stack.pop()
    }
  }
  pre(root)
  return res
}

/**
 * 剑指 Offer II 049. 从根节点到叶节点的路径数字之和
 (BFS)
 * @param root
 */
function sumNumbers2(root: TreeNode | null): number {
  const queue: TreeNode[] = [root]
  const queueNum: number[] = [root.val]
  let res = 0
  while (queue.length) {
    const node = queue.pop()
    const nodeNum = queueNum.pop()
    if (node.left === null && node.right === null) {
      res += nodeNum
    }
    if (node.left) {
      queue.push(node.left)
      queueNum.push(nodeNum * 10 + node.left.val)
    }
    if (node.right) {
      queue.push(node.right)
      queueNum.push(nodeNum * 10 + node.right.val)
    }
  }
  return res
}

/**
 * 剑指 Offer II 112. 最长递增路径
 ( 记忆化深度优先搜索)
 * @param matrix 
 * @returns 
 */
function longestIncreasingPath(matrix: number[][]): number {
  /**
   记忆化深度优先搜索

   对每一个点进行深度优先搜索，时间复杂度太高。

   在对某一条路径进行搜索时，实质上已经对该路径上所有的点搜索过了，
   只需要在搜索时，对每个搜索的点进行赋值，并且搜索前判断该点是否搜索过了。

   */
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return 0

  const d = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1]
    ],
    m = matrix.length,
    n = matrix[0].length

  let max = 0
  const memo = [...Array(m)].map(i => [...Array(n)].fill(0))

  const dfs = (i: number, j: number): number => {
    if (memo[i][j]) {
      return memo[i][j]
    }
    ++memo[i][j]

    for (let k = 0; k < 4; k++) {
      const nexti = i + d[k][0],
        nextj = j + d[k][1]
      if (nexti >= 0 && nexti < m && nextj >= 0 && nextj < n && matrix[nexti][nextj] > matrix[i][j]) {
        memo[i][j] = Math.max(memo[i][j], dfs(nexti, nextj) + 1)
      }
    }
    return memo[i][j]
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      max = Math.max(max, dfs(i, j))
    }
  }

  return max
}
// longestIncreasingPath([
//   [7, 8, 9],
//   [9, 7, 6],
//   [7, 2, 3]
// ])

/**
 * 剑指 Offer II 051. 节点之和最大的路径
 * @param root
 * @returns
 */
function maxPathSum(root: TreeNode | null): number {
  /**
  1. 使用后序遍历，计算root的左右两个子树的最大路径之和。
    使用max记录最大路径和。Max(max, root.val + left + right)
    
  2. 如果root为空，返回0.
  否则返回root.val + Math.max(left, right) 表示以root为起点的最大路径。

  3. 如果子树的路径和小于0，则忽略该值。
    
 */
  let max = Number.MIN_SAFE_INTEGER

  const order = (root: TreeNode | null): number => {
    if (root) {
      const left = Math.max(0, order(root.left)),
        right = Math.max(0, order(root.right))
      max = Math.max(max, left + right + root.val)
      return root.val + Math.max(left, right)
    } else {
      return 0
    }
  }
  order(root)
  return max
}

/**
 * 剑指 Offer II 113. 课程顺序
 (深度优先遍历)
 * @param numCourses
 * @param prerequisites
 */
function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  /**
   p = prerequisites[i]
   则p = [1, 2] 表示必须先学2后学1.
   构建一个有n个节点的图，则表示2 -> 1有一条有向边。

   最终结果是在图中寻找一个拓扑排序。使用深度优先遍历，搜索图中每一个点。
   1. 如果该节点尚未搜索过，则将该节点的状态置为（搜索中），然后搜索该节点的所有邻边。
   2. 如果该节点的状态是（搜索中），表示产生了环。此时应立即退出，并返回[]
   3. 如果该节点的状态是（搜索完成），表示该节点与当前搜索序列没有关系，直接忽略。
      并且该节点肯定已经加入了结果集。
   当该节点搜索完成，将该节点加入结果集，并且将其状态置为（搜索完成）
   */

  // visited[i] = {0 , 1, 2}表示三种状态，未搜索，搜索中，搜索完成
  const visited = Array(numCourses).fill(0),
    result = [], // 拓扑排序的结果
    edge = new Map<number, number[]>() // 存放有向边的集合
  let valid = false // 判断是否存在环

  for (let i = 0; i < numCourses; i++) {
    edge.set(i, [])
  }

  for (let i = 0; i < prerequisites.length; i++) {
    edge.get(prerequisites[i][1]).push(prerequisites[i][0])
  }

  /**
   * 深度优先搜索
   * @param u
   * @returns
   */
  const dfs = (u: number) => {
    visited[u] = 1
    // 搜索u的所有邻边
    for (let i = 0, e = edge.get(u); i < e.length; i++) {
      if (visited[e[i]] === 0) {
        dfs(e[i])
        if (valid) return
      } else if (visited[e[i]] === 1) {
        valid = true
        return
      }
    }
    // 当u的所有临界点搜索完成（添加到result中后）
    // 标记u为搜索完成，然后把u添加到result中
    visited[u] = 2
    result.unshift(u)
  }

  for (let i = 0; i < numCourses; i++) {
    if (visited[i] === 0) {
      dfs(i)
    }
  }

  if (valid) return []

  return result
}

/**
 * 剑指 Offer II 113. 课程顺序
 (广度优先遍历)
 * @param numCourses
 * @param prerequisites
 */
function findOrder2(numCourses: number, prerequisites: number[][]): number[] {
  /**
   p = prerequisites[i]
   则p = [1, 2] 表示必须先学2后学1.
   构建一个有n个节点的图，则表示2 -> 1有一条有向边。

   当构建好图之后，图中的节点u，如果u的入度为0，表名u没有前置课程了，可以添加到结果中了。

   遍历所有的节点，将入度为0的节点全部添加到队列中。然后遍历队列。
   每次取出一个节点u，先将u放入result中。
   然后遍历u的所有出度节点v。将v的入度全部减一，如果减一以后等于0，就把v也添加到队列中。

   当队列中入度为0的节点遍历完成后，如果result里的节点数量<numCoureses，说明存在环，直接返回[]
   */

  // visited[i] = {0 , 1, 2}表示三种状态，未搜索，搜索中，搜索完成
  const indegree = Array(numCourses).fill(0),
    result = [], // 拓扑排序的结果
    edge = new Map<number, number[]>() // 存放有向边的集合

  for (let i = 0; i < numCourses; i++) {
    edge.set(i, [])
  }

  for (let i = 0; i < prerequisites.length; i++) {
    edge.get(prerequisites[i][1]).push(prerequisites[i][0])
    indegree[prerequisites[i][0]]++
  }

  const queue = []
  for (let i = 0; i < indegree.length; i++) {
    if (indegree[i] === 0) queue.push(i)
  }

  while (queue.length) {
    const u = queue.pop()
    result.push(u)
    for (let i = 0, adj = edge.get(u); i < adj.length; i++) {
      indegree[adj[i]]--
      if (indegree[adj[i]] === 0) {
        queue.push(adj[i])
      }
    }
  }

  if (result.length < numCourses) return []

  return result
}
// findOrder(2, [
//   [0, 1],
//   [1, 0]
// ])

/**
 * 剑指 Offer II 052. 展平二叉搜索树
 (中序遍历)
 * @param root
 */
function increasingBST(root: TreeNode | null): TreeNode | null {
  let head = null, // 指向新链表的头节点
    p = head // 指向新链表的尾结点
  const order = (node: TreeNode | null) => {
    if (node) {
      order(node.left)
      // 如果head已经存在。就把node拼接到p后面，并且令node.left = null
      if (head) {
        p.right = node
        p = p.right
        p.left = null
      } else {
        //  最左下角的最小元素，令head指向它
        head = node
        p = node
      }
      order(node.right)
    }
  }
  order(root)
  return head
}

/**
 * 剑指 Offer II 114. 外星文字典
  (深度优先搜索)
 * @param words
 */
function alienOrder(words: string[]): string {
  /**
   1. 构图
      遍历words，对于前后两个字符串p,a, 
      p,a中首个不相同的字符p1和a1，则代表p1->a1有向边。

      边界：如果a是p的前缀，且p比a长，则代表这个排序不合法，应该返回""
    2. 深度优先搜索
       每个节点（字符）,有三个状态，未搜索，已搜索，搜索中。
       1. 每次搜索到某个节点u，先把该节点u状态标记为搜索中，
       2. 然后开始搜索它的相邻节点。
       3. 如果搜索过程中，碰到了搜索中的节点，则代表遇到了环，直接返回。
       4. 如果碰到了搜索完成的节点，则忽略
       5. 回溯过程把节点u拼接到result前面。
   */
  const edge = new Map<string, string[]>(), //记录有向边
    length = words.length
  let valid = false, // 判断是否有环
    result = '' // 结果字典序

  // 1. 设置节点
  for (let i = 0; i < length; i++) {
    for (let j = 0, word = words[i]; j < word.length; j++) {
      const c = word.charAt(j)
      if (!edge.has(c)) {
        edge.set(c, [])
      }
    }
  }

  /**
   * 添加有向边
   * @param p
   * @param a
   */
  const addEdge = (p: string, a: string) => {
    const len1 = p.length,
      len2 = a.length,
      minLen = Math.min(len1, len2)
    let index = 0
    while (index < minLen) {
      const p1 = p.charAt(index),
        a1 = a.charAt(index)
      if (p1 != a1) {
        edge.get(p1).push(a1)
        break
      }
      index++
    }
    // p比a长，并且a是p的前缀，说明这个排序不合格。
    if (index === minLen && len1 > len2) {
      valid = true
    }
  }

  // 2. 添加有向边
  for (let i = 0; i < length - 1; i++) {
    addEdge(words[i], words[i + 1])
    if (valid) return ''
  }

  /**
   * 深度优先搜索
   * @param u
   * @returns
   */
  const dfs = (u: string) => {
    // 每次搜索前，判断valid，如果valid = true，就没必要搜索了
    if (valid) return
    visited.set(u, 1)
    for (let i = 0, adj = edge.get(u); i < adj.length; i++) {
      if (!visited.has(adj[i])) {
        dfs(adj[i])
        // u的临界点正在被搜索，说明存在u -> v -> u的环
      } else if (visited.get(adj[i]) === 1) {
        valid = true
        return
      }
    }
    visited.set(u, 2)
    result = u + result
  }

  const visited = new Map<string, number>() // 记录节点访问状态
  for (let i = 0, chars = [...edge.keys()]; i < chars.length; i++) {
    const u = chars[i]
    if (!visited.has(u)) {
      dfs(u)
    }
  }
  if (valid) return ''
  return result
}
