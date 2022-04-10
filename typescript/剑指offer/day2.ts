/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-04 22:55:55
 * @LastEditors: one
 * @LastEditTime: 2022-04-10 15:20:36
 */

import { ListNode, TreeNode } from './struct'

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
  return false
}

/**
 * 广度优先遍历
 * 剑指 Offer 13. 机器人的运动范围
 * @param m
 * @param n
 * @param k
 */
function movingCount(m: number, n: number, k: number): number {
  if (k === 0) return 1
  // 获取数字每一位的和
  const get = n => {
    let res = 0
    while (n != 0) {
      res += n % 10
      n = Math.floor(n / 10)
    }
    return res
  }
  // 访问标记
  const visit = []
  for (let i = 0; i < m; i++) {
    const col = []
    for (let j = 0; j < n; j++) {
      col[j] = false
    }
    visit[i] = col
  }
  // 保存路径。
  const queue = []
  queue.push({ x: 0, y: 0 })
  // 方向。每一个格子都可以向右，向下走一步。
  const dx = [0, 1]
  const dy = [1, 0]
  let res = 1
  while (queue.length !== 0) {
    const { x, y } = queue.pop()
    for (let i = 0; i < 2; i++) {
      const tx = x + dx[i]
      const ty = y + dy[i]
      if (tx < 0 || ty < 0 || tx >= n || ty >= m || visit[tx][ty] || get(tx) + get(ty) > k) {
        continue
      }
      res++
      queue.push({ x: tx, y: ty })
      visit[tx][ty] = true
    }
  }
  return res
}

/**
 * 优化
 * 剑指 Offer 13. 机器人的运动范围
 * @param m
 * @param n
 * @param k
 */
function movingCount2(m: number, n: number, k: number): number {
  if (k === 0) return 1
  const visit: number[][] = [...Array(m)].map(_ => Array(n).fill(0))
  const canWark = (i, j) => {
    if (i < 0 || j < 0 || i === m || j === n || visit[i][j]) return false
    let l = 0
    while (i) {
      l += i % 10
      i = Math.floor(i / 10)
    }
    while (j) {
      l += j % 10
      j = Math.floor(j / 10)
    }
    return l <= k
  }
  const dfs = (i, j) => {
    if (!canWark(i, j)) {
      return 0
    }
    ++visit[i][j]
    return 1 + dfs(i + 1, j) + dfs(i, j + 1)
  }
  return dfs(0, 0)
}

/**
 * 剑指 Offer 25. 合并两个排序的链表
 * @param l1
 * @param l2
 */
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1) return l2
  if (!l2) return l1
  const head = new ListNode()
  head.next = l1
  /**
   * 两个指针指向l1, 一个指针q指向l2,
     将l2 按大小插入l1
   */
  let pre = head
  while (l1 && l2) {
    if (l1.val < l2.val) {
      pre = pre.next
      l1 = l1.next
    } else {
      pre.next = l2
      l2 = l2.next
      pre = pre.next
      pre.next = l1
    }
  }
  if (l2) {
    pre.next = l2
  }
  return head.next
}

/**
 * 树的递归
 * 剑指 Offer 26. 树的子结构
 * @param A
 * @param B
 */
function isSubStructure(A: TreeNode | null, B: TreeNode | null): boolean {
  // 先序遍历每个节点，对每个节点都调用recur方法，比较是否是子结构。
  return A !== null && B !== null && (recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B))
}

function recur(a: TreeNode, b: TreeNode) {
  if (!b) return true
  if (!a || a.val !== b.val) return false
  // 根节点相同，递归比较左右子树是否相同
  return recur(a.left, b.left) && recur(a.right, b.right)
}

/**
 * 递归
 * 剑指 Offer 27. 二叉树的镜像
 * @param root
 */
function mirrorTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  let tempNode = root.left
  root.left = mirrorTree(root.right)
  root.right = mirrorTree(tempNode)
  return root
}

/**
 * 栈
 * 剑指 Offer 27. 二叉树的镜像
 * @param root
 */
function mirrorTree2(root: TreeNode | null): TreeNode | null {
  if (!root) return null
  const stack: TreeNode[] = []
  stack.push(root)
  while (stack.length) {
    const node = stack.pop()
    if (node) {
      stack.push(node.left)
      stack.push(node.right)
      const temp = node.left
      node.left = node.right
      node.right = temp
    }
  }
  return root
}

/**
 * 剑指 Offer 28. 对称的二叉树
 * @param root
 */
function isSymmetric(root: TreeNode | null): boolean {
  const dfs = (p: TreeNode, q: TreeNode): boolean => {
    if (!p && !q) return true
    if (!p || !q) return false
    if (p.val !== q.val) return false
    return dfs(p.left, q.right) && dfs(p.right, q.left)
  }
  return dfs(root, root)
}

/**
 * 剑指 Offer 20. 表示数值的字符串
 * @param s
 */
