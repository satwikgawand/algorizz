import type { Algorithm } from '../types'

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    nickname: "The Himbo",
    category: "sorting",
    description: "Repeatedly steps through the list, compares adjacent elements and swaps them if they're in the wrong order. Keeps going until nothing swaps. It means well.",
    whenToUse: "almost never in production. great for learning though. that's literally it.",
    complexity: { best: "O(n)", average: "O(n²)", worst: "O(n²)", space: "O(1)" },
    pseudocode: `for i in range(n):\n  for j in range(n - i - 1):\n    if arr[j] > arr[j+1]:\n      swap(arr[j], arr[j+1])`,
    commentaryByType: {
      compare: [
        "comparing these two like they're auditioning for something. neither is going to make it.",
        "holding these up side by side. very scientific.",
        "yes we're comparing again. this is the job.",
        "they are not in order. this is a problem we will solve slowly.",
        "another comparison. another chance to feel nothing.",
      ],
      swap: [
        "found two things out of order. swapping. no drama. just vibes.",
        "the swap happens. the crowd does not go wild.",
        "relocating. it's fine. everything is fine.",
        "moved the bigger one forward. tiny win.",
      ],
      noSwap: [
        "these two are fine actually. moving on.",
        "no swap needed. rare moment of peace.",
        "already in order. we love to see it.",
      ],
      sorted: [
        "done. it took a while. we don't talk about how long.",
        "fully sorted. bubble sort has left the chat.",
        "and that's the whole algorithm. hope you learned something.",
      ],
      passComplete: [
        "one full pass completed. doing it again.",
        "another lap around the array. training arc.",
        "pass complete. the largest element has floated to its final resting place.",
      ],
    },
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    nickname: "The Therapist",
    category: "sorting",
    description: "Divides the array in half, recursively sorts each half, then merges them back together in order. Methodical. Has a plan. Trusts the process.",
    whenToUse: "when you need guaranteed O(n log n) and stability matters. linked lists love this one.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)", space: "O(n)" },
    pseudocode: `function mergeSort(arr):\n  if len(arr) <= 1: return arr\n  mid = len(arr) // 2\n  left = mergeSort(arr[:mid])\n  right = mergeSort(arr[mid:])\n  return merge(left, right)`,
    commentaryByType: {
      split: [
        "dividing the array in half. unbothered. methodical.",
        "splitting again. this is not avoidance, this is strategy.",
        "another split. the recursion goes deeper.",
        "broke it down to its smallest parts. now the real work starts.",
      ],
      merge: [
        "merging two sorted halves. this is the part that actually does the work.",
        "carefully placing each element in order. no rushing.",
        "comparing the fronts of both halves like a very calm referee.",
        "the merge continues. every element gets placed exactly once.",
      ],
      compare: [
        "which of these two goes first. easy question. we will answer it calmly.",
        "comparing across the divide. this is fine.",
        "one of these is smaller. one of these knows it.",
      ],
      sorted: [
        "fully merged and sorted. the therapist has done its work.",
        "every element in its place. this is what preparation looks like.",
        "merge sort has no regrets. O(n log n) guaranteed. goodnight.",
      ],
    },
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    nickname: "HIM",
    category: "sorting",
    description: "Picks a pivot, partitions everything smaller to the left and larger to the right, then recursively does the same to each side. Fast. Confident. Occasionally reckless.",
    whenToUse: "almost everywhere in practice. cache-friendly, in-place, fast on average. the default choice for a reason.",
    complexity: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)", space: "O(log n)" },
    pseudocode: `function quickSort(arr, low, high):\n  if low < high:\n    pivot = partition(arr, low, high)\n    quickSort(arr, low, pivot - 1)\n    quickSort(arr, pivot + 1, high)`,
    commentaryByType: {
      pivot: [
        "choosing a pivot. confident. maybe overconfident. we'll see.",
        "this element has been selected as the pivot. it didn't ask for this.",
        "pivot chosen. everything else must now be judged relative to it.",
      ],
      partition: [
        "partitioning around the pivot. smaller left, larger right. no exceptions.",
        "elements are getting sorted into their appropriate sides. quick sort has opinions.",
        "the partition wall moves. elements comply.",
        "comparing to the pivot. you are either smaller or you are not. there is no in between.",
      ],
      swap: [
        "swapping these two. the pivot demands it.",
        "out of position. relocated. done.",
        "the swap is swift and merciless.",
      ],
      recurse: [
        "now doing it again on the left half. recursion has entered.",
        "right side's turn. same energy.",
        "going deeper. quick sort doesn't stop until it's right.",
      ],
      sorted: [
        "done. that's why they call him HIM.",
        "fully sorted. average O(n log n). the pivot chose correctly.",
        "quick sort has finished and it was fast and it knows it.",
      ],
    },
  },
]
