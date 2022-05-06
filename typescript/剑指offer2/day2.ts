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
  return root
}

/**
 * 剑指 Offer II 081. 允许重复选择元素的组合
   回溯+剪枝
 * @param candidates
 * @param target
 */
function combinationSum(candidates: number[], target: number): number[][] {
  /**
  回溯+剪枝
  对于数组中的每一位数字，有两个状态，选或不选。
  1. dfs函数，接收参数start(当前访问的下标)，total(访问candidates[i]之前的数字和), track(和为total的元素数组)
  2. 如果total > target: return，（剪枝）
  3. 如果total == target：result.push(track) return (找到了一组答案)
  4. 遍历从start开始的所有元素：
      1. 对于每个元素，将total += candidates[i], track.push(candidates[i]), 对该位继续递归。（表示每一位可以添加多次）
      2. 然后将total -= candidates[i], track.pop()
   */
  const result: number[][] = [],
    len = candidates.length

  /**
   * dfs函数
   * @param start 当前访问的下标
   * @param total 访问candidates[i]之前的数字和
   * @param track 和为total的元素数组
   * @returns
   */
  const dfs = (start: number, total: number, track: number[]) => {
    // 如果total > target: return，（剪枝）
    if (total > target) return

    // 如果total == target：result.push(track) return (找到了一组答案)
    if (total === target) {
      result.push([...track])
      return
    }

    // 遍历从start开始的所有元素：
    for (let i = start; i < len; i++) {
      const n = candidates[i]

      // 对于每个元素，将total += candidates[i], track.push(candidates[i]), 对该位继续递归。（表示每一位可以添加多次）
      total += n
      track.push(n)
      dfs(i, total, track)

      // 然后将total -= candidates[i], track.pop() (表示该位添加0次)
      total -= n
      track.pop()
    }
  }
  dfs(0, 0, [])
  return result
}

/**
 * 剑指 Offer II 003. 前 n 个数字二进制中 1 的个数
 * @param n
 */
function countBits(n: number): number[] {
  /**
  动态规划

  1. 假如i = 4, 二进制位100, 将其二进制左移一位, 后面可以补0， 或1
      两个数字分别为1000(8)和1001(9), 刚好是4 的二倍 和二倍 +1
  2. 如果反过来看, i = 9, 二进制1001, 将其二进制右移一位，则为100(4), 所以9的二进制1的个数, 等于4的二进制1的个数 + 1
                  i = 8, 二进制1000, 将其二进制右移一位，则为100(4), 所以8的二进制1的个数, 等于4的二进制1的个数
      加不加1，取决于i是奇数还是偶数。可以用i & 1来判断是否+1（i是奇数，则i & 1 等于 1）
   */
  const result = [0]
  for (let i = 1; i <= n; i++) {
    result[i] = result[i >> 1] + (i & 1)
  }
  return result
}

