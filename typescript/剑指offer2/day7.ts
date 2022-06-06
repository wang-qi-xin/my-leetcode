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

