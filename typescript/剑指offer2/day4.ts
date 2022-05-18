import { ListNode, Node } from '../utils/数据结构/struct'

/**
 * 剑指 Offer II 016. 不含重复字符的最长子字符串
 (滑动窗口+set)
 * @param s
 */
function lengthOfLongestSubstring(s: string): number {
  /**
  
  1. 枚举子串的起始位置i，结束位置j，子串i->j是不包含重复字符的最长字串。
  2. 使用set保存该字串所有的元素
  3. 每次i+1，从set中删除i字符，set.remove(s.charAt(i)), 则子串i+1->j一定不含重复元素，
      此时结束为止j可以向右扩展，并且将扩展的字符s.charAt(j)放入set。
      直到s.charAt(j)已经在set中了。
  4. 当确定j以后，使用max保存最长的字串长度
   */

  const set = new Set<string>()
  let max = 0
  for (let i = 0, j = 0; i < s.length; i++) {
    while (j < s.length && !set.has(s.charAt(j))) {
      set.add(s.charAt(j))
      j++
    }
    console.log(set, i, j)

    max = Math.max(max, j - i)
    const c = s.charAt(i)
    set.delete(c)
  }
  return max
}

// console.log(lengthOfLongestSubstring("bbbbb"))

/**
 * 剑指 Offer II 017. 含有所有字符的最短字符串
 * @param s
 * @param t
 */
function minWindow(s: string, t: string): string {
  if (t.length > s.length) return ''
  /**
  思路：滑动窗口，
      0. 令l，r窗口内的子串，始终符合条件。
      1. 每次r右移一位，就记录新加入的字符。
      2. 然后l循环右移，直到当前子串符合条件且最短。然后l再右移一位，此时子串不再符合条件。
      3. 循环体内，每次都要更新符合条件的最短子串长度和起始下标。

      如何验证子串是否符合条件？
      1. 使用T[58]保存t字符串中每个字符出现的次数。（A-Z a-z，一共52+4个字符）
      2. 使用S[58]保存s字符串的l->r子串中，每个字符出现的次数。
      3. 只要S每个对应位置都>=T, 说明l->r子串符合条件。
      4. 每次窗口变化，都更新S数组。

   使用长度为52的数组T保存t每一位出现的次数。
   使用长度为52的数组S保存s的子串每一位出现的次数。

    令l = 0, r = -1为s的子串的起始和结束下标。x， y为对应位置的字符
     left = -1, right = -1为含有所有字符的最短字符串的起始下标
   1. r += 1，y = s.charAt(r), S[y]++, 表示当前字串中添加了y字符
   2. 循环l += 1，直到l <= r 且（当前子串去掉l位置的x字符后，不再符合要求）
   3. 每次循环内，都更新字串的长度len为最小值，且保存起始下标left, right。
   4. 最终结束时，如果left == -1， 说明s中没有符合条件的子串，直接返回""
      否则返回s的left->right的子串
   */
  const S = [...Array(58)].map(i => 0),
    lens = s.length
  const T = [...Array(58)].map(i => 0),
    lent = t.length
  for (let i = 0; i < lent; i++) {
    T[t.charCodeAt(i) - 65]++
    // S[s.charCodeAt(i) - 65]++
  }

  const check = () => {
    for (let i = 0; i < 58; i++) {
      if (T[i] > S[i]) return false
    }
    return true
  }
  let left = -1,
    right = -1,
    len = Number.MAX_SAFE_INTEGER
  let l = 0,
    r = -1
  //  更新最短字串下标
  while (r < lens) {
    r++
    //  right扩张至当前字串符合条件为止
    if (r < lens) {
      S[s.charCodeAt(r) - 65]++
    }
    // left收缩至当前字串不符合条件为止
    while (l <= r && check()) {
      //  更新最短字串下标
      if (r - l + 1 < len) {
        len = r - l + 1
        left = l
        right = r + 1
      }
      S[s.charCodeAt(l) - 65]--
      l++
    }
  }

  return left === -1 ? '' : s.slice(left, right)
}
// let a = "ab", b = "b"
// let a = "ADOBECODEBANC", b = "ABC"
// let a = "ADOBECODEBANC", b = "ABC"
// console.log(minWindow(a, b))

