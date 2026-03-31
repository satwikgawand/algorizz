import type { Step } from '../types'

export function generateShellSortSteps(inputArray: number[]): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    type: 'initial',
    description: 'Initial array. Shell sort uses decreasing gap sequences.',
  })

  // Knuth sequence: 1, 4, 13, 40, ...
  let gap = 1
  while (gap < Math.floor(n / 3)) {
    gap = gap * 3 + 1
  }

  while (gap >= 1) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: [],
      type: 'gap',
      description: `Gap = ${gap}. Performing gapped insertion sort.`,
    })

    for (let i = gap; i < n; i++) {
      const temp = arr[i]
      let j = i

      steps.push({
        array: [...arr],
        comparing: [i],
        swapping: [],
        sorted: [],
        type: 'pick',
        description: `Picking arr[${i}]=${temp} to insert with gap ${gap}.`,
      })

      while (j >= gap && arr[j - gap] > temp) {
        steps.push({
          array: [...arr],
          comparing: [j - gap, j],
          swapping: [],
          sorted: [],
          type: 'compare',
          description: `arr[${j - gap}]=${arr[j - gap]} > ${temp}, shifting by gap ${gap}.`,
        })

        arr[j] = arr[j - gap]
        j -= gap

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + gap],
          sorted: [],
          type: 'shift',
          description: `Shifted element to position ${j + gap}.`,
        })
      }

      arr[j] = temp

      if (j !== i) {
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: [],
          type: 'insert',
          description: `Inserted ${temp} at position ${j}.`,
        })
      }
    }

    gap = Math.floor(gap / 3)
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
