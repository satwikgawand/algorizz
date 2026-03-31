import { useEffect, useRef } from 'react'
import type { Step, CellState } from '../types'

interface GridCanvasProps {
  steps: Step[]
  currentStep: number
}

const CELL_COLORS: Record<CellState, string> = {
  empty: '#141414',
  wall: '#3a3a3a',
  start: '#fbbf24',
  end: '#c084fc',
  visited: '#1a6628',
  queued: '#004d15',
  path: '#00ff41',
  current: '#ffffff',
}

export default function GridCanvas({ steps, currentStep }: GridCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const step: Step | undefined = steps[currentStep]
    if (!step || !step.grid) return

    const grid = step.grid
    const rows = grid.length
    const cols = grid[0].length

    const W = canvas.width
    const H = canvas.height

    const cellW = W / cols
    const cellH = H / rows
    const cellSize = Math.min(cellW, cellH)
    const offsetX = (W - cellSize * cols) / 2
    const offsetY = (H - cellSize * rows) / 2
    const gap = Math.max(1, cellSize * 0.05)

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = '#0d0d0d'
    ctx.fillRect(0, 0, W, H)

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const state = grid[r][c]
        const x = offsetX + c * cellSize + gap / 2
        const y = offsetY + r * cellSize + gap / 2
        const w = cellSize - gap
        const h = cellSize - gap

        ctx.fillStyle = CELL_COLORS[state] ?? '#141414'

        if (state === 'current' || state === 'path') {
          ctx.shadowColor = ctx.fillStyle
          ctx.shadowBlur = 6
        } else {
          ctx.shadowBlur = 0
        }

        ctx.fillRect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h))
        ctx.shadowBlur = 0
      }
    }

    // Step label
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
