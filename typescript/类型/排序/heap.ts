/*
 * @Description:
 * @Version: 2.0
 * @Autor: one
 * @Date: 2022-04-15 11:39:31
 * @LastEditors: one
 * @LastEditTime: 2022-04-15 15:54:03
 */
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

class MinHeap<T> {
  heap: T[]
  data: T[]
  constructor(data: T[]) {
    this.heap = []
    this.data = data
    this.buildHeap()
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

  /**
    * 从index开始上移节点。

    * 如果比父元素小，就与父元素交换

    * 直到该元素达到堆顶或，比父元素大
    * @param index 
    */
  shiftUp(index: number) {
    const parentIndex = this.getParentIndex(index)
    if (this.heap[parentIndex] > this.heap[index]) {
      this.swap(parentIndex, index)
      this.shiftUp(parentIndex)
    }
  }
  /**
   * 从index开始下移节点

   * 比较两个子节点的数值

   * 哪个小，就与哪个比较，如果比子节点大就交换

   * 然后递归下移
   * @param index 
   */
  shiftDown(index: number) {
    const [leftChildIndex, rightChildIndex] = this.getChildIndex(index)
    // 1. 叶子节点
    if(leftChildIndex >= this.heap.length){
      return;
    }
    // 2. 两个子节点
    if(rightChildIndex < this.heap.length){
      const minIndex = this.getMin(leftChildIndex, rightChildIndex);
      if(this.heap[index] > this.heap[minIndex]){
        this.swap(minIndex, index)
        this.shiftDown(minIndex)
      }
      return;
    }
    // 3. 单节点（肯定是左节点）
    if(this.heap[leftChildIndex] < this.heap[index]){
      this.swap(leftChildIndex, index)
      this.shiftDown(leftChildIndex);
    }

  }

  /**
   * 获取两个节点中较小的那个的下标
   * @param i 
   * @param j 
   * @returns 
   */
  getMin(i: number, j: number){
    if(this.heap[i] < this.heap[j]) return i
    return j
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
    const min = this.heap[0]
    // 把堆底元素填充到堆顶元素
    this.heap[0] = this.heap.pop()
    // 然后开始下移
    this.shiftDown(0)
    return min
  }

  /**
   * 返回堆顶最小元素
   * @returns
   */
  peek() {
    return this.heap[0]
  }
}


/**
 * 大根堆：
   方法和小根堆一样，只是判断大小反着来
 */
class MaxHeap<T> {
  heap: T[]
  data: T[]
  constructor(data?: T[],) {
    this.heap = []
    if(data){
      this.data = data
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

  /**
    * 从index开始上移节点。

    * 如果比父元素大，就与父元素交换

    * 直到该元素达到堆顶或，比父元素小
    * @param index 
    */
  shiftUp(index: number) {
    const parentIndex = this.getParentIndex(index)
    if (this.heap[parentIndex] < this.heap[index]) {
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
    if(leftChildIndex >= this.heap.length){
      return;
    }
    // 2. 两个子节点
    if(rightChildIndex < this.heap.length){
      const maxIndex = this.getMax(leftChildIndex, rightChildIndex);
      if(this.heap[index] < this.heap[maxIndex]){
        this.swap(maxIndex, index)
        this.shiftDown(maxIndex)
      }
      return;
    }
    // 3. 单节点（肯定是左节点）
    if(this.heap[leftChildIndex] > this.heap[index]){
      this.swap(leftChildIndex, index)
      this.shiftDown(leftChildIndex);
    }

  }

  /**
   * 获取两个节点中较大的那个的下标
   * @param i 
   * @param j 
   * @returns 
   */
  getMax(i: number, j: number){
    if(this.heap[i] > this.heap[j]) return i
    return j
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
}

function testHeap() {
  const range = 2_000_000
  let arr1 = []
  const arr2 = []
  let i = 0
  while (i < range) {
    i++
    const random = Math.random() * range
    arr1.push(random)
    arr2.push(random)
  }
  // console.log(arr1.slice(0, 20))
  let start = Date.now()
  const h = new MaxHeap(arr1)
  arr1.length = 0
  while (h.heap.length) {
    arr1.push(h.pop())
  }
  let end = Date.now()
  console.log(arr1.slice(0, 20), `\n minHeap spendTime = ${end - start}ms`)

  // console.log(arr2.slice(0, 20))
  start = Date.now()
  arr2.sort((a, b) => b - a)
  end = Date.now()
  console.log(arr2.slice(0, 20), `\n sort spendTime = ${end - start}ms`)
}
testHeap()
