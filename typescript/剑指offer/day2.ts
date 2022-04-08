/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-04 22:55:55
 * @LastEditors: one
 * @LastEditTime: 2022-04-08 11:33:43
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
  return (A !== null && B !== null) && (recur(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B))
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
  if(!root) return null;
  let tempNode = root.left;
  root.left = mirrorTree(root.right);
  root.right = mirrorTree(tempNode);
  return root;
};

/**
 * 栈
 * 剑指 Offer 27. 二叉树的镜像
 * @param root 
 */
function mirrorTree2(root: TreeNode | null): TreeNode | null {
  if(!root) return null;
  const stack: TreeNode[] = [];
  stack.push(root);
  while(stack.length) {
    const node = stack.pop();
    if(node){
      stack.push(node.left);
      stack.push(node.right);
      const temp = node.left;
      node.left = node.right;
      node.right = temp;
    }
  }
  return root;
};