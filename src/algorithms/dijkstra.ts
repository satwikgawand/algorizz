import type { Step, CellState } from '../types'

type Grid = CellState[][]
type Pos = [number, number]

function posKey(r: number, c: number) {
  return r * 1000 + c
}

export function generateDijkstraSteps(
  grid: Grid,
  start: Pos,
  end: Pos
): Step[] {
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
    description: `Grid ready. Finding shortest path from start to end using Dijkstra's.`,
  })

  const dist = new Map<number, number>()
  const prev = new Map<number, number | null>()
  const unvisited = new Set<number>()

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] !== 'wall') {
        const key = posKey(r, c)
        dist.set(key, Infinity)
        prev.set(key, null)
        unvisited.add(key)
      }
    }
  }

  const startKey = posKey(start[0], start[1])
  dist.set(startKey, 0)

  const directions: Pos[] = [[-1, 0], [1, 0], [0, -1], [0, 1]]

  while (unvisited.size > 0) {
    // Find unvisited node with smallest distance
    let u: number | null = null
    let uDist = Infinity
    for (const key of unvisited) {
      const d = dist.get(key) ?? Infinity
      if (d < uDist) {
        uDist = d
        u = key
      }
    }

    if (u === null || uDist === Infinity) break

    const ur = Math.floor(u / 1000)
    const uc = u % 1000

    unvisited.delete(u)

    const endKey = posKey(end[0], end[1])
    if (u === endKey) break

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
      description: `Visiting (${ur}, ${uc}) with distance ${uDist}.`,
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
      if (!unvisited.has(vKey)) continue

      const alt = uDist + 1
      if (alt < (dist.get(vKey) ?? Infinity)) {
        dist.set(vKey, alt)
        prev.set(vKey, u)

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
          type: 'relax',
          description: `Updated distance of (${nr}, ${nc}) to ${alt}.`,
        })
      }
    }
  }

  // Reconstruct path
  const path: Pos[] = []
  let cur: number | null = posKey(end[0], end[1])
  while (cur !== null) {
    const r = Math.floor(cur / 1000)
    const c = cur % 1000
    path.unshift([r, c])
    cur = prev.get(cur) ?? null
  }

  // Draw path on grid
  for (const [r, c] of path) {
    if (current[r][c] !== 'start' && current[r][c] !== 'end') {
      current = setCell(current, r, c, 'path')
    }
  }

  const found = path.length > 1 && path[path.length - 1][0] === end[0] && path[path.length - 1][1] === end[1]

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    grid: cloneGrid(current),
    pathNodes: path,
    type: found ? 'done' : 'noPath',
    description: found
      ? `Shortest path found! Length: ${path.length - 1} steps.`
      : 'No path exists from start to end.',
  })

  return steps
}
