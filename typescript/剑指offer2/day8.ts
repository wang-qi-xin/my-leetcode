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
