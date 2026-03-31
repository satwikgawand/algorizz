import type { Step, GraphNode, GraphEdge } from '../types'

export function generateDFSSteps(
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
  const stack: number[] = [startId]

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
    description: `Starting DFS from node ${startId}. Pushing start node onto stack.`,
  })

  while (stack.length > 0) {
    const current = stack.pop()!

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
      queued: [...stack],
      currentNode: current,
      type: 'visit',
      description: `Visiting node ${current}. Stack: [${stack.join(', ')}].`,
    })

    const neighbors = (adj.get(current) ?? []).slice().reverse()
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        stack.push(neighbor)
        steps.push({
          array: [],
          comparing: [],
          swapping: [],
          sorted: [],
          graphNodes: nodes,
          graphEdges: edges,
          visited: [...visited],
          queued: [...stack],
          currentNode: current,
          type: 'push',
          description: `Pushing neighbor ${neighbor} onto stack. Stack: [${stack.join(', ')}].`,
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
    description: `DFS complete. Visited ${visited.length} nodes in order: ${visited.join(' → ')}.`,
  })

  return steps
}
