export interface Complexity {
  best: string
  average: string
  worst: string
  space: string
}

export interface CommentaryByType {
  [key: string]: string[]
}

export interface Algorithm {
  id: string
  name: string
  nickname: string
  category: string
  description: string
  whenToUse: string
  complexity: Complexity
  pseudocode: string
  commentaryByType: CommentaryByType
}

export interface Step {
  array: number[]
  comparing: number[]
  swapping: number[]
  sorted: number[]
  type: string
  description: string
}
