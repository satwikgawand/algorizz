import type { Step } from '../types'

function buildFailureTable(pattern: string): number[] {
  const table = new Array(pattern.length).fill(0)
  let len = 0
  let i = 1
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len++
      table[i] = len
      i++
    } else if (len > 0) {
      len = table[len - 1]
    } else {
      table[i] = 0
      i++
    }
  }
  return table
}

export function generateKMPSteps(text: string, pattern: string): Step[] {
  const steps: Step[] = []
  const matches: number[] = []

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    textIndex: 0,
    patternIndex: 0,
    matches: [],
    type: 'initial',
    description: `KMP: preprocessing pattern "${pattern}" to build failure table.`,
  })

  const table = buildFailureTable(pattern)

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    textIndex: 0,
    patternIndex: 0,
    matches: [],
    type: 'tableBuilt',
    description: `Failure table: [${table.join(', ')}]. Now searching in text.`,
  })

  let i = 0 // text index
  let j = 0 // pattern index

  while (i < text.length) {
    steps.push({
      array: [],
      comparing: [],
      swapping: [],
      sorted: [],
      textIndex: i,
      patternIndex: j,
      matches: [...matches],
      type: 'compare',
      description: `Comparing text[${i}]='${text[i]}' with pattern[${j}]='${pattern[j]}'.`,
    })

    if (text[i] === pattern[j]) {
      i++
      j++

      if (j === pattern.length) {
        const matchStart = i - j
        matches.push(matchStart)
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          textIndex: i - 1,
          patternIndex: j - 1,
          matches: [...matches],
          type: 'match',
          description: `Match found at index ${matchStart}! Using failure table to shift.`,
        })
        j = table[j - 1]
      }
    } else {
      if (j > 0) {
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          textIndex: i,
          patternIndex: j,
          matches: [...matches],
          type: 'mismatch',
          description: `Mismatch. Using failure table: shifting pattern to j=${table[j - 1]}.`,
        })
        j = table[j - 1]
      } else {
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          textIndex: i,
          patternIndex: 0,
          matches: [...matches],
          type: 'mismatch',
          description: `Mismatch at j=0. Advancing text index.`,
        })
        i++
      }
    }
  }

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    textIndex: text.length,
    patternIndex: 0,
    matches: [...matches],
    type: 'done',
    description:
      matches.length > 0
        ? `Done. Found ${matches.length} match(es) at position(s): ${matches.join(', ')}.`
        : `Done. Pattern not found in text.`,
  })

  return steps
}
