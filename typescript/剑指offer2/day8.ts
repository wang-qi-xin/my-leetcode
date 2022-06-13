import { TreeNode } from '../utils/数据结构/struct'

/**
 * 剑指 Offer II 053. 二叉搜索树中的中序后继
 (中序遍历)
 * @param root 
 * @param p 
 * @returns 
 */
function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
  let next = false,
    nextNode = null
  const order = (node: TreeNode) => {
    if (node) {
      order(node.left)
      if (nextNode) return
      if (next) {
        nextNode = node
        return
      }
      if (node === p) {
        next = true
      }
      order(node.right)
    }
  }
  order(root)
  return nextNode
}

/**
 * 剑指 Offer II 053. 二叉搜索树中的中序后继
 (中序遍历)
 * @param root 
 * @param p 
 * @returns 
 */
function inorderSuccessor2(root: TreeNode | null, p: TreeNode | null): TreeNode | null {
  /**
   1. 假如p.right 不为空，需要返回p的右子树中最小的数
      令p = p.right。然后循环找到p的最左下的元素。
   2. 如果p.right 为空。说明需要返回的是p的父节点。
       
       此时利用二叉搜索树的性质，从root开始找，保存父节点的指针。
       当root=p时，返回parent
   */
  if (p.right) {
    p = p.right
    while (p.left) {
      p = p.left
    }
    return p
  }

  let parent = null
  while (root) {
    if (root.val > p.val) {
      // 当前节点比p大，说明p在root的左子树上，此时root就有可能是p的下一个节点。
      // 所以使用parent保存root
      parent = root
      root = root.left
    } else {
      // 当前节点比p小，说明p在root的右子树上，此时p的下一个节点一定在root的右子树上，所以不用保存parent
      root = root.right
    }
  }
  return parent
}

/**
 * 剑指 Offer II 115. 重建序列
 （深度优先搜索）
 * @param org
 * @param seqs
 */
function sequenceReconstruction(org: number[], seqs: number[][]): boolean {
  /**
   从seqs中构建最短超序列res，然后判断res是否与org相同。

   建图
      如果seqs[i]中j -> k, 则表示j 到 k有一条有向边。最终通过广搜找出一条唯一的序列res。
      1. 
   */

  const set = new Set<number>(),
    n = org.length
  for (let i = 0; i < seqs.length; i++) {
    for (let j = 0, seq = seqs[i]; j < seq.length; j++) {
      set.add(seq[j])
    }
  }
  // 原始序列只有一个数字，但是seqs中不含有1
  if (n === 1 && !set.has(1)) return false
  // seqs中的数字个数，不等于原始序列的数字个数。
  if (set.size !== n) return false

  //  1. 建图
  const edges = [...Array(n + 1)].map(_ => new Set<number>()),
    indegree = [...Array(n + 1)].fill(0)
  for (let i = 0; i < seqs.length; i++) {
    for (let j = 1, seq = seqs[i]; j < seq.length; j++) {
      const from = seq[j - 1],
        to = seq[j]
      // 防止重复添加
      if (!edges[from].has(to)) {
        edges[from].add(to)
        indegree[to]++
      }
    }
  }

  // 2. 深度优先搜索
  const queue = []
  for (let i = 1; i < indegree.length; i++) {
    if (indegree[i] === 0) {
      queue.push(i)
    }
  }
  const res = []
  while (queue.length) {
    // 如果入度为0的节点个数超过1个。说明不是唯一的超序列
    if (queue.length > 1) return false
    const s = queue.pop()
    res.push(s)
    for (let i = 0, edge = [...edges[s].values()]; i < edge.length; i++) {
      indegree[edge[i]] -= 1
      if (indegree[edge[i]] === 0) {
        queue.push(edge[i])
      }
    }
  }

  if (res.length !== n) return false

  // 3. 判断是否等于org
  for (let i = 0; i < n; i++) {
    if (org[i] !== res[i]) return false
  }

  return true
}

// sequenceReconstruction([1], [])

/**
 * 剑指 Offer II 054. 所有大于等于节点的值之和
 （递归）
 * @param root
 */
function convertBST(root: TreeNode | null): TreeNode | null {
  /**
   使用右-根-左的顺序遍历子树。并且记录所有节点的总和。
   */
  let res = 0
  const postOrder = (node: TreeNode | null) => {
    if (node) {
      postOrder(node.right)
      res += node.val
      node.val = res
      postOrder(node.left)
    }
  }
  postOrder(root)
  return root
}
