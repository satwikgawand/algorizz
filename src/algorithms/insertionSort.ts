import type { Step } from '../types'

export function generateInsertionSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length
  const sorted: number[] = [0]

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    type: 'initial',
    description: 'Initial array. First element is trivially sorted.',
  })

  for (let i = 1; i < n; i++) {
    const key = arr[i]
    let j = i - 1

    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      type: 'pick',
      description: `Picking arr[${i}]=${key} to insert into sorted portion.`,
    })

    while (j >= 0 && arr[j] > key) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: [...sorted],
        type: 'compare',
        description: `arr[${j}]=${arr[j]} > ${key}, shifting right.`,
      })

      arr[j + 1] = arr[j]
      j--

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [j + 1, j + 2],
        sorted: [...sorted],
        type: 'shift',
        description: `Shifted arr[${j + 1}] one position to the right.`,
      })
    }

    arr[j + 1] = key
    sorted.push(i)
    sorted.sort((a, b) => a - b)

    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      type: 'insert',
      description: `Inserted ${key} at position ${j + 1}. Sorted portion is now ${i + 1} elements.`,
    })
  }

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
