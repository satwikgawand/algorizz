import type { Step } from '../types'

export function generateMergeSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length
  const finalSorted: number[] = []

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    type: 'initial',
    description: 'Initial array — merge sort will divide and conquer.',
  })

  function merge(
    workArr: number[],
    left: number,
    mid: number,
    right: number,
    sortedSet: Set<number>
  ) {
    const leftArr = workArr.slice(left, mid + 1)
    const rightArr = workArr.slice(mid + 1, right + 1)

    steps.push({
      array: [...workArr],
      comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      swapping: [],
      sorted: [...sortedSet],
      type: 'merge',
      description: `Merging subarrays [${left}..${mid}] and [${mid + 1}..${right}]`,
    })

    let i = 0
    let j = 0
    let k = left

    while (i < leftArr.length && j < rightArr.length) {
      steps.push({
        array: [...workArr],
        comparing: [left + i, mid + 1 + j],
        swapping: [],
        sorted: [...sortedSet],
        type: 'compare',
        description: `Comparing ${leftArr[i]} and ${rightArr[j]}`,
      })

      if (leftArr[i] <= rightArr[j]) {
        workArr[k] = leftArr[i]
        i++
      } else {
        workArr[k] = rightArr[j]
        j++
      }
      k++

      steps.push({
        array: [...workArr],
        comparing: [],
        swapping: [k - 1],
        sorted: [...sortedSet],
        type: 'merge',
        description: `Placed element at position ${k - 1}`,
      })
    }

    while (i < leftArr.length) {
      workArr[k] = leftArr[i]
      i++
      k++
      steps.push({
        array: [...workArr],
        comparing: [],
        swapping: [k - 1],
        sorted: [...sortedSet],
        type: 'merge',
        description: `Copying remaining left element to position ${k - 1}`,
      })
    }

    while (j < rightArr.length) {
      workArr[k] = rightArr[j]
      j++
      k++
      steps.push({
        array: [...workArr],
        comparing: [],
        swapping: [k - 1],
        sorted: [...sortedSet],
        type: 'merge',
        description: `Copying remaining right element to position ${k - 1}`,
      })
    }

    // Mark this range as sorted
    for (let idx = left; idx <= right; idx++) {
      sortedSet.add(idx)
    }
  }

  function mergeSortHelper(workArr: number[], left: number, right: number, sortedSet: Set<number>) {
    if (left >= right) {
      sortedSet.add(left)
      return
    }

    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...workArr],
      comparing: Array.from({ length: right - left + 1 }, (_, i) => left + i),
      swapping: [],
      sorted: [...sortedSet],
      type: 'split',
      description: `Splitting [${left}..${right}] at midpoint ${mid}`,
    })

    mergeSortHelper(workArr, left, mid, sortedSet)
    mergeSortHelper(workArr, mid + 1, right, sortedSet)
    merge(workArr, left, mid, right, sortedSet)
  }

  const sortedSet = new Set<number>()
  mergeSortHelper(arr, 0, n - 1, sortedSet)

  for (let i = 0; i < n; i++) finalSorted.push(i)

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: finalSorted,
    type: 'sorted',
    description: 'Array is fully sorted!',
  })

  return steps
}
