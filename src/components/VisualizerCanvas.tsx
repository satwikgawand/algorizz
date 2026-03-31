import { useEffect, useRef } from 'react'
import type { Step } from '../types'

interface VisualizerCanvasProps {
  steps: Step[]
  currentStep: number
  arraySize: number
}

const COLORS = {
  default: '#00ff41',
  comparing: '#fbbf24',
  swapping: '#c084fc',
  sorted: '#1a6628',
  background: '#0d0d0d',
  barBorder: '#1a1a1a',
}

export default function VisualizerCanvas({ steps, currentStep }: VisualizerCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const step: Step | undefined = steps[currentStep]
    if (!step) return

    const { array, comparing, swapping, sorted } = step
    const n = array.length

    const W = canvas.width
    const H = canvas.height
    const padding = { top: 20, bottom: 10, left: 4, right: 4 }

    const maxVal = Math.max(...array, 1)
    const barAreaW = W - padding.left - padding.right
    const barAreaH = H - padding.top - padding.bottom
    const barW = barAreaW / n
    const gap = Math.max(1, barW * 0.08)

    ctx.clearRect(0, 0, W, H)

    // Background
    ctx.fillStyle = COLORS.background
    ctx.fillRect(0, 0, W, H)

    // Draw a subtle grid line at midpoint
    ctx.strokeStyle = 'rgba(255,255,255,0.03)'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(0, padding.top + barAreaH / 2)
    ctx.lineTo(W, padding.top + barAreaH / 2)
    ctx.stroke()

    const sortedSet = new Set(sorted)
    const comparingSet = new Set(comparing)
    const swappingSet = new Set(swapping)

    array.forEach((val, i) => {
      const x = padding.left + i * barW + gap / 2
      const barH = (val / maxVal) * barAreaH
      const y = padding.top + barAreaH - barH
      const w = barW - gap

      let color = COLORS.default

      if (sortedSet.has(i)) {
        color = COLORS.sorted
      }
      if (comparingSet.has(i)) {
        color = COLORS.comparing
      }
      if (swappingSet.has(i)) {
        color = COLORS.swapping
      }

      // Bar shadow/glow
      if (comparingSet.has(i) || swappingSet.has(i)) {
        ctx.shadowColor = color
        ctx.shadowBlur = 8
      } else {
        ctx.shadowBlur = 0
      }

      ctx.fillStyle = color
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.max(1, Math.floor(w)), Math.ceil(barH))

      ctx.shadowBlur = 0

      // Top cap highlight
      ctx.fillStyle = 'rgba(255,255,255,0.15)'
      ctx.fillRect(Math.floor(x), Math.floor(y), Math.max(1, Math.floor(w)), 2)
    })

    // Step type label
    if (step.type !== 'initial') {
      ctx.font = '10px JetBrains Mono, monospace'
      ctx.fillStyle = 'rgba(255,255,255,0.2)'
      ctx.fillText(step.type.toUpperCase(), padding.left + 2, 14)
    }
  }, [steps, currentStep])

  // Handle canvas resize
  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const observer = new ResizeObserver(() => {
      const w = container.clientWidth
      if (w > 0) {
        canvas.width = w
        // trigger redraw by dispatching a dummy event
        canvas.dispatchEvent(new Event('resize'))
      }
    })

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  // Re-draw when canvas resizes
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handler = () => {
      // Just re-trigger the main draw effect by invalidating
    }
    canvas.addEventListener('resize', handler)
    return () => canvas.removeEventListener('resize', handler)
  }, [steps, currentStep])

  return (
    <div ref={containerRef} className="w-full">
      <canvas
        ref={canvasRef}
        width={600}
        height={300}
        className="w-full rounded"
        style={{ display: 'block', imageRendering: 'pixelated' }}
      />
    </div>
  )
}