function isNumber(s: string): boolean {
  s = s.trim()
  let numFlag = false,
    EFlag = false,
    dotFlag = false
  for (let i = 0; i < s.length; i++) {
    const c = s[i]
    if (c >= '0' && c <= '9') {
      numFlag = true
      // . 则之前不能出现e和.
    } else if (c === '.' && !dotFlag && !EFlag) {
      dotFlag = true
      // e/E，需要没出现过e/e，并且之前有数字
    } else if ((c === 'e' || c === 'E') && !EFlag && numFlag) {
      EFlag = true
      // 防止最后一位是e/E, 比如123e
      numFlag = false
      // +/-只能出现在i=0的位置或者紧接着e/E
    } else if ((c === '+' || c === '-') && (i === 0 || s[i - 1] === 'e' || s[i - 1] === 'E')) {
    } else {
      // 到达这里，说明要么出现其它字母，要么+/-，E/e, . 的个数不对，或位置不对。
      return false
    }
  }
  return numFlag // 是否是数字。
}
/**
 * 有限状态自动机
 * 剑指 Offer 20. 表示数值的字符串
 * @param s
 * @returns
 */
function isNumber2(s: string): boolean {
  /**
   * .:  .
     s: sign +/-
     d: 数字
   */
  const states: object[] = [
    { ' ': 0, d: 2, s: 1, '.': 4 }, // 0. 初始状态，可以是空格，数字，点，符号
    { d: 2, '.': 4 }, //1. e之前的正负号。此时可以是数字，或者.
    { d: 2, '.': 3, e: 5, ' ': 8 }, //2. 小数点之前的数字
    { d: 3, e: 5, ' ': 8 }, //3. 小数点，小数点之后的数字
    { d: 3 }, //4. 当小数点前为空格，小数点，小数点之后的数字
    { s: 6, d: 7 }, //5. e
    { d: 7 }, //6. e之后的正负号
    { d: 7, ' ': 8 }, //7. e之后的数字
    { ' ': 8 } //8. 结尾空格
  ]
  let p = 0
  for (const c of s) {
    let t = '?'
    if (c >= '0' && c <= '9') t = 'd'
    if (['+', '-'].includes(c)) t = 's'
    if (['e', 'E'].includes(c)) t = 'e'
    if (['.', ' '].includes(c)) t = c
    if (!Object.keys(states[p]).includes(t)) return false
    p = states[p][t]
  }
  return [2, 3, 7, 8].includes(p)
}

/**
 * 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
 * @param nums
 */
function exchange(nums: number[]): number[] {
  let temp = 0,
    p = 0,
    q = nums.length - 1

  while (p < q) {
    while (nums[p] % 2 !== 0 && p < q) {
      p++
    }
    while (nums[q] % 2 === 0 && q < q) {
      q--
    }
    temp = nums[p]
    nums[p] = nums[q]
    nums[q] = temp
  }
  return nums
}

/**
 * 顺时针旋转
 * 面试题 01.07. 旋转矩阵
 * @param matrix
 */
function rotate(matrix: number[][]): void {}

/**
 * 剑指 Offer 29. 顺时针打印矩阵
 * @param matrix
 */
function spiralOrder(matrix: number[][]): number[] {
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return []
  let l = 0,
    t = 0,
    r = matrix[0].length - 1,
    b = matrix.length - 1,
    k = 0,
    all = matrix.length * matrix[0].length,
    res = []
  let i = 0,
    j = 0
  while (k < all) {
    while (k < all && j <= r) {
      res[k++] = matrix[i][j++]
    }
    t++
    j--
    i++
    while (k < all && i <= b) {
      res[k++] = matrix[i++][j]
    }
    r--
    i--
    j--
    while (k < all && j >= l) {
      res[k++] = matrix[i][j--]
    }
    b--
    j++
    i--
    while (k < all && i >= t) {
      res[k++] = matrix[i--][j]
    }
    l++
    i++
    j++
  }
  return res
};
/**
 * 优化，时间更短
 * 剑指 Offer 29. 顺时针打印矩阵
 * @param matrix 
 * @returns 
 */
function spiralOrder2(matrix: number[][]): number[] {
if (!matrix || matrix.length === 0 || matrix[0].length === 0) return []
  let l = 0,
    t = 0,
    r = matrix[0].length - 1,
    b = matrix.length - 1,
    k = 0,
    all = matrix.length * matrix[0].length,
    res = []
  while (k < all) {
    for (let i = l; i <= r; i++) {
      res[k++] = matrix[t][i];
    }
    t++;
    for(let i = t; i <= b; i++){
      res[k++] = matrix[i][r];
    }
    r--;
    for(let i = r; i >= l && k < all; i--){
      res[k++] = matrix[b][i];
    }
    b--;
    for(let i = b; i >= t && k < all; i--){
      res[k++] = matrix[i][l];
    }
    l++;
  }
  return res
};
