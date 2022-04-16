import { ListNode, MaxHeap } from './struct'
/**
 * 867. 转置矩阵
 * @param matrix
 */
function transpose(matrix: number[][]): number[][] {
  const arr = [...Array(matrix[0].length)].map(_ => [])

  matrix.forEach(r => {
    r.forEach((c, columnIndex) => {
      arr[columnIndex].push(c)
    })
  })
  return arr
}

/**
 * 剑指 Offer 16. 数值的整数次方
 * @param x
 * @param n
 */
function myPow(x: number, n: number): number {
  /**
   快速幂：二进制
   x^n 将n进行二进制拆解。
   x^n = (x^2)^(n / 2) = (x ^ 4) ^ (n / 4) = ...
   当n为奇数时，n/2向下取整，会少乘一次x,所以额外x *= x;
   一直循环，直到n二进制拆解到0。
   */
  let N = BigInt(n) // 该题的n可能会超出限制，所以转为bigint
  if (x === 0) return 0
  if (N < 0) {
    x = 1 / x
    N = -N
  }
  let res = 1.0
  while (N) {
    // n & 1判断二进制最后一位是1还是0.也就是奇偶性
    if (N & 1n) {
      res *= x
    }
    x *= x
    // 右移一位，也就是/2向下取整。
    N >>= 1n
  }
  return res
}

/**
 * 方法一：dfs不考虑大数
 * 剑指 Offer 17. 打印从1到最大的n位数
 * @param n
 */
function printNumbers(n: number): number[] {
  const num = [...Array(n)].fill('0')
  const res: number[] = []

  const dfs = (x: number) => {
    if (x === n) {
      const s = +num.join('')
      if (s === 0) return
      res.push(s)
    } else {
      for (let i = 0; i < 10; i++) {
        num[x] = `${i}`
        dfs(x + 1)
      }
    }
  }

  dfs(0)
  return res
}

/**
 * 方法二：dfs考虑大数
 * 剑指 Offer 17. 打印从1到最大的n位数
 * @param n
 */
function printNumbers2(n: number): string[] {
  const num = [...Array(n)].fill('0')
  const res: string[] = []
  let start = n - 1,
    nine = 0

  const dfs = (x: number) => {
    if (x === n) {
      const s = num.slice(start).join('')
      if (n - start === nine) start -= 1 // 判断当前num组成的数字，每一位都是9
      if (s === '0') return
      res.push(s)
    } else {
      for (let i = 0; i < 10; i++) {
        if (i === 9) nine += 1 // 当该位填充9时，nine++
        num[x] = `${i}`
        dfs(x + 1)
      }
      nine -= 1 // 该位0 - 9 一轮递归完成，nine数量减一
    }
  }

  dfs(0)
  return res
}
/**
 * 动态规划
 * 剑指 Offer 19. 正则表达式匹配(困难)
 * @param s
 * @param p
 * @returns
 */
function isMatch(s: string, p: string): boolean {
  /*
  dp[i][j]: 表示s的前i个字符， 和p的前j个字符的匹配情况。
  1. 如果p[j]是字母 。
      那么dp[i][j] = (s[i] == [j]) && dp[i - 1][j - 1]
  2. 如果p[j]是.
      那么dp[i][j] = dp[i - 1][j - 1]
  3. 如果p[j]是*, 表示p[j - 1] 出现0或多次。
      dp[i][j] = true: 
      仅当s[i] == p[j - 2]（即dp[i][j - 2]）表示p[j - 1] 出现0次，
      或dp[i - 1][j] & (s[i] == p[j - 1] | p[j - 1] == ".") (表示p[j - 1] 匹配1次)
   */

  /**
   * 验证s[i - 1] 和p[i - 1]是否匹配
   * 因为传入的i,j比实际上多1
   * @param i
   * @param j
   * @returns
   */
  const match = (i: number, j: number): boolean => {
    if (i === 0) return false
    if (p[j - 1] === '.') return true
    if (s[i - 1] === p[j - 1]) return true
    return false
  }
  const m = s.length,
    n = p.length
  const dp = [...Array(m + 1)].map(_ => Array(n + 1).fill(false))
  dp[0][0] = true // 空字符串，表示匹配成功
  for (let i = 0; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] !== '*') {
        // 如果p[j](实际上是p[j - 1]) 不是 * 。dp[i][j]取决于s[i], p[j]是否匹配，以及dp[i - 1][j - 1]
        if (match(i, j)) {
          dp[i][j] = dp[i - 1][j - 1]
        }
      } else {
        // 如果p[j] 是 * 。
        dp[i][j] = dp[i][j - 2] // 1. 如果去掉*p[j]和前面的字母p[j - 1]（相当于字母p[j - 1]出现0次），看看s[i]和p[j - 2]是否匹配（即dp[i][j - 2]）
        if (match(i, j - 1)) {
          // 2. 如果p[j]（*号）前面的字母p[j - 1]和s[i]相等，那么p[j]（*号）可以表示p[j - 1]出现了1次。 dp[i][j] = dp[i - 1]dp[j]
          // 以上两个结果取||运算，表示0次或1次匹配成功都算。
          dp[i][j] = dp[i - 1][j] || dp[i][j]
        }
      }
    }
  }

  return dp[m][n]
}
/**
 * 剑指 Offer 24. 反转链表
定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

 

示例:

输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
 

限制：

0 <= 节点个数 <= 5000
 * @param head 
 */
