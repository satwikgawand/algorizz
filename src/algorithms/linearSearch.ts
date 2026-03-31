import type { Step } from '../types'

export function generateLinearSearchSteps(inputArray: number[], target: number): Step[] {
  const steps: Step[] = []
  const arr = [...inputArray]
  const n = arr.length

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: [],
    found: [],
    target,
    type: 'initial',
    description: `Searching for ${target} in the array, left to right.`,
  })

  for (let i = 0; i < n; i++) {
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: [],
      sorted: [],
      found: [],
      target,
      type: 'compare',
      description: `Checking arr[${i}]=${arr[i]}. Is it ${target}?`,
    })

    if (arr[i] === target) {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [],
        found: [i],
        target,
        type: 'found',
        description: `Found ${target} at index ${i}!`,
      })
      return steps
    } else {
      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: [i],
        found: [],
        target,
        type: 'miss',
        description: `arr[${i}]=${arr[i]} is not ${target}. Moving on.`,
      })
    }
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, i) => i),
    found: [],
    target,
    type: 'notFound',
    description: `${target} not found in the array. Checked all ${n} elements.`,
  })

  return steps
}
