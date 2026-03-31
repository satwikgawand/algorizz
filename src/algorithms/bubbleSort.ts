import type { Step } from '../types'

export function generateBubbleSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length
  const sorted: number[] = []

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    type: 'initial',
    description: 'Initial array',
  })

  for (let i = 0; i < n - 1; i++) {
    let swapped = false

    for (let j = 0; j < n - i - 1; j++) {
      // Comparing step
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        type: 'compare',
        description: `Comparing arr[${j}]=${arr[j]} and arr[${j + 1}]=${arr[j + 1]}`,
      })

      if (arr[j] > arr[j + 1]) {
        // Swap step
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        swapped = true

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: [...sorted],
          type: 'swap',
          description: `Swapped arr[${j}] and arr[${j + 1}]`,
        })
      } else {
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [...sorted],
          type: 'noSwap',
          description: `No swap needed at positions ${j} and ${j + 1}`,
        })
      }
    }

    // Mark the last element of this pass as sorted
    sorted.unshift(n - 1 - i)

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      type: 'passComplete',
      description: `Pass ${i + 1} complete. Element at position ${n - 1 - i} is now sorted.`,
    })

    if (!swapped) break
  }

  // Mark all remaining as sorted
  for (let k = 0; k < n; k++) {
    if (!sorted.includes(k)) sorted.unshift(k)
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    type: 'sorted',
    description: 'Array is fully sorted!',
  })

  return steps
}
