import { binarySearch } from '../utils/查找/binarySearch'

/**
 * 方法一：二分查找
 */
class MyCalendar {
  arr: number[]
  constructor() {
    this.arr = []
  }

  book(start: number, end: number): boolean {
    const index = binarySearch(this.arr, start, {
      mode: 'insert_right'
    })
    // console.log(this.arr, index, start, end)

    if (index & 1) return false

    if (index !== this.arr.length) {
      if (this.arr[index] < end) return false
    }

    this.arr.splice(index, 0, start, end)
    return true
  }
}

/**
 * Your MyCalendar object will be instantiated and called as such:
 * var obj = new MyCalendar()
 * var param_1 = obj.book(start,end)
 */

/**
  将start，end放入一个数组。arr = [start, end]
  则arr是升序数组。

  每次book(start, end)时。先使用start在arr中查找到需要插入的位置index
  如果index为奇数，表示有冲突。直接返回false
  如果index为偶数，则起始时间不冲突，开始比较时间区间是否有冲突。

  如果index != arr.length。
     则如果arr[index] < end, 则产生冲突。return false
  
  
  此时需要将新的start，end插入arr中。
 
  */
class Tree_Node {
  start: number
  end: number
  left: Tree_Node
  right: Tree_Node

  constructor(start: number, end: number) {
    this.start = start
    this.end = end
    this.left = null
    this.right = null
  }
}
/**
 ## 方法二：自定义二叉搜索树
 每个节点node保存start，end
 node.left.end<=node.start
 node.right.start >= node.end
 
 ## 搜索
 1. 如果end小于等于p.start, 则说明新节点应该在p的左子树上。
       而如果p.left为空，则说明已经到了最小的节点。令p.left = new Tree_Node(start, end)， return true
       否则p = p.left
 2. 如果start 大于等于 p.end， 则说明新节点应该在p的右子树上。
       如果p.right为空，则说明已经到了最大的节点，此时令p.right = new Tree_Node(start, end)， return true
       否则p = p.right
 3. 如果start, end有一个处于p.start和p.end之间。说明有冲突，返回false

 */
class MyCalendar2 {
  root: Tree_Node
  constructor() {
    this.root = null
  }

  book(start: number, end: number): boolean {
    if (this.root === null) {
      this.root = new Tree_Node(start, end)
      return true
    }

    let p = this.root

    while (p !== null) {
      if (end <= p.start) {
        if (p.left === null) {
          // 最左侧节点，可以插入
          p.left = new Tree_Node(start, end)
          return true
        }
        p = p.left
      } else if (start >= p.end) {
        if (p.right === null) {
          p.right = new Tree_Node(start, end)
          return true
        }
        p = p.right
      } else {
        return false
      }
    }
    return false
  }
}

// const m = new MyCalendar2()
// m.book(10, 20)
// m.book(15, 25)
// m.book(20, 30)
