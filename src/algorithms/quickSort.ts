import type { Step } from '../types'

export function generateQuickSortSteps(inputArray: number[]): Step[] {
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
    description: 'Initial array — quick sort picks a pivot and partitions.',
  })

  function partition(workArr: number[], low: number, high: number): number {
    const pivotVal = workArr[high]

    // Highlight pivot selection
    steps.push({
      array: [...workArr],
      comparing: [high],
      swapping: [],
      sorted: [...sortedSet],
      type: 'pivot',
      description: `Pivot selected: ${pivotVal} at index ${high}`,
    })

    let i = low - 1

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...workArr],
        comparing: [j, high],
        swapping: [],
        sorted: [...sortedSet],
        type: 'partition',
        description: `Comparing arr[${j}]=${workArr[j]} with pivot=${pivotVal}`,
      })

      if (workArr[j] <= pivotVal) {
        i++
        if (i !== j) {
          ;[workArr[i], workArr[j]] = [workArr[j], workArr[i]]
          steps.push({
            array: [...workArr],
            comparing: [],
            swapping: [i, j],
            sorted: [...sortedSet],
            type: 'swap',
            description: `Swapped arr[${i}]=${workArr[i]} and arr[${j}]=${workArr[j]}`,
          })
        }
      }
    }

    // Place pivot in final position
    const pivotIdx = i + 1
    if (pivotIdx !== high) {
      ;[workArr[pivotIdx], workArr[high]] = [workArr[high], workArr[pivotIdx]]
      steps.push({
        array: [...workArr],
        comparing: [],
        swapping: [pivotIdx, high],
        sorted: [...sortedSet],
        type: 'swap',
        description: `Placed pivot ${pivotVal} at its final position ${pivotIdx}`,
      })
    }

    sortedSet.add(pivotIdx)

    steps.push({
      array: [...workArr],
      comparing: [],
      swapping: [],
      sorted: [...sortedSet],
      type: 'recurse',
      description: `Pivot ${pivotVal} is now in its final position at index ${pivotIdx}`,
    })

    return pivotIdx
  }

  function quickSortHelper(workArr: number[], low: number, high: number) {
    if (low >= high) {
      if (low === high) {
        sortedSet.add(low)
      }
      return
    }

    const pivotIdx = partition(workArr, low, high)
    quickSortHelper(workArr, low, pivotIdx - 1)
    quickSortHelper(workArr, pivotIdx + 1, high)
  }

  quickSortHelper(arr, 0, n - 1)

  const allSorted = Array.from({ length: n }, (_, i) => i)

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: allSorted,
    type: 'sorted',
    description: 'Array is fully sorted!',
  })

  return steps
}
