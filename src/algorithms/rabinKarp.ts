import type { Step } from '../types'

const BASE = 31
const MOD = 1_000_000_007

export function generateRabinKarpSteps(text: string, pattern: string): Step[] {
  const steps: Step[] = []
  const n = text.length
  const m = pattern.length
  const matches: number[] = []

  if (m > n) {
    steps.push({
      array: [],
      comparing: [],
      swapping: [],
      sorted: [],
      textIndex: 0,
      patternIndex: 0,
      matches: [],
      type: 'done',
      description: 'Pattern is longer than text. No matches possible.',
    })
    return steps
  }

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    textIndex: 0,
    patternIndex: 0,
    matches: [],
    hashWindow: [0, m - 1],
    type: 'initial',
    description: `Rabin-Karp: computing hash for pattern "${pattern}" and initial text window.`,
  })

  // Compute hash of pattern and first window
  let patternHash = 0
  let windowHash = 0
  let highPow = 1

  for (let i = 0; i < m - 1; i++) {
    highPow = (highPow * BASE) % MOD
  }

  for (let i = 0; i < m; i++) {
    patternHash = (patternHash * BASE + pattern.charCodeAt(i)) % MOD
    windowHash = (windowHash * BASE + text.charCodeAt(i)) % MOD
  }

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    textIndex: 0,
    patternIndex: 0,
    matches: [],
    hashWindow: [0, m - 1],
    type: 'hash',
    description: `Pattern hash = ${patternHash}. Initial window hash = ${windowHash}.`,
  })

  for (let i = 0; i <= n - m; i++) {
    steps.push({
      array: [],
      comparing: [],
      swapping: [],
      sorted: [],
      textIndex: i,
      patternIndex: 0,
      matches: [...matches],
      hashWindow: [i, i + m - 1],
      type: 'compare',
      description: `Window [${i}, ${i + m - 1}] hash = ${windowHash}. Pattern hash = ${patternHash}. ${windowHash === patternHash ? 'Hashes match! Verifying...' : 'No match.'}`,
    })

    if (windowHash === patternHash) {
      // Verify character by character
      let match = true
      for (let k = 0; k < m; k++) {
        if (text[i + k] !== pattern[k]) {
          match = false
          break
        }
      }

      if (match) {
        matches.push(i)
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          textIndex: i,
          patternIndex: 0,
          matches: [...matches],
          hashWindow: [i, i + m - 1],
          type: 'match',
          description: `Verified! Match found at index ${i}.`,
        })
      } else {
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          textIndex: i,
          patternIndex: 0,
          matches: [...matches],
          hashWindow: [i, i + m - 1],
          type: 'spurious',
          description: `Hash collision (spurious hit) at index ${i}. Characters don't match.`,
        })
      }
    }

    // Roll hash
    if (i < n - m) {
      windowHash = ((windowHash - text.charCodeAt(i) * highPow % MOD + MOD) * BASE + text.charCodeAt(i + m)) % MOD
      steps.push({
        array: [],
        comparing: [],
        swapping: [],
        sorted: [],
        textIndex: i + 1,
        patternIndex: 0,
        matches: [...matches],
        hashWindow: [i + 1, i + m],
        type: 'roll',
        description: `Rolling hash: removed '${text[i]}', added '${text[i + m]}'. New hash = ${windowHash}.`,
      })
    }
  }

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    textIndex: n,
    patternIndex: 0,
    matches: [...matches],
    type: 'done',
    description:
      matches.length > 0
        ? `Done. Found ${matches.length} match(es) at index(es): ${matches.join(', ')}.`
        : `Done. Pattern not found in text.`,
  })

  return steps
}
