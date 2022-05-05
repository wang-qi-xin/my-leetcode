import { TreeNode } from '../utils/数据结构/struct'

/**
 * 剑指 Offer 55 - II. 平衡二叉树
   先序遍历+剪枝
 * @param root
 */
function isBalanced(root: TreeNode | null): boolean {
  /**
  1. root的左右两颗子树都要是平衡二叉树。
  2. root的左右两颗子树的高度差小于2
  3. 通过一个值来表示这两种情况。
      1. 如果root为null，返回0, 既表示root是平衡二叉树，也表示root的树高为0
      2. 令left = recur(root.left) 如果 left== -1， 表示left子树不是平衡二叉树，直接返回-1 (剪枝)
      3. 令right = recur(root.right) 如果right == -1 ,表示right子树不是平衡二叉树，直接返回 -1 (剪枝)
      4. 此时root的左右子树都是平衡二叉树。而left， right分别表示两颗子树的高度
         如果left和right的差的绝对值> 1, 则root不是平衡二叉树，返回-1
         否则返回left和right中较大的一位，并且加一。表示root的树高 
   */
  const recur = (node: TreeNode | null): number => {
    //1. 如果root为null，返回0, 既表示root是平衡二叉树，也表示root的树高为0
    if (!node) return 0

    // 2. 令left = recur(root.left) 如果 left== -1， 表示left子树不是平衡二叉树，直接返回-1 (剪枝)
    const left = recur(node.left)
    if (left < 0) return -1

    //  3. 令right = recur(root.right) 如果right == -1 ,表示right子树不是平衡二叉树，直接返回 -1 (剪枝)
    const right = recur(node.right)
    if (right < 0) return -1

    // 4. 此时root的左右子树都是平衡二叉树。而left， right分别表示两颗子树的高度
    //    如果left和right的差的绝对值> 1, 则root不是平衡二叉树，返回-1
    if (Math.abs(left - right) > 1) return -1

    //    否则返回left和right中较大的一位，并且加一。表示root的树高
    return Math.max(left, right) + 1
  }
  // recur(root) 如果等于-1， 则root不是平衡二叉树
  return recur(root) !== -1
}

/**
 * 剑指 Offer 68 - I. 二叉搜索树的最近公共祖先
 * @param root
 * @param p
 * @param q
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  /**
   前提是q比p大
   1. 由于该树是搜索树，假如p和q一个大于root，一个小于root，那么root刚好就是p和q的最近公共祖先
   2. 如果p，q都比root小，则判断root的left
   3. 否则判断root.right
   */
  if (p.val > q.val) {
    const t = p
    p = q
    q = t
  }
  // 不需要用递归
  // if (p.val < root.val && q.val > root.val) return root
  // if (p.val === root.val || q.val === root.val) return root
  // if (q.val < root.val) return lowestCommonAncestor(root.left, p, q)
  // return lowestCommonAncestor(root.right, p, q)

  while (root) {
    if (root.val > q.val) {
      // root大于p和q， 说明p, q都在root的左子树里
      root = root.left
    } else if (root.val < p.val) {
      //  root小于p和q， p, q都在root的右子树里
      root = root.right
    } else {
      // 说明root刚好大于p，且小于q，root就是p和q的最近公共祖先
      break
    }
  }
  return root;
}
