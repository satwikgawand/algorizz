import { useEffect, useRef } from 'react'
import type { Step } from '../types'

interface StringCanvasProps {
  steps: Step[]
  currentStep: number
  text: string
  pattern: string
}

const COLORS = {
  background: '#0d0d0d',
  boxDefault: '#1a1a1a',
  boxBorder: '#333333',
  charDefault: '#00ff41',
  charDim: 'rgba(0,255,65,0.3)',
  textCursor: '#fbbf24',    // amber - current text position
  patternCursor: '#c084fc', // purple - current pattern position
  match: '#00ff41',         // green - confirmed match
  matchBg: '#0a2e12',
  hashWindow: '#fbbf24',    // amber - rolling hash window bg
  hashWindowBg: '#2a200a',
  mismatch: '#ef4444',
}

export default function StringCanvas({ steps, currentStep, text, pattern }: StringCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const step: Step | undefined = steps[currentStep]
    if (!step) return

    const W = canvas.width
    const H = canvas.height

    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = COLORS.background
    ctx.fillRect(0, 0, W, H)

    const n = text.length
    const m = pattern.length
    if (n === 0 || m === 0) return

    const padding = 16
    const maxCells = Math.max(n, m)
    const cellSize = Math.min(32, Math.floor((W - padding * 2) / maxCells))
    const fontSize = Math.max(9, Math.floor(cellSize * 0.45))
    const rowH = cellSize + 6
    const totalTextW = n * cellSize
    const startX = Math.floor((W - totalTextW) / 2)
    const textRowY = Math.floor(H / 2) - rowH - 4
    const patternRowY = Math.floor(H / 2) + 4

    const { textIndex = 0, patternIndex = 0, matches = [], hashWindow, type } = step
    const matchSet = new Set(
      matches.flatMap((m_start) => Array.from({ length: m }, (_, k) => m_start + k))
    )

    const isMismatch = type === 'mismatch'

    // Draw text row
    for (let i = 0; i < n; i++) {
      const x = startX + i * cellSize
      const y = textRowY

      const isTextCursor = i === textIndex
      const isInHashWindow = hashWindow && i >= hashWindow[0] && i <= hashWindow[1]
      const isMatch = matchSet.has(i)

      // Box background
      if (isMatch) {
        ctx.fillStyle = COLORS.matchBg
      } else if (isInHashWindow) {
        ctx.fillStyle = COLORS.hashWindowBg
      } else {
        ctx.fillStyle = COLORS.boxDefault
      }
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)

      // Box border
      if (isTextCursor && isMismatch) {
        ctx.strokeStyle = COLORS.mismatch
        ctx.shadowColor = COLORS.mismatch
        ctx.shadowBlur = 6
      } else if (isTextCursor) {
        ctx.strokeStyle = COLORS.textCursor
        ctx.shadowColor = COLORS.textCursor
        ctx.shadowBlur = 6
      } else if (isMatch) {
        ctx.strokeStyle = COLORS.match
        ctx.shadowBlur = 0
      } else if (isInHashWindow) {
        ctx.strokeStyle = COLORS.hashWindow
        ctx.shadowBlur = 0
      } else {
        ctx.strokeStyle = COLORS.boxBorder
        ctx.shadowBlur = 0
      }
      ctx.lineWidth = 1
      ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
      ctx.shadowBlur = 0

      // Character
      ctx.font = `${fontSize}px JetBrains Mono, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      if (isTextCursor && isMismatch) {
        ctx.fillStyle = COLORS.mismatch
      } else if (isTextCursor) {
        ctx.fillStyle = COLORS.textCursor
      } else if (isMatch) {
        ctx.fillStyle = COLORS.match
      } else {
        ctx.fillStyle = COLORS.charDim
      }
      ctx.fillText(text[i], x + cellSize / 2, y + cellSize / 2)
    }

    // Row label
    ctx.font = `9px JetBrains Mono, monospace`
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText('text', startX - 4, textRowY + cellSize / 2)

    // Draw pattern row (offset to align with current text window)
    const patternOffsetX = hashWindow
      ? startX + hashWindow[0] * cellSize
      : startX + (textIndex - patternIndex) * cellSize

    for (let j = 0; j < m; j++) {
      const x = patternOffsetX + j * cellSize
      if (x < 0 || x + cellSize > W) continue
      const y = patternRowY

      const isPatternCursor = j === patternIndex

      ctx.fillStyle = COLORS.boxDefault
      ctx.fillRect(x + 1, y + 1, cellSize - 2, cellSize - 2)

      if (isPatternCursor && isMismatch) {
        ctx.strokeStyle = COLORS.mismatch
        ctx.shadowColor = COLORS.mismatch
        ctx.shadowBlur = 6
      } else if (isPatternCursor) {
        ctx.strokeStyle = COLORS.patternCursor
        ctx.shadowColor = COLORS.patternCursor
        ctx.shadowBlur = 6
      } else {
        ctx.strokeStyle = COLORS.boxBorder
        ctx.shadowBlur = 0
      }
      ctx.lineWidth = 1
      ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2)
      ctx.shadowBlur = 0

      ctx.font = `${fontSize}px JetBrains Mono, monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = isPatternCursor ? (isMismatch ? COLORS.mismatch : COLORS.patternCursor) : COLORS.charDim
      ctx.fillText(pattern[j], x + cellSize / 2, y + cellSize / 2)
    }

    // Row label
    ctx.font = `9px JetBrains Mono, monospace`
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.textAlign = 'right'
    ctx.textBaseline = 'middle'
    ctx.fillText('pattern', patternOffsetX - 4, patternRowY + cellSize / 2)

    // Step type
    ctx.font = '10px JetBrains Mono, monospace'
    ctx.fillStyle = 'rgba(255,255,255,0.2)'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    if (step.type !== 'initial') {
      ctx.fillText(step.type.toUpperCase(), 8, 8)
    }
  }, [steps, currentStep, text, pattern])

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
        height={180}
        className="w-full rounded"
        style={{ display: 'block' }}
      />
    </div>
  )
}
