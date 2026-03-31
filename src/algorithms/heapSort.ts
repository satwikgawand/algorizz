import type { Step } from '../types'

export function generateHeapSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length
  const sortedSet = new Set<number>()

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    type: 'initial',
    description: 'Initial array. Building a max-heap first.',
  })

  function heapify(size: number, rootIdx: number) {
    let largest = rootIdx
    const left = 2 * rootIdx + 1
    const right = 2 * rootIdx + 2

    steps.push({
      array: [...arr],
      comparing: [rootIdx, ...(left < size ? [left] : []), ...(right < size ? [right] : [])],
      swapping: [],
      sorted: [...sortedSet],
      type: 'heapify',
      description: `Heapifying subtree rooted at index ${rootIdx}.`,
    })

    if (left < size && arr[left] > arr[largest]) {
      largest = left
    }
    if (right < size && arr[right] > arr[largest]) {
      largest = right
    }

    if (largest !== rootIdx) {
      ;[arr[rootIdx], arr[largest]] = [arr[largest], arr[rootIdx]]
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [rootIdx, largest],
        sorted: [...sortedSet],
        type: 'swap',
        description: `Swapped arr[${rootIdx}]=${arr[rootIdx]} and arr[${largest}]=${arr[largest]} to maintain heap property.`,
      })
      heapify(size, largest)
    }
  }

  // Build max-heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sortedSet],
    type: 'heapBuilt',
    description: 'Max-heap built. Now extracting elements one by one.',
  })

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    ;[arr[0], arr[i]] = [arr[i], arr[0]]
    sortedSet.add(i)

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [0, i],
      sorted: [...sortedSet],
      type: 'extract',
      description: `Moved max element ${arr[i]} to position ${i}. Heap size reduced to ${i}.`,
    })

    heapify(i, 0)
  }

  sortedSet.add(0)
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    type: 'sorted',
    description: 'Array fully sorted.',
  })

  return steps
}