/**
 * 剑指 Offer II 018. 有效的回文
 * @param s
 */
function isPalindrome(s: string): boolean {
  /**
   双指针l = 0,r = s.length

   循环l++, r--， 直到l,r都指向数字或字母。
   如果s[l] == s[r], 则l++, r--
   否则返回false
   */
  const check = (c: string) => {
    const code = c.charCodeAt(0)
    return (code > 47 && code < 58) || (code > 64 && code < 91) || (code > 96 && code < 123)
  }
  for (let l = 0, r = s.length - 1; l < r; l++, r--) {
    while (l < r && !check(s.charAt(l))) l++
    while (l < r && !check(s.charAt(r))) r--
    if (s.charAt(l).toLowerCase() !== s.charAt(r).toLowerCase()) return false
  }
  return true
}

/**
 * 剑指 Offer II 019. 最多删除一个字符得到回文
 * @param s
 */
function validPalindrome(s: string): boolean {
  const valid = (s: string) => {
    for (let l = 0, r = s.length - 1; l < r; l++, r--) {
      if (s.charAt(l) !== s.charAt(r)) return false
    }
    return true
  }
  for (let l = 0, r = s.length - 1; l < r; l++, r--) {
    if (s.charAt(l) !== s.charAt(r)) {
      return valid(s.slice(l, r)) || valid(s.slice(l + 1, r + 1))
    }
  }
  return true
}

/**
 * 剑指 Offer II 020. 回文子字符串的个数
 ( 动态规划)
 * @param s
 */
function countSubstrings(s: string): number {
  /**
   动态规划

   dp[i][j]表示从i->j的子串是否是回文串。

   dp[i][j] = (s.charAt(i) === s.charAt(j)) && dp[i + 1][j - 1] 

   */
  let res = 0
  const len = s.length,
    dp = [...Array(len)].map(_ => Array(len).fill(false))
  for (let i = len - 1; i >= 0; i--) {
    for (let j = i; j < len; j++) {
      if (i === j) {
        dp[i][j] = true
        res++
        continue
      } else {
        dp[i][j] = s.charAt(i) === s.charAt(j)
        if (j - i > 2) {
          dp[i][j] = dp[i][j] && dp[i + 1][j - 1]
        }
        if (dp[i][j]) res++
      }
    }
  }
  return res
}

/**
 * 剑指 Offer II 020. 回文子字符串的个数
 (manacher 马拉车算法)
 * @param s
 */
function countSubstrings2(s: string): number {
  if (s.length === 0) return 0
  let temp = '^'
  for (let i = 0; i < s.length; i++) {
    temp += `#${s.charAt(i)}`
  }
  temp += '#!'

  let C = 0,
    R = 0,
    P = [],
    len = temp.length,
    res = 0
  for (let i = 1; i < len - 1; i++) {
    const i_mirror = C * 2 - i
    if (R > i) {
      P[i] = Math.min(R - i, P[i_mirror])
    } else {
      // 最短回文子串就是单个字符本身
      P[i] = 1
    }

    while (temp.charAt(i - P[i]) === temp.charAt(i + P[i])) {
      P[i]++
    }

    if (i + P[i] > R) {
      C = i
      R = i + P[i]
    }
    // P[i]表示temp字符串i位置的最长回文子串的半径
    // 由于temp = 2 * s， 所以P[i] / 2表示s字符串i / 2位置，最长回文子串的半径
    // 也就是该位置实际上贡献了P[i] / 2个回文子串。
    res += Math.floor(P[i] / 2)
    console.log(P[i])
  }
  return res
}

// console.log(countSubstrings2("aaa"));

