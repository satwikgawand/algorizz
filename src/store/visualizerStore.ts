import { create } from 'zustand'
import type { Step } from '../types'
import { generateBubbleSortSteps } from '../algorithms/bubbleSort'
import { generateMergeSortSteps } from '../algorithms/mergeSort'
import { generateQuickSortSteps } from '../algorithms/quickSort'

interface VisualizerStore {
  array: number[]
  steps: Step[]
  currentStep: number
  isPlaying: boolean
  speed: number
  arraySize: number
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

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

function generateSteps(id: string, arr: number[]): Step[] {
  switch (id) {
    case 'bubble-sort':
      return generateBubbleSortSteps(arr)
    case 'merge-sort':
      return generateMergeSortSteps(arr)
    case 'quick-sort':
      return generateQuickSortSteps(arr)
    default:
      return []
  }
}

let playInterval: ReturnType<typeof setInterval> | null = null

export const useVisualizerStore = create<VisualizerStore>((set, get) => ({
  array: generateRandomArray(20),
  steps: [],
  currentStep: 0,
  isPlaying: false,
  speed: 400,
  arraySize: 20,
  focusMode: false,
  algorithmId: null,

  setArray: (arr) => set({ array: arr }),

  setAlgorithm: (id) => {
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    const arr = generateRandomArray(get().arraySize)
    const steps = generateSteps(id, arr)
    set({
      algorithmId: id,
      array: arr,
      steps,
      currentStep: 0,
      isPlaying: false,
    })
  },

  play: () => {
    const { steps, currentStep, speed } = get()
    if (currentStep >= steps.length - 1) return

    if (playInterval) {
      clearInterval(playInterval)
    }

    set({ isPlaying: true })

    playInterval = setInterval(() => {
      const state = get()
      if (state.currentStep >= state.steps.length - 1) {
        if (playInterval) {
          clearInterval(playInterval)
          playInterval = null
        }
        set({ isPlaying: false })
        return
      }
      set({ currentStep: state.currentStep + 1 })
    }, speed)
  },

  pause: () => {
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    set({ isPlaying: false })
  },

  stepForward: () => {
    const { currentStep, steps } = get()
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    if (currentStep < steps.length - 1) {
      set({ currentStep: currentStep + 1, isPlaying: false })
    }
  },

  stepBack: () => {
    const { currentStep } = get()
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    if (currentStep > 0) {
      set({ currentStep: currentStep - 1, isPlaying: false })
    }
  },

  restart: () => {
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    set({ currentStep: 0, isPlaying: false })
  },

  setSpeed: (speed) => {
    const wasPlaying = get().isPlaying
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    set({ speed, isPlaying: false })
    if (wasPlaying) {
      // restart play with new speed
      setTimeout(() => get().play(), 0)
    }
  },

  setArraySize: (size) => {
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    const { algorithmId } = get()
    const arr = generateRandomArray(size)
    const steps = algorithmId ? generateSteps(algorithmId, arr) : []
    set({
      arraySize: size,
      array: arr,
      steps,
      currentStep: 0,
      isPlaying: false,
    })
  },

  randomize: () => {
    if (playInterval) {
      clearInterval(playInterval)
      playInterval = null
    }
    const { arraySize, algorithmId } = get()
    const arr = generateRandomArray(arraySize)
    const steps = algorithmId ? generateSteps(algorithmId, arr) : []
    set({
      array: arr,
      steps,
      currentStep: 0,
      isPlaying: false,
    })
  },

  toggleFocusMode: () => set((state) => ({ focusMode: !state.focusMode })),
}))
