import { create } from 'zustand'
import type { Step, GraphNode, GraphEdge, CellState } from '../types'
import { algorithms } from '../data/algorithms'
import { generateBubbleSortSteps } from '../algorithms/bubbleSort'
import { generateMergeSortSteps } from '../algorithms/mergeSort'
import { generateQuickSortSteps } from '../algorithms/quickSort'
import { generateInsertionSortSteps } from '../algorithms/insertionSort'
import { generateSelectionSortSteps } from '../algorithms/selectionSort'
import { generateHeapSortSteps } from '../algorithms/heapSort'
import { generateShellSortSteps } from '../algorithms/shellSort'
import { generateLinearSearchSteps } from '../algorithms/linearSearch'
import { generateBinarySearchSteps } from '../algorithms/binarySearch'
import { generateBFSSteps } from '../algorithms/bfs'
import { generateDFSSteps } from '../algorithms/dfs'
import { generateDijkstraSteps } from '../algorithms/dijkstra'
import { generateAStarSteps } from '../algorithms/aStar'
import { generateKMPSteps } from '../algorithms/kmp'
import { generateRabinKarpSteps } from '../algorithms/rabinKarp'

export interface GraphInput {
  nodes: GraphNode[]
  edges: GraphEdge[]
  startId: number
}

export interface GridInput {
  grid: CellState[][]
  start: [number, number]
  end: [number, number]
}

export interface StringInput {
  text: string
  pattern: string
}

interface VisualizerStore {
  // Array-based state
  array: number[]
  arraySize: number
  target: number | null
  // Non-array inputs
  graphInput: GraphInput | null
  gridInput: GridInput | null
  stringInput: StringInput | null
  // Playback
  steps: Step[]
  currentStep: number
  isPlaying: boolean
  speed: number
  focusMode: boolean
  algorithmId: string | null
  // actions
  setArray: (arr: number[]) => void
  setAlgorithm: (id: string) => void
  play: () => void
  pause: () => void
  stepForward: () => void
  stepBack: () => void
  restart: () => void
  setSpeed: (speed: number) => void
  setArraySize: (size: number) => void
  randomize: () => void
  toggleFocusMode: () => void
}

// ─── Generators ──────────────────────────────────────────────────────────────

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

function generateRandomTarget(arr: number[]): number {
  if (Math.random() < 0.7 && arr.length > 0) {
    return arr[Math.floor(Math.random() * arr.length)]
  }
  return Math.floor(Math.random() * 90) + 10
}

function generateRandomGraph(nodeCount = 10): GraphInput {
  const nodes: GraphNode[] = []
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI
    const r = i % 3 === 0 ? 0.28 : 0.42
    nodes.push({
      id: i,
      x: 0.5 + r * Math.cos(angle),
      y: 0.5 + r * Math.sin(angle),
      label: String(i),
    })
  }

  const edges: GraphEdge[] = []
  const edgeSet = new Set<string>()

  function addEdge(a: number, b: number) {
    const key = `${Math.min(a, b)}-${Math.max(a, b)}`
    if (!edgeSet.has(key) && a !== b) {
      edgeSet.add(key)
      edges.push({ from: a, to: b })
    }
  }

  for (let i = 0; i < nodeCount; i++) addEdge(i, (i + 1) % nodeCount)

  const extraCount = Math.floor(nodeCount * 0.6)
  for (let k = 0; k < extraCount; k++) {
    addEdge(
      Math.floor(Math.random() * nodeCount),
      Math.floor(Math.random() * nodeCount)
    )
  }

  return { nodes, edges, startId: 0 }
}

