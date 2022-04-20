import { Heap, ListNode } from './struct'

/**
 * 剑指 Offer II 078. 合并排序链表（困难）
  [[1,4,5],[1,3,4],[2,6]]
输出：[1,1,2,3,4,4,5,6]

 k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
lists[i] 按 升序 排列
lists[i].length 的总和不超过 10^4

 * @param lists 
 */
function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
  const compareFn = (a: ListNode, b: ListNode): number => {
    return a.val - b.val
  }
  lists = lists.filter(list => list != null)
  const minHeap = new Heap<ListNode>({ data: lists, mode: 'little', compareFn: compareFn })
  /**
   * 1. 将lists中的每条链表的头节点入最小堆
     2. 定义一个head， p指向heap
     3. 从heap中拿出一个最小节点node，现将其next入堆
     4. 将node 链接到p后面，p = p.next
   */

  const head = new ListNode(-1)
  let p = head;
  while(minHeap.size()){
    const node = minHeap.pop()
    if(node.next){
      minHeap.insert(node.next)
    }
    p.next = node;
    p = p.next
  }
  return head.next;
}

/**
 * 测试合并k有序链表
 */
const testmergeKLists = () => {
  // const l = [[1,4,5],[1,3,4],[2,6]]
  const l = [[-8,-7,-7,-5,1,1,3,4],[-2],[-10,-10,-7,0,1,3],[2]]
  // const l = [[]]
  const list = l.map(a => {
    let head = new ListNode(a[0])
    let p = head
    for(let i = 1; i < a.length; i++){
      p.next = new ListNode(a[i])
      p = p.next
    }
    return head
  })
  let sortList = mergeKLists(list)
  while(sortList){
    console.log(sortList.val)
    sortList = sortList.next
  }
}
// testmergeKLists()