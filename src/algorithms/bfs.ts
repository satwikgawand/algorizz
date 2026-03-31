import type { Step, GraphNode, GraphEdge } from '../types'

export function generateBFSSteps(
  nodes: GraphNode[],
  edges: GraphEdge[],
  startId: number
): Step[] {
  const steps: Step[] = []

  const adj = new Map<number, number[]>()
  for (const node of nodes) adj.set(node.id, [])
  for (const edge of edges) {
    adj.get(edge.from)!.push(edge.to)
    adj.get(edge.to)!.push(edge.from)
  }

  const visited: number[] = []
  const queue: number[] = [startId]

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    graphNodes: nodes,
    graphEdges: edges,
    visited: [],
    queued: [startId],
    currentNode: undefined,
    type: 'initial',
    description: `Starting BFS from node ${startId}. Enqueuing start node.`,
  })

  while (queue.length > 0) {
    const current = queue.shift()!

    if (visited.includes(current)) continue

    visited.push(current)

    steps.push({
      array: [],
      comparing: [],
      swapping: [],
      sorted: [],
      graphNodes: nodes,
      graphEdges: edges,
      visited: [...visited],
      queued: [...queue],
      currentNode: current,
      type: 'visit',
      description: `Visiting node ${current}. Queue: [${queue.join(', ')}].`,
    })

    const neighbors = adj.get(current) ?? []
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor) && !queue.includes(neighbor)) {
        queue.push(neighbor)
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          graphNodes: nodes,
          graphEdges: edges,
          visited: [...visited],
          queued: [...queue],
          currentNode: current,
          type: 'enqueue',
          description: `Enqueuing neighbor ${neighbor}. Queue: [${queue.join(', ')}].`,
        })
      }
    }
  }

  steps.push({
    array: [],
    comparing: [],
    swapping: [],
    sorted: [],
    graphNodes: nodes,
    graphEdges: edges,
    visited: [...visited],
    queued: [],
    currentNode: undefined,
    type: 'done',
    description: `BFS complete. Visited ${visited.length} nodes in order: ${visited.join(' → ')}.`,
  })

  return steps
}
