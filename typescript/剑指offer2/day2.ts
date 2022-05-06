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

/**
 * 剑指 Offer II 002. 二进制加法
 （模拟法）
 * @param a 
 * @param b 
 */
function addBinary(a: string, b: string): string {
  /**
   从地位到高位逐位相加，再加上进位carry
   carry初始为0，若结束时，carryr=1，则需要在最高位补1

   1. 取a和b的较长的长度len
   2. 从前向后，循环len次。（把a, b 逆转之后）
   3. carry = carry + a[i] + b[i], 此时carry = [0, 1, 2, 3], carry为奇数则res[i] = 1, 所以res[i] = carry % 2, 
   4. carry = carry >> 1.  carry只要>= 2, 则需要进位。
   */
  const A = a.split('').reverse(),
    B = b.split('').reverse()
  const lena = A.length,
    lenb = B.length,
    len = Math.max(lena, lenb),
    res: number[] = []
  let carry = 0
  for (let i = 0; i < len; i++) {
    const ca = A[i] ? +A[i] : 0,
      cb = B[i] ? +B[i] : 0
    carry += ca + cb
    res[i] = carry % 2
    carry >>= 1
  }
  if (carry) {
    res[len] = 1
  }
  return res.reverse().join('')
}

/**
 * 剑指 Offer II 082. 含有重复元素集合的组合
 * @param candidates
 * @param target
 */
function combinationSum2(candidates: number[], target: number): number[][] {
  /**
  回溯+剪枝

  由于candidates含有重复元素，且答案要求不能含有重复的答案。

  一般的回溯+剪枝无法满足要求
  1. dfs函数接受start参数，表示当前累计到多少位，total 表示总和。track[] 保存结果集。
  2. 如果total > target 直接返回。（剪枝）
  3. 如果total == target, 将track添加到result[]
  4. 令n = candidates[i] ,将n添加到track中，total += n; 进入下一层递归 dfs(i, total, track)
  5. track.pop(), total -= n

  // 满足要求
  1. 将candidates进行排序。这样假如candidates[i] > target, 后面的就不用再判断了。
  2. 用二维数组list保存元素的位置，大小，数量。
  3. 访问list, 访问到某一位list[i]时，x = list[i][0] 表示数字大小，size = list[i][1]表示数量
     对于x这个数字，可以选择的情况有0次，1次，，，n次。（前提是n <= size && n * x <= target）
  4. 当target === 0, 表示找到了一个正确的结果集
     当target < 0 , 表示当前结果集里的数字大于target，直接返回(剪枝)
  5. 否则，令n = Math.min(size, target / x)
     然后循环n次，每次令target -= x, track.push(x),  dfs(i + 1, target), 表示x数被添加了n次
     然后再循环n次，每次令target += x, dfs(i + 1, target), 
   */

  // 1. 排序
  candidates.sort((a, b) => a - b)

  // 2. 使用map保存每个数字出现的次数
  const map = new Map<number, number[]>()
  for (let i = 0, pos = -1, len = candidates.length; i < len; i++) {
    const n = candidates[i]
    // 如果map里有这个数字，
    if (map.size !== 0 && map.get(pos)[0] === n) {
      map.set(pos, [n, map.get(pos)[1] + 1])
    } else {
      map.set(++pos, [n, 1])
    }
  }

  // 所有结果
  const result: number[][] = []
  // 一个结果
  const track: number[] = []

  /**
   *
   * @param pos 当前访问到第几个元素（不重复元素）
   * @param target 访问当前元素时，还需要的求和target
   * @returns
   */
  const dfs = (pos: number, target: number) => {
    // 正确结果
    if (target === 0) {
      result.push([...track])
      return
    }

    // 没有元素要访问，获取当前需要的求和target, 已经小于当前要访问的数字，所以肯定不可能再对该数字求和
    if (pos === map.size || target < map.get(pos)[0]) {
      return
    }

    // 表示不选该数字
    dfs(pos + 1, target)

    // x 当前访问的数字， size 数字x出现的次数， n 表示要选择该数字的次数（不大于size， 也不大于target / x）
    const l = map.get(pos),
      x = l[0],
      size = l[1],
      n = Math.min(size, target / x)
    for (let i = 0; i < n; i++) {
      target -= x
      track.push(x)
      dfs(pos + 1, target)
    }

    // 选择该数字的情况全部遍历，从track中把该数字全部弹出
    for (let i = 0; i < n; i++) {
      track.pop()
    }
  }
  dfs(0, target)
  return result
}

// combinationSum2([1,2,1,1,3,3,2], 8)

/**
 * 剑指 Offer II 004. 只出现一次的数字
 * @param nums
 */
function singleNumber(nums: number[]): number {
  /**
   1. 使用arr保存每一位二进制的和
   2. 遍历所有的数字n
   3. 将n的每一位二进制数与arr中的对应位相加

   4. 最后将arr的每一位与3取余
   5. 判断是否是负数sign = arr[0] === 1 ? -1 : 1
   6. 如果是负数，就要把二进制按位取反并减一
   7. 将arr转为十进制
   8. 返回结果res * sign 

   将arr转为十进制
   */
  const arr = [...Array(32)].map(_ => 0)
  for (let i = 0, len = nums.length; i < len; i++) {
    let n = nums[i]
    for (let i = 31; i >= 0 && n != 0; i--) {
      arr[i] = (arr[i] + (n & 1)) % 3
      n >>= 1
    }
  }
  // 如果arr[0] == 1, 说明该数是负数，需要取反码并加一
  let res = 0,
    sign = arr[0] === 1 ? -1 : 1
  if (sign === -1) {
    // 按位取反
    for (let i = 31; i >= 0; i--) {
      if (arr[i] === 0) {
        arr[i] = 1
      } else {
        arr[i] = 0
      }
    }
    // 末位+1
    arr[31] += 1
    // 进位
    for (let i = 31; i > 0; i--) {
      arr[i - 1] += arr[i] >> 1
      arr[i] %= 2
    }
  }

  for (let i = 31; i >= 0; i--) {
    res += arr[i] * Math.pow(2, 31 - i)
  }
  console.log(res * sign);
  
  return res * sign
}

// singleNumber([-2,-2,1,1,4,1,4,4,-4,-2])
