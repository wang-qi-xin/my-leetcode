import { quickSort } from '../utils/排序/quickSort'
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

/**
 * 剑指 Offer II 054. 所有大于等于节点的值之和
 （morris遍历）
 * @param root
 */
function convertBST2(root: TreeNode | null): TreeNode | null {
  /**
   反向中序遍历morris算法

   利用二叉树中的空指针，指向该节点的前驱。

   然后一边遍历，一边累加和。


   */

  const getSuc = (node: TreeNode | null) => {
    let suc = node.right
    while (suc.left && suc.left !== node) {
      // 如果suc的left已经指向了node，说明suc的前驱就是node，直接返回suc
      suc = suc.left
    }
    return suc
  }
  let sum = 0
  let node = root
  while (node) {
    if (node.right) {
      // 找到node的右子树的最小元素，令其left指向node(left的前驱节点)
      const suc = getSuc(node)
      if (suc.left) {
        // 如果suc的left存在，说明suc已经遍历过了。 此时应该遍历node了。
        sum += node.val
        node.val = sum
        suc.left = null // node遍历完成，将之前设置的suc的前驱重置为null
        node = node.left
      } else {
        // suc就是node的右子树的最小元素，也就是node的后驱节点
        suc.left = node
        node = node.right
      }
    } else {
      // 如果node的right为null，则从该节点开始累加
      sum += node.val
      node.val = sum
      node = node.left // 如果node的left为空，说明已经遍历到了最小元素。因为非最小元素的left已经指向其前驱节点了。
    }
  }
  return root
}

/**
 * 剑指 Offer II 055. 二叉搜索树迭代器
 */
class BSTIterator {
  stack: TreeNode[]
  /**
     使用栈保存节点的节点的后驱。
      
     */
  constructor(root: TreeNode | null) {
    this.stack = [root]
    while (root.left) {
      this.stack.push(root.left)
      root = root.left
    }
  }

  next(): number {
    const nextNode = this.stack.pop()
    if (nextNode.right) {
      this.getSuc(nextNode)
    }
    return nextNode.val
  }

  hasNext(): boolean {
    if (this.stack.length) return true
    return false
  }
  getSuc(node: TreeNode | null) {
    let suc = node.right
    this.stack.push(suc)
    while (suc.left) {
      // 如果suc的left已经指向了node，说明suc的前驱就是node，直接返回suc
      suc = suc.left
      this.stack.push(suc)
    }
  }
}

/**
 * 剑指 Offer II 117. 相似的字符串
 （并查集）
 * @param strs
 */
function numSimilarGroups(strs: string[]): number {
  /**
  将strs看做图，如果strs[i]和strs[j]相似，则将i,j看做一个集合。

  注意：
   如果a和b相似，b和c相似。但是a != c。仍有a,b,c同属一个组。
   */
  let group = 0
  /**
   * 判断s和t是否是相似词
   * @param s
   * @param t
   */
  const simStr = (s: string, t: string): boolean => {
    // 由于s和t已经时异位词，只要有两个以上位置的字符不一样，则s和t不是相似词
    let n = 0
    for (let i = 0; i < s.length; i++) {
      if (s.charAt(i) !== t.charAt(i)) {
        n++
        if (n > 2) return false
      }
    }
    return true
  }
  const n = strs.length
  /**
   * f[i]表示i的父节点，初始化为i
   */
  const f = [...Array(n)].map((_, i) => i)

  /**
   * 查找i的父节点
   * @param i
   * @returns
   */
  const find = (i: number) => {
    return f[i] === i ? i : (f[i] = find(f[i]))
  }

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const fi = find(i),
        fj = find(j)
      if (fi === fj) {
        continue
      }

      // 如果fi != fj，则i和j不是同一个集合，此时判断i和j是否是相似词。如果是的话，就将其放入同一个集合f[fi] = fj
      if (simStr(strs[i], strs[j])) {
        f[fi] = fj
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (f[i] === i) {
      group += 1
    }
  }

  return group
}

// numSimilarGroups(['tars', 'rats', 'arts'])

/**
 * 剑指 Offer II 118. 多余的边
 (并查集)
 * @param edges
 */
function findRedundantConnection(edges: number[][]): number[] {
  const n = edges.length,
    f = [...Array(n + 1)].map((_, i) => i)
  /**
   * 查找i的父节点
   * @param i
   * @returns
   */
  const find = (i: number) => {
    return f[i] === i ? i : (f[i] = find(f[i]))
  }

  /**
   1. 如果f1不等f2， 则表示a和b不是同一个集合，a和b尚未联通，

      令f[f1] = f2， 表示添加edges[i]这条边后，将a和b联通
   2. 如果f1等于f2，则表示a已经和b联通了，此时添加edges[i]这条边，将会构成环。
      直接返回edges[i]
   */
  for (let i = 0; i < n; i++) {
    const f1 = find(edges[i][0]),
      f2 = find(edges[i][1])

    if (f1 === f2) {
      return edges[i]
    }

    f[f1] = f2
  }
  return []
}

/**
 * 剑指 Offer II 056. 二叉搜索树中两个节点之和
 * @param root
 * @param k
 */
function findTarget(root: TreeNode | null, k: number): boolean {
  const s = new Set<number>()
  const dfs = (node: TreeNode | null): boolean => {
    if (node) {
      if (s.has(k - node.val)) return true
      s.add(node.val)
      return dfs(node.left) || dfs(node.right)
    }
    return false
  }
  return dfs(root)
}

/**
 * 剑指 Offer II 060. 出现频率最高的 k 个数字
 * @param nums
 * @param k
 * @returns
 */
function topKFrequent(nums: number[], k: number): number[] {
  const map = new Map<number, number>()
  // 1. 统计每个数字出现的次数
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i])) {
      map.set(nums[i], map.get(nums[i]) + 1)
    } else {
      map.set(nums[i], 1)
    }
  }

  // 2. 将数字出现的次数构造成二维数组，按次数降序排序，截取前k个，转为一维数组
  return quickSort([...map.entries()], (a, b) => b[1] - a[1])
    .slice(0, k)
    .map(v => v[0])
}