function generateRandomGrid(rows = 15, cols = 20): GridInput {
  const start: [number, number] = [0, 0]
  const end: [number, number] = [rows - 1, cols - 1]
  let grid: CellState[][]

  for (let attempt = 0; attempt < 20; attempt++) {
    grid = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c): CellState => {
        if (r === start[0] && c === start[1]) return 'start'
        if (r === end[0] && c === end[1]) return 'end'
        return Math.random() < 0.28 ? 'wall' : 'empty'
      })
    )

    const visited = new Set<string>()
    const queue: [number, number][] = [start]
    visited.add(`${start[0]},${start[1]}`)
    let found = false
    while (queue.length > 0) {
      const [r, c] = queue.shift()!
      if (r === end[0] && c === end[1]) { found = true; break }
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]] as [number, number][]) {
        const nr = r + dr; const nc = c + dc
        if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue
        if (grid![nr][nc] === 'wall') continue
        const key = `${nr},${nc}`
        if (!visited.has(key)) { visited.add(key); queue.push([nr, nc]) }
      }
    }
    if (found) return { grid: grid!, start, end }
  }

  // Fallback: empty grid
  grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c): CellState => {
      if (r === start[0] && c === start[1]) return 'start'
      if (r === end[0] && c === end[1]) return 'end'
      return 'empty'
    })
  )
  return { grid, start, end }
}

const CHARS = 'abcdefghijklmnopqrstuvwxyz'

function generateRandomStringPair(): StringInput {
  const m = 3 + Math.floor(Math.random() * 3)
  const pattern = Array.from({ length: m }, () => CHARS[Math.floor(Math.random() * 6)]).join('')
  let text = Array.from({ length: 28 }, () => CHARS[Math.floor(Math.random() * 8)]).join('')
  const insertPos = Math.floor(Math.random() * (text.length - m))
  text = text.slice(0, insertPos) + pattern + text.slice(insertPos + m)
  return { text, pattern }
}

function getAlgorithmCategory(id: string): string {
  return algorithms.find((a) => a.id === id)?.category ?? 'sorting'
}

function generateSteps(
  id: string,
  arr: number[],
  target: number | null,
  graphInput: GraphInput | null,
  gridInput: GridInput | null,
  stringInput: StringInput | null
): Step[] {
  switch (id) {
    case 'bubble-sort': return generateBubbleSortSteps(arr)
    case 'merge-sort': return generateMergeSortSteps(arr)
    case 'quick-sort': return generateQuickSortSteps(arr)
    case 'insertion-sort': return generateInsertionSortSteps(arr)
    case 'selection-sort': return generateSelectionSortSteps(arr)
    case 'heap-sort': return generateHeapSortSteps(arr)
    case 'shell-sort': return generateShellSortSteps(arr)
    case 'linear-search': return generateLinearSearchSteps(arr, target ?? arr[0] ?? 42)
    case 'binary-search': return generateBinarySearchSteps(arr, target ?? arr[0] ?? 42)
    case 'bfs': return graphInput ? generateBFSSteps(graphInput.nodes, graphInput.edges, graphInput.startId) : []
    case 'dfs': return graphInput ? generateDFSSteps(graphInput.nodes, graphInput.edges, graphInput.startId) : []
    case 'dijkstra': return gridInput ? generateDijkstraSteps(gridInput.grid, gridInput.start, gridInput.end) : []
    case 'a-star': return gridInput ? generateAStarSteps(gridInput.grid, gridInput.start, gridInput.end) : []
    case 'kmp': return stringInput ? generateKMPSteps(stringInput.text, stringInput.pattern) : []
    case 'rabin-karp': return stringInput ? generateRabinKarpSteps(stringInput.text, stringInput.pattern) : []
    default: return []
  }
}

