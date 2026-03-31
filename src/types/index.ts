export interface Complexity {
  best: string
  average: string
  worst: string
  space: string
}

export interface CommentaryByType {
  [key: string]: string[]
}

export interface Algorithm {
  id: string
  name: string
  nickname: string
  category: string
  description: string
  whenToUse: string
  complexity: Complexity
  pseudocode: string
  commentaryByType: CommentaryByType
}

export interface GraphNode {
  id: number
  x: number // normalized 0–1
  y: number // normalized 0–1
  label: string
}

export interface GraphEdge {
  from: number
  to: number
  weight?: number
}

export type CellState =
  | 'empty'
  | 'wall'
  | 'start'
  | 'end'
  | 'visited'
  | 'queued'
  | 'path'
  | 'current'

export interface Step {
  // Array-based (sorting / searching)
  array: number[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  type: string
  description: string
  // Searching extensions
  found?: number[]
  target?: number
  searchWindow?: [number, number] // binary search [low, high]
  // Graph traversal
  graphNodes?: GraphNode[]
  graphEdges?: GraphEdge[]
  visited?: number[]
  queued?: number[]
  currentNode?: number
  // Pathfinding
  grid?: CellState[][]
  pathNodes?: Array<[number, number]>
  distances?: Record<number, number>
  // String matching
  textIndex?: number
  patternIndex?: number
  matches?: number[]
  hashWindow?: [number, number] // Rabin-Karp rolling window [start, end]
}
