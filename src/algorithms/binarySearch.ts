import type { Step } from '../types'

export function generateBinarySearchSteps(inputArray: number[], target: number): Step[] {
  const steps: Step[] = []
  // Binary search requires a sorted array
  const arr = [...inputArray].sort((a, b) => a - b)
  const n = arr.length

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    found: [],
    target,
    searchWindow: [0, n - 1],
    type: 'initial',
    description: `Array is sorted. Searching for ${target} using binary search.`,
  })

  let low = 0
  let high = n - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    steps.push({
      array: [...arr],
      comparing: [mid],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i),
      found: [],
      target,
      searchWindow: [low, high],
      type: 'mid',
      description: `Window [${low}, ${high}]. Checking midpoint arr[${mid}]=${arr[mid]}.`,
    })

    if (arr[mid] === target) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        found: [mid],
        target,
        searchWindow: [mid, mid],
        type: 'found',
        description: `Found ${target} at index ${mid}!`,
      })
      return steps
    } else if (arr[mid] < target) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        found: [],
        target,
        searchWindow: [mid + 1, high],
        type: 'goRight',
        description: `arr[${mid}]=${arr[mid]} < ${target}. Discarding left half. New window: [${mid + 1}, ${high}].`,
      })
      low = mid + 1
    } else {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, i) => i),
        found: [],
        target,
        searchWindow: [low, mid - 1],
        type: 'goLeft',
        description: `arr[${mid}]=${arr[mid]} > ${target}. Discarding right half. New window: [${low}, ${mid - 1}].`,
      })
      high = mid - 1
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    found: [],
    target,
    searchWindow: [0, -1],
    type: 'notFound',
    description: `${target} not found. Search window exhausted.`,
  })

  return steps
}
