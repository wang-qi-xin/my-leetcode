/**
207. 课程表
你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。

在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。

例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

 

示例 1：

输入：numCourses = 2, prerequisites = [[1,0]]
输出：true
解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。
示例 2：

输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
输出：false
解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。
 

提示：

1 <= numCourses <= 105
0 <= prerequisites.length <= 5000
prerequisites[i].length == 2
0 <= ai, bi < numCourses
prerequisites[i] 中的所有课程对 互不相同
 */

/**
 * 方法一：深度优先搜索，查看是否存在环。
 * @param numCourses
 * @param prerequisites
 * @returns
 */
function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const edge = new Map<number, number[]>(),
    visited = Array(numCourses).fill(0)
  let valid = false
  for (let i = 0; i < numCourses; i++) edge.set(i, [])
  for (let i = 0; i < prerequisites.length; i++) {
    edge.get(prerequisites[i][1]).push(prerequisites[i][0])
  }

  // visited[i] = 0， 表示未搜索，1表示搜索中，2表示搜索完成。
  const dfs = (n: number) => {
    visited[n] = 1
    for (let i = 0, adj = edge.get(n); i < adj.length; i++) {
      if (visited[adj[i]] === 0) {
        dfs(adj[i])
        if (valid) return
      } else if (visited[adj[i]] === 1) {
        valid = true
        return
      }
    }
    visited[n] = 2
  }
  for (let i = 0; i < numCourses; i++) {
    // 如果节点i尚未搜索，就以i开始深度搜索，并把搜索完成的节点n，visited[n] = 2
    if (visited[i] === 0) {
      dfs(i)
      // 如果一轮深搜过后，valid = true，说明具有环，直接返回false
      if (valid) return false
    }
  }
  return !valid
}

/**
 * 方法二：广度优先搜素（模拟拓扑排序）。
 * @param numCourses
 * @param prerequisites
 * @returns
 */
function canFinish2(numCourses: number, prerequisites: number[][]): boolean {
  /**
   找到所有入度为0的节点。
   将这些节点的相邻节点的入度全部减1.
   如果节点node的入度减一后为0，将node入队。 

   */
  const edge = new Map<number, number[]>(),
    indegree = Array(numCourses).fill(0),
    queue = []
  for (let i = 0; i < numCourses; i++) edge.set(i, [])
  for (let i = 0; i < prerequisites.length; i++) {
    edge.get(prerequisites[i][1]).push(prerequisites[i][0])
    indegree[prerequisites[i][0]]++
  }

  for (let i = 0; i < numCourses; i++) {
    if (indegree[i] === 0) queue.push(i)
  }

  let n = 0
  while (queue.length) {
    const node = queue.pop()
    n++
    for (let i = 0, adj = edge.get(node); i < adj.length; i++) {
      indegree[adj[i]]--
      if (indegree[adj[i]] === 0) {
        queue.push(adj[i])
      }
    }
  }

  return n === numCourses
}
