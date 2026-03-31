import type { Step, CellState } from '../types'

type Grid = CellState[][]
type Pos = [number, number]

function posKey(r: number, c: number) {
  return r * 1000 + c
}

function heuristic(r: number, c: number, endR: number, endC: number): number {
  // Manhattan distance
  return Math.abs(r - endR) + Math.abs(c - endC)
}

export function generateAStarSteps(grid: Grid, start: Pos, end: Pos): Step[] {
  const steps: Step[] = []
  const rows = grid.length
  const cols = grid[0].length

  function cloneGrid(g: Grid): Grid {
    return g.map((row) => [...row])
  }

  function setCell(g: Grid, r: number, c: number, state: CellState): Grid {
    const ng = cloneGrid(g)
    ng[r][c] = state
    return ng
  }

  let current = cloneGrid(grid)

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    grid: cloneGrid(current),
    pathNodes: [],
    type: 'initial',
    description: `Grid ready. A* uses heuristic (Manhattan distance) to find the shortest path faster.`,
  })

  const gScore = new Map<number, number>()
  const fScore = new Map<number, number>()
  const prev = new Map<number, number | null>()
  const openSet = new Set<number>()
  const closedSet = new Set<number>()

  const startKey = posKey(start[0], start[1])
  const endKey = posKey(end[0], end[1])

  gScore.set(startKey, 0)
  fScore.set(startKey, heuristic(start[0], start[1], end[0], end[1]))
  prev.set(startKey, null)
  openSet.add(startKey)

  const directions: Pos[] = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  while (openSet.size > 0) {
    // Get node with lowest fScore
    let u: number | null = null
    let uF = Infinity
    for (const key of openSet) {
      const f = fScore.get(key) ?? Infinity
      if (f < uF) {
        uF = f
        u = key
      }
    }

    if (u === null) break

    if (u === endKey) break

    openSet.delete(u)
    closedSet.add(u)

    const ur = Math.floor(u / 1000)
    const uc = u % 1000

    if (current[ur][uc] !== 'start' && current[ur][uc] !== 'end') {
      current = setCell(current, ur, uc, 'current')
    }

    steps.push({
      array: [],
      comparing: [],
      swapping: [],
      sorted: [],
      grid: cloneGrid(current),
      pathNodes: [],
      type: 'visit',
      description: `Visiting (${ur}, ${uc}). g=${gScore.get(u)}, f=${uF}.`,
    })

    if (current[ur][uc] !== 'start' && current[ur][uc] !== 'end') {
      current = setCell(current, ur, uc, 'visited')
    }

    for (const [dr, dc] of directions) {
      const nr = ur + dr
      const nc = uc + dc
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
      if (grid[nr][nc] === 'wall') continue

      const vKey = posKey(nr, nc)
      if (closedSet.has(vKey)) continue

      const tentativeG = (gScore.get(u) ?? Infinity) + 1

      if (tentativeG < (gScore.get(vKey) ?? Infinity)) {
        prev.set(vKey, u)
        gScore.set(vKey, tentativeG)
        fScore.set(vKey, tentativeG + heuristic(nr, nc, end[0], end[1]))

        if (!openSet.has(vKey)) {
          openSet.add(vKey)
          if (current[nr][nc] !== 'start' && current[nr][nc] !== 'end') {
            current = setCell(current, nr, nc, 'queued')
          }

          steps.push({
            array: [],
            comparing: [],
            swapping: [],
            sorted: [],
            grid: cloneGrid(current),
            pathNodes: [],
            type: 'enqueue',
            description: `Added (${nr}, ${nc}) to open set. f=${fScore.get(vKey)}.`,
          })
        }
      }
    }
  }

  // Reconstruct path
  const path: Pos[] = []
  let cur: number | null = endKey
  while (cur !== null) {
    const r = Math.floor(cur / 1000)
    const c = cur % 1000
    path.unshift([r, c])
    cur = prev.get(cur) ?? null
    if (cur === null && path[0][0] !== start[0] || path[0][1] !== start[1]) {
      // No path found
      break
    }
  }

  for (const [r, c] of path) {
    if (current[r][c] !== 'start' && current[r][c] !== 'end') {
      current = setCell(current, r, c, 'path')
    }
  }

  const found =
    path.length > 1 &&
    path[path.length - 1][0] === end[0] &&
    path[path.length - 1][1] === end[1]

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    grid: cloneGrid(current),
    pathNodes: path,
    type: found ? 'done' : 'noPath',
    description: found
      ? `A* found the shortest path! Length: ${path.length - 1} steps.`
      : 'No path exists from start to end.',
  })

  return steps
}