function reverseList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head
  let p = head.next,
    q = head.next.next
  head.next = null // head变为尾结点，需要置为null，否则会循环
  while (q) {
    p.next = head
    head = p
    p = q
    q = q.next
  }
  p.next = head
  return p
}

/**
 * 剑指 Offer 18. 删除链表的节点
给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。

返回删除后的链表的头节点。

注意：此题对比原题有改动

示例 1:

输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
示例 2:

输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
 

说明：

题目保证链表中节点的值互不相同
若使用 C 或 C++ 语言，你不需要 free 或 delete 被删除的节点
 * @param head 
 * @param val 
 */
function deleteNode(head: ListNode | null, val: number): ListNode | null {
  if (!head) return head
  if (head.val === val) return head.next // 此处处理head为需要删除的节点。 或者不要这行，
  let p = new ListNode(-1),
    q = head
  p.next = head // 在这行后面加上head = p. 最后return head.next;
  while (q) {
    if (q.val === val) {
      q = q.next
      p.next = q
    } else {
      p = p.next
      q = q.next
    }
  }
  return head
}

/**
 * 剑指 Offer 40. 最小的k个数
输入整数数组 arr ，找出其中最小的 k 个数。例如，输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4。

示例 1：

输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]
示例 2：

输入：arr = [0,1,2,1], k = 1
输出：[0]
 

限制：

0 <= k <= arr.length <= 10000
0 <= arr[i] <= 10000
 * @param arr 
 * @param k 
 */
