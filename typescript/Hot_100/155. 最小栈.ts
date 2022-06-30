/**
155. 最小栈
设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

实现 MinStack 类:

MinStack() 初始化堆栈对象。
void push(int val) 将元素val推入堆栈。
void pop() 删除堆栈顶部的元素。
int top() 获取堆栈顶部的元素。
int getMin() 获取堆栈中的最小元素。
 

示例 1:

输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
 

提示：

-231 <= val <= 231 - 1
pop、top 和 getMin 操作总是在 非空栈 上调用
push, pop, top, and getMin最多被调用 3 * 104 次
 */

class MinStack {
  stack: number[]
  min: number
  constructor() {
    this.stack = []
    this.min = 0
  }

  push(val: number): void {
    if (this.stack.length === 0) {
      this.stack.push(0)
      this.min = val
    } else {
      const diff = val - this.min
      this.stack.push(diff)
      if (diff < 0) {
        // 说明val比当前的最小值还小
        this.min = val
      }
    }
  }

  pop(): void {
    const top = this.stack.pop()
    if (top < 0) {
      // 如果top < 0，说明在给stack插入该top时，修改了this.min
      // 假设原先的oldMin, val - oldMin = top, 而this.min 又等于val
      // 所以oldMin = val - top = this.min - top
      this.min = this.min - top
    }
  }

  top(): number {
    const t = this.peek()
    if (t < 0) {
      // 向stack里放入差值时，如果差值小于0，则会令min = 原始值val
      return this.min
    } else {
      return this.min + t
    }
  }

  getMin(): number {
    return this.min
  }

  peek(): number {
    return this.stack[this.stack.length - 1]
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */
