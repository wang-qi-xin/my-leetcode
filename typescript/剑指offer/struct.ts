export class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val
    this.next = next === undefined ? null : next
  }
}

export class TreeNode {
  val: number
  left: TreeNode | null
  right: TreeNode | null
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val
    this.left = left === undefined ? null : left
    this.right = right === undefined ? null : right
  }
}

/**
   小根堆
   主要方法：
      1. 插入元素：
          将元素放入堆底
          上移：不断比较元素与父元素的大小
            如果比父元素小，就与父元素交换
            直到该元素达到堆顶或，比父元素大
      2. 移除元素：
           下移：pop()出堆顶元素。
              比较两个子元素的大小，哪个小就与堆顶元素交换。
              递归较小的那个子树。直到将堆底的元素填充到父元素

 */

type modeType = 'big' | 'little'
interface heapOptionType<T> {
  data?: T[]
  mode?: modeType
}

/**
 * 堆，默认小根堆
 */
export class Heap<T> {
  heap: T[]
  data: T[]
  mode: modeType
  constructor(option: heapOptionType<T>) {
    this.heap = []
    // 默认小根堆
    this.mode = option.mode ? option.mode : 'little'
    if (option.data) {
      this.data = option.data
      this.buildHeap()
    }
  }

  /**
   * 建堆
   */
  buildHeap() {
    this.data.forEach(v => {
      this.insert(v)
    })
  }

  /**
   * 插入元素value
   * @param value
   */
  insert(value: T) {
    this.heap.push(value)
    this.shiftUp(this.heap.length - 1)
  }
  compare(a: T, b: T): boolean {
    if (this.mode === 'little') return a > b
    return a < b
  }
  /**
    * 从index开始上移节点。

    * 如果比父元素大(小)，就与父元素交换

    * 直到该元素达到堆顶或，比父元素小
    * @param index 
    */
  shiftUp(index: number) {
    const parentIndex = this.getParentIndex(index)
    if (this.compare(this.heap[parentIndex], this.heap[index])) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  /**
   * 从index开始下移节点

   * 比较两个子节点的数值

   * 哪个大，就与哪个比较，如果index比子节点小就交换

   * 然后递归下移
   * @param index 
   */
  shiftDown(index: number) {
    const [leftChildIndex, rightChildIndex] = this.getChildIndex(index)
    // 1. 叶子节点
    if (leftChildIndex >= this.heap.length) {
      return
    }
    // 2. 两个子节点
    if (rightChildIndex < this.heap.length) {
      const maxIndex = this.getIndex(leftChildIndex, rightChildIndex)
      if (this.compare(this.heap[index], this.heap[maxIndex])) {
        this.swap(maxIndex, index)
        this.shiftDown(maxIndex)
      }
      return
    }
    // 3. 单节点（肯定是左节点）
    if (this.compare(this.heap[leftChildIndex], this.heap[index])) {
      this.swap(leftChildIndex, index)
      this.shiftDown(leftChildIndex)
    }
  }

  /**
   * 获取两个节点中较大(小)的那个的下标
   * @param i
   * @param j
   * @returns
   */
  getIndex(i: number, j: number) {
    if (this.mode === 'big') {
      if (this.heap[i] > this.heap[j]) return i
      return j
    }
    if (this.heap[i] > this.heap[j]) return j
    return i
  }
  /**
   * 获取index节点的两个子节点下标
   * @param index
   * @returns
   */
  getChildIndex(index: number): [number, number] {
    return [index * 2 + 1, index * 2 + 2]
  }
  /**
   * 交换堆中任意两个节点
   * @param parentIndex
   * @param index
   */
  swap(parentIndex: number, index: number) {
    const temp = this.heap[parentIndex]
    this.heap[parentIndex] = this.heap[index]
    this.heap[index] = temp
  }

  /**
   * 获取index位置节点的父节点下标
   * @param index
   * @returns
   */
  getParentIndex(index: number) {
    return (index - 1) >> 1
  }
  /**
   * 弹出堆顶元素
   */
  pop() {
    if (this.heap.length === 0) {
      throw new Error('没有元素了')
    }
    if (this.heap.length === 1) {
      return this.heap.pop()
    }
    const max = this.heap[0]
    // 把堆底元素填充到堆顶元素
    this.heap[0] = this.heap.pop()
    // 然后开始下移
    this.shiftDown(0)
    return max
  }

  /**
   * 返回堆顶最小元素
   * @returns
   */
  peek() {
    return this.heap[0]
  }

  /**
   * 返回堆大小
   * @returns 
   */
  size() {
    return this.heap.length
  }
}
