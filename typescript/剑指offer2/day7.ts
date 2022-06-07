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