function buildInputsForAlgorithm(
  id: string,
  existingArray: number[],
  arraySize: number
): {
  array: number[]
  target: number | null
  graphInput: GraphInput | null
  gridInput: GridInput | null
  stringInput: StringInput | null
} {
  const category = getAlgorithmCategory(id)
  switch (category) {
    case 'sorting': {
      const array = generateRandomArray(arraySize)
      return { array, target: null, graphInput: null, gridInput: null, stringInput: null }
    }
    case 'searching': {
      const array = generateRandomArray(arraySize)
      const target = generateRandomTarget(array)
      return { array, target, graphInput: null, gridInput: null, stringInput: null }
    }
    case 'graph': {
      return { array: existingArray, target: null, graphInput: generateRandomGraph(10), gridInput: null, stringInput: null }
    }
    case 'pathfinding': {
      return { array: existingArray, target: null, graphInput: null, gridInput: generateRandomGrid(15, 20), stringInput: null }
    }
    case 'string-matching': {
      return { array: existingArray, target: null, graphInput: null, gridInput: null, stringInput: generateRandomStringPair() }
    }
    default: {
      const array = generateRandomArray(arraySize)
      return { array, target: null, graphInput: null, gridInput: null, stringInput: null }
    }
  }
}

// ─── Store ────────────────────────────────────────────────────────────────────

let playInterval: ReturnType<typeof setInterval> | null = null

export const useVisualizerStore = create<VisualizerStore>((set, get) => ({
  array: generateRandomArray(20),
  arraySize: 20,
  target: null,
  graphInput: null,
  gridInput: null,
  stringInput: null,
  steps: [],
  currentStep: 0,
  isPlaying: false,
  speed: 400,
  focusMode: false,
  algorithmId: null,

  setArray: (arr) => set({ array: arr }),

  setAlgorithm: (id) => {
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    const { arraySize, array } = get()
    const inputs = buildInputsForAlgorithm(id, array, arraySize)
    const steps = generateSteps(id, inputs.array, inputs.target, inputs.graphInput, inputs.gridInput, inputs.stringInput)
    set({ algorithmId: id, ...inputs, steps, currentStep: 0, isPlaying: false })
  },

  play: () => {
    const { steps, currentStep, speed } = get()
    if (currentStep >= steps.length - 1) return
    if (playInterval) clearInterval(playInterval)
    set({ isPlaying: true })
    playInterval = setInterval(() => {
      const state = get()
      if (state.currentStep >= state.steps.length - 1) {
        if (playInterval) { clearInterval(playInterval); playInterval = null }
        set({ isPlaying: false })
        return
      }
      set({ currentStep: state.currentStep + 1 })
    }, speed)
  },

  pause: () => {
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    set({ isPlaying: false })
  },

  stepForward: () => {
    const { currentStep, steps } = get()
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    if (currentStep < steps.length - 1) set({ currentStep: currentStep + 1, isPlaying: false })
  },

  stepBack: () => {
    const { currentStep } = get()
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    if (currentStep > 0) set({ currentStep: currentStep - 1, isPlaying: false })
  },

  restart: () => {
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    set({ currentStep: 0, isPlaying: false })
  },

  setSpeed: (speed) => {
    const wasPlaying = get().isPlaying
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    set({ speed, isPlaying: false })
    if (wasPlaying) setTimeout(() => get().play(), 0)
  },

  setArraySize: (size) => {
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    const { algorithmId } = get()
    const category = algorithmId ? getAlgorithmCategory(algorithmId) : 'sorting'
    if (category !== 'sorting' && category !== 'searching') {
      set({ arraySize: size })
      return
    }
    const array = generateRandomArray(size)
    const target = category === 'searching' ? generateRandomTarget(array) : null
    const steps = algorithmId ? generateSteps(algorithmId, array, target, null, null, null) : []
    set({ arraySize: size, array, target, steps, currentStep: 0, isPlaying: false })
  },

  randomize: () => {
    if (playInterval) { clearInterval(playInterval); playInterval = null }
    const { arraySize, array, algorithmId } = get()
    if (!algorithmId) return
    const inputs = buildInputsForAlgorithm(algorithmId, array, arraySize)
    const steps = generateSteps(algorithmId, inputs.array, inputs.target, inputs.graphInput, inputs.gridInput, inputs.stringInput)
    set({ ...inputs, steps, currentStep: 0, isPlaying: false })
  },

  toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
}))
