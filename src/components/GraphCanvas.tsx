import { useEffect, useRef } from 'react'
import type { Step } from '../types'

interface GraphCanvasProps {
  steps: Step[]
  currentStep: number
}

const COLORS = {
  background: '#0d0d0d',
  nodeDefault: '#00ff41',
  nodeVisited: '#1a6628',
  nodeQueued: '#c084fc',
  nodeCurrent: '#fbbf24',
  nodeText: '#0d0d0d',
  edge: '#333333',
  edgeActive: '#555555',
}

export default function GraphCanvas({ steps, currentStep }: GraphCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const step: Step | undefined = steps[currentStep]
    if (!step || !step.graphNodes || !step.graphEdges) return

    const { graphNodes: nodes, graphEdges: edges, visited = [], queued = [], currentNode } = step

    const W = canvas.width
    const H = canvas.height
    const padding = 40
    const radius = Math.max(14, Math.min(22, W / (nodes.length * 3)))

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = COLORS.background
    ctx.fillRect(0, 0, W, H)

    // Helper to get pixel coords
    function nodePos(node: { x: number; y: number }) {
      return {
        px: padding + node.x * (W - 2 * padding),
        py: padding + node.y * (H - 2 * padding),
      }
    }

    // Draw edges
    for (const edge of edges) {
      const from = nodes.find((n) => n.id === edge.from)
      const to = nodes.find((n) => n.id === edge.to)
      if (!from || !to) continue

      const fp = nodePos(from)
      const tp = nodePos(to)

      ctx.beginPath()
      ctx.moveTo(fp.px, fp.py)
      ctx.lineTo(tp.px, tp.py)
      ctx.strokeStyle = COLORS.edge
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw nodes
    for (const node of nodes) {
      const { px, py } = nodePos(node)

      let fillColor = COLORS.nodeDefault
      if (visited.includes(node.id)) fillColor = COLORS.nodeVisited
      if (queued.includes(node.id)) fillColor = COLORS.nodeQueued
      if (node.id === currentNode) fillColor = COLORS.nodeCurrent

      // Glow for active node
      if (node.id === currentNode) {
        ctx.shadowColor = COLORS.nodeCurrent
        ctx.shadowBlur = 14
      } else {
        ctx.shadowBlur = 0
      }

      ctx.beginPath()
      ctx.arc(px, py, radius, 0, Math.PI * 2)
      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.shadowBlur = 0

      // Label
      ctx.font = `bold ${Math.max(10, radius - 4)}px JetBrains Mono, monospace`
      ctx.fillStyle = COLORS.nodeText
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.label, px, py)
    }

    // Step type label
    ctx.font = '10px JetBrains Mono, monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    if (step.type !== 'initial') {
      ctx.fillText(step.type.toUpperCase(), 8, 8)
    }
  }, [steps, currentStep])

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const observer = new ResizeObserver(() => {
      const w = container.clientWidth
      if (w > 0) canvas.width = w
    })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full rounded"
        style={{ display: 'block' }}
      />
    </div>
  )
}