function getLeastNumbers(arr: number[], k: number): number[] {
  /**
    冒泡k次。取前k个数(时间复杂度o(n^2))
   */
  for (let i = 0; i < k; i++) {
    //  找到从i往后的最小数的下标
    let min = i
    for (let j = i; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    //  交换arr[i]和arr[min]
    let temp = arr[i]
    arr[i] = arr[min]
    arr[min] = temp
  }
  return arr.slice(0, k)
}

/**
 * 快排
 * 剑指 Offer 40. 最小的k个数
 * @param arr
 * @param k
 * @returns
 */
function getLeastNumbers2(arr: number[], k: number): number[] {
  /**
    快排，取前k个
   */
  //  arr.sort((a, b) => a - b);
  // 实现快排,
  // 优化快排， 当基准等于k时直接返回
  quickSort(arr, 0, arr.length - 1, k)
  return arr.slice(0, k)
}

function quickSort(arr: number[], l: number, r: number, k: number) {
  if (l < r) {
    const pos = partition(arr, l, r)
    if (pos + l + 1 === k) {
      return
    }
    if (pos + 1 < k) {
      // 前（pos+1)个数都是前k小的数。所以只排右半边
      quickSort(arr, pos + 1, r, k)
    } else {
      quickSort(arr, l, pos - 1, k)
    }
  }
  return
}

function partition(arr: number[], l: number, r: number): number {
  /**
   1. 定基准。
   2. 将比基准小的放在一边，大的放另一边。
   3. 返回基准的下标
   */
  let pivot = r
  let index = l
  for (let i = l; i < r; i++) {
    if (arr[pivot] > arr[i]) {
      swap(arr, index, i)
      index++
    }
  }
  swap(arr, index, pivot)
  return index
}

function swap(arr: number[], index: number, i: number) {
  const temp = arr[index]
  arr[index] = arr[i]
  arr[i] = temp
}

/**
 * 堆排序
 * 剑指 Offer 40. 最小的k个数
 * @param arr
 * @param k
 * @returns
 */
function getLeastNumbers3(arr: number[], k: number): number[] {
  /**
    堆排序
    : 使用大根堆。
    1. 先给大根堆放入k个元素，堆顶就是这k个元素里的最大元素
    2. 遍历后面的元素，只有当arr[i] 比 堆顶元素小，就pop() 堆顶元素。
    3. 然后入堆arr[i]
    4. 最后返回堆元素转成的数组

    最小堆不太适合。
    如果要使用：
    方法一： 所有元素取反。按大根堆的方法使用。最后返回的数据需要再取反。
    方法二：
        k = arr.length - k;
        1. 先给小根堆放入k个元素，堆顶就是这k个元素里的最小元素
        2. 遍历后面的元素，只有当arr[i] 比 堆顶元素大，就pop() 堆顶元素。
        3. 然后入堆arr[i]
        4. 把pop()出来的元素放入res[] .
        5. 如果arr[i] < 堆顶元素。就直接存入res[]
        6. 返回res[]
   */
  const Mheap = new MaxHeap<number>()
  for (let i = 0; i < k; i++) {
    Mheap.insert(arr[i])
  }
  for (let i = k; i < arr.length; i++) {
    if (arr[i] < Mheap.peek()) {
      Mheap.pop()
      Mheap.insert(arr[i])
    }
  }

  return Mheap.heap
}

/**
 * 剑指 Offer 30. 包含min函数的栈
 */
class MinStack {
  stackA: any[]
  stackB: any[]
  /**
   * 声明两个栈
   * A 正常保存数据。
   * B 用来保存最小的数
   */
  constructor() {
    this.stackA = []
    this.stackB = []
  }
  /**
   * 返回arr的末尾数字
   * @param arr 
   * @returns 
   */
  peek(arr: any[]) {
    return arr[arr.length - 1]
  }
  /**
   * 直接入A
   * 如果B 中有数，则比较B顶元素和x的大小
   * 如果比B顶元素小，则入栈
   * @param x 
   */
  push(x: number): void {
    this.stackA.push(x)
    if (this.stackB.length === 0) {
      this.stackB.push(x)
    } else {
      const min = this.peek(this.stackB)
      if (x <= min) {
        this.stackB.push(x)
      }
    }
  }
  /**
   * 直接踢出A顶元素
   * 如果踢出的元素==B顶元素，B也要踢出元素
   * 再次比较AB栈顶元素，如果A栈顶元素小于B栈顶元素
   * 则入B栈
   */
  pop(): void {
    const top = this.stackA.pop()
    if (top === this.peek(this.stackB)) {
      this.stackB.pop()
      const newATop = this.peek(this.stackA)
      if (newATop < this.peek(this.stackB)) {
        this.stackB.push(newATop)
      }
    }
  }

  top(): number {
    return this.peek(this.stackA)
  }

  min(): number {
    return this.peek(this.stackB)
  }
}
/**
 * 剑指 Offer 30. 包含min函数的栈
 * 优化：不使用辅助栈
 */
class MinStack2 {
    stack: any[]
    minValue: number
    /**
     * stack 存原始数与当前位置之前的最小值，minValue的差值。(x - minValue)
     */
    constructor() {
      this.stack = []
      this.minValue = 0
    }

    /**
     * x = [1, 4, 2, -5, 3]
     * [0, 3, 1, -6, 8]
     * -5
     * @param x 
     */
    push(x: number): void {
      if(this.stack.length === 0){
        this.stack.push(0)
        this.minValue = x;
      }else {
        const diff = x - this.minValue;
        this.stack.push(diff)
        if(diff <= 0){ // 相当于x比当前最小值小，所以更新minValue为x
          this.minValue = x
        }
      }
    }
    peek(): number {
      return this.stack[this.stack.length - 1]
    }
    pop(): void {
      const diff = this.stack.pop()
      // diff小于0，说明在push阶段，更新过minValue（也就是刚刚弹出的元素其实就是最小值）
      if(diff < 0){ 
        // 更新最小值（变大了）
        this.minValue = this.minValue - diff;
      }
    }

    top(): number {
      // 顶部差值小于0，说明minValue就是当前剩余元素里的最小值
      if(this.peek() < 0){
        return this.minValue;
      }else {
        return this.minValue + this.peek()
      }
    }

    min(): number {
      if(this.stack.length){
        return this.minValue;
      }else {
        return -1
      }
    }
}