import { TreeNode } from '../utils/数据结构/struct'

/**
236. 二叉树的最近公共祖先
给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。

百度百科中最近公共祖先的定义为：“对于有根树 T 的两个节点 p、q，最近公共祖先表示为一个节点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。”

 

示例 1：


输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
输出：3
解释：节点 5 和节点 1 的最近公共祖先是节点 3 。
示例 2：


输入：root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
输出：5
解释：节点 5 和节点 4 的最近公共祖先是节点 5 。因为根据定义最近公共祖先节点可以为节点本身。
示例 3：

输入：root = [1,2], p = 1, q = 2
输出：1
 

提示：  

树中节点数目在范围 [2, 105] 内。
-109 <= Node.val <= 109
所有 Node.val 互不相同 。
p != q
p 和 q 均存在于给定的二叉树中。
 */
function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  const map = new Map<number, TreeNode>()
  map.set(root.val, null)
  const dfs = (node: TreeNode) => {
    if (node.left) {
      map.set(node.left.val, node)
      dfs(node.left)
    }
    if (node.right) {
      map.set(node.right.val, node)
      dfs(node.right)
    }
  }

  dfs(root)
  const set = new Set<number>()

  while (p) {
    set.add(p.val)
    p = map.get(p.val)
  }

  while (q) {
    if (set.has(q.val)) {
      const res = map.get(q.val)
      if (res) return q
      return root
    }
    q = map.get(q.val)
  }
}

/**
 * 递归--
 * @param root
 * @param p
 * @param q
 * @returns
 */
function lowestCommonAncestor2(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode): TreeNode => {
    // 1. 如果已经到叶子节点，直接返回null
    if (!node) return null
    // 2. 如果node等于p,q。直接返回node
    if (node === p || node === q) return node

    // 3. 对左右子树进行递归，得到left，right
    const left = dfs(node.left)
    const right = dfs(node.right)

    // 4. 如果left和right都存在，说明p和q分别位于node的两侧，直接返回node（该节点就是p和q的最近公共父节点）
    if (left && right) {
      return node
    }
    // 5. 如果left和right都为空，说明p和q不在node的子节点中，返回null
    if (!left && !right) {
      return null
    }

    // 6. 此时left和right只有一个不为null。
    if (left) {
      // 此时有两种情况，
      // 1. p和q都在node.left子树中，此时dfs返回的left就是p和q的最近公共父节点
      // 2. p和q只有一个在node.left子树中，另一个不在node的子树中。
      // 无论如何返回left就可以了。
      return left
    }
    if (right) {
      // 理同左子树
      return right
    }
  }

  return dfs(root)
}

/**
 * 对方法二（递归）进行优化
 * @param root
 * @param p
 * @param q
 * @returns
 */
function lowestCommonAncestor3(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  const dfs = (node: TreeNode): TreeNode => {
    if (!node || node === p || node === q) return node

    const left = dfs(node.left)
    const right = dfs(node.right)
    
    if (!left) return right
    if (!right) return left
    return node
  }

  return dfs(root)
}
