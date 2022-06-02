/**
 * 684. 冗余连接
 (并查集+是否有环)
 * @param edges 
 * @returns 
 */
function findRedundantConnection(edges: number[][]): number[] {
  /**
    1. 遍历所有的边，如果某条边的顶点a,b，属于同一个集合，说明ab构成一个环。
    2. 否则，将该条边也加入集合。 
    */
  const f: number[] = []
  const findF = (x: number) => {
    while (x !== f[x]) x = findF(f[x])
    return x
  }

  for (let i = 0; i < edges.length + 1; i++) {
    f[i] = i
  }
  let res = []
  for (let i = 0; i < edges.length; i++) {
    let a = edges[i][0]
    let b = edges[i][1]

    let fa = findF(a)

    let fb = findF(b)

    if (fa !== fb) {
      f[fa] = fb
    } else {
      res.push(a, b)
    }
  }

  return res
}
