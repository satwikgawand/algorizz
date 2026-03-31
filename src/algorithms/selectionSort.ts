import type { Step } from '../types'

export function generateSelectionSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length
  const sorted: number[] = []

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    type: 'initial',
    description: 'Initial array.',
  })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i

    steps.push({
      array: [...arr],
      comparing: [minIdx],
      swapping: [],
      sorted: [...sorted],
      type: 'minStart',
      description: `Starting pass ${i + 1}. Assuming arr[${i}]=${arr[i]} is the minimum.`,
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        type: 'compare',
        description: `Comparing current min arr[${minIdx}]=${arr[minIdx]} with arr[${j}]=${arr[j]}.`,
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j
        steps.push({
          array: [...arr],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sorted],
          type: 'newMin',
          description: `New minimum found: arr[${minIdx}]=${arr[minIdx]}.`,
        })
      }
    }

    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        type: 'swap',
        description: `Swapped arr[${i}] and arr[${minIdx}]. Minimum placed at position ${i}.`,
      })
    }

    sorted.push(i)
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      type: 'placed',
      description: `Position ${i} is finalized. arr[${i}]=${arr[i]} is in its correct place.`,
    })
  }

  sorted.push(n - 1)
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