/**
 * 剑指 Offer II 025. 链表中的两数相加
 * @param l1
 * @param l2
 */
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  /**
   1. 将l1, l2两个链表转为数组a,b，逆序
   2. 令a指向更长的那个数组。
   3. 遍历数组a， 将对应位相加，再加上进位carry。b全部遍历以后，就忽略b数组
   4. 如果最后carry等于1，则在a的最后一位再补1
   4. 将数组a逆序转为链表。
   */
  let a = [],
    b = []
  while (l1) {
    a.unshift(l1.val)
    l1 = l1.next
  }
  while (l2) {
    b.unshift(l2.val)
    l2 = l2.next
  }
  let i = 0,
    carry = 0
  if (a.length < b.length) {
    let t = a
    a = b
    b = t
  }
  for (; i < b.length; i++) {
    let temp = (a[i] + b[i] + carry) % 10
    carry = Math.floor((a[i] + b[i] + carry) / 10)
    a[i] = temp
  }
  for (; i < a.length; i++) {
    const temp = (a[i] + carry) % 10
    carry = Math.floor((a[i] + carry) / 10)
    a[i] = temp
  }

  if (carry === 1) {
    a[i] = 1
  }
  const head = new ListNode()
  let p = head
  for (let i = a.length - 1; i >= 0; i--) {
    p.next = new ListNode(a[i])
    p = p.next
  }
  return head.next
}

/**
 * 剑指 Offer II 026. 重排链表
 * @param head
 */
function reorderList(head: ListNode | null): void {
  const queue: ListNode[] = []
  while (head) {
    queue.push(head)
    head = head.next
  }
  let i = 0,
    j = queue.length - 1
  while (i < j) {
    queue[i].next = queue[j]
    i++
    if (i < j) {
      queue[j].next = queue[i]
      j--
    }
  }
  queue[j].next = null
}

/**
 * 剑指 Offer II 028. 展平多级双向链表
 (深度优先遍历)
 * @param head 
 */
function flatten(head: Node | null): Node | null {
  /**
   遍历链表，如果某个节点的child不为null，则dfs(node.child)
   然后将返回的单层双向链表插入node后面
   */
  const dfs = (node: Node | null): Node | null => {
    // 使用last记录链表最后一个节点。
    let last = node
    while (node) {
      if (!node.next) last = node
      if (node.child) {
        // 获取child打平之后的链表的尾结点。
        let childLast = dfs(node.child)

        // 如果当前节点不是尾结点，需要处理next节点
        if (node.next) {
          let next = node.next
          childLast.next = next
          next.prev = childLast
        }
        node.next = node.child
        node.child.prev = node

        // 将当前节点的child置为null
        node.child = null
        node = childLast
      } else {
        node = node.next
      }
    }
    return last
  }
  dfs(head)
  return head
}

/**
 * 剑指 Offer II 029. 排序的循环链表
 * @param head
 * @param insertVal
 */
function insert(head: Node | null, insertVal: number): Node | null {
  /**
   找到p，使得p <= insertVal 且p.next > insertVal
   如果没找到，说明insertVal太大或太小，都应该插入到边界。
   */
  if (!head) {
    head = new Node(insertVal)
    head.next = head
    return head
  }
  let p = head,
    bound = head
  while (p.val > insertVal || p.next.val <= insertVal) {
    // 寻找边界。
    if (p.next.val < p.val) {
      bound = p
    }
    // 循环了一轮。
    if (p.next === head) break
    p = p.next
  }
  const insert = new Node(insertVal)
  if (p.val <= insertVal && p.next.val > insertVal) {
    insert.next = p.next
    p.next = insert
  } else {
    insert.next = bound.next
    bound.next = insert
  }
  return head
}

/**
 * 剑指 Offer II 029. 排序的循环链表
 (优化)
 * @param head
 * @param insertVal
 */
function insert2(head: Node | null, insertVal: number): Node | null {
  /**
   循环一轮链表。如果找到边界了，也就是p.next < p
   此时判断insertVal, 是否小于p.next, 或者大于p, 是的话结束循环。将insertVal插入p后面。

   如果找到p, 使得p.val <= insertVal <= p.next.val， 那么将insertVal插入p后面
   */
  if (!head) {
    head = new Node(insertVal)
    head.next = head
    return head
  }
  let p = head
  while (p.next !== head) {
    // 寻找边界。
    if (p.next.val < p.val && (insertVal <= p.next.val || insertVal >= p.val)) {
      break
    }
    // 循环了一轮。
    if (p.val <= insertVal && p.next.val >= insertVal) break
    p = p.next
  }
  const insert = new Node(insertVal)

  insert.next = p.next
  p.next = insert
  return head
}
