import { useEffect, useRef, useState } from 'react'
import type { Algorithm } from '../types'
import type { Step } from '../types'
import { useVisualizerStore } from '../store/visualizerStore'

interface CommentaryPanelProps {
  algorithm: Algorithm
  steps: Step[]
}

interface CommentaryEntry {
  text: string
  stepIndex: number
  id: number
}

let commentaryIdCounter = 0

function getCommentary(algorithm: Algorithm, step: Step): string {
  const pool = algorithm.commentaryByType[step.type]
  if (!pool || pool.length === 0) {
    // fallback to description
    return step.description
  }
  return pool[Math.floor(Math.random() * pool.length)]
}

export default function CommentaryPanel({ algorithm, steps }: CommentaryPanelProps) {
  const { currentStep, focusMode, toggleFocusMode } = useVisualizerStore()
  const [commentaryLog, setCommentaryLog] = useState<CommentaryEntry[]>([])
  const prevStepRef = useRef<number>(-1)

  useEffect(() => {
    if (steps.length === 0) return
    const step = steps[currentStep]
    if (!step) return

    if (prevStepRef.current !== currentStep) {
      prevStepRef.current = currentStep
      const text = getCommentary(algorithm, step)
      setCommentaryLog((prev) => {
        const last = prev[prev.length - 1]
        // Deduplicate consecutive same text
        if (last && last.text === text && last.stepIndex === currentStep) return prev
        const newEntry: CommentaryEntry = {
          text,
          stepIndex: currentStep,
          id: commentaryIdCounter++,
        }
        const updated = [...prev, newEntry]
        // Keep last 20 entries total
        return updated.slice(-20)
      })
    }
  }, [currentStep, steps, algorithm])

  if (focusMode) {
    return (
      <div className="panel flex flex-col items-center justify-center p-4 min-h-[120px]">
        <p className="text-white/20 text-xs mb-3">focus mode on</p>
        <button onClick={toggleFocusMode} className="btn-ghost text-xs">
          show commentary
        </button>
      </div>
    )
  }

  // Show last 3 entries
  const visibleEntries = commentaryLog.slice(-3)

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="panel overflow-hidden flex-1">
        <div className="panel-header justify-between">
          <div className="flex items-center gap-2">
            <span className="text-secondary/60">✦</span>
            <span>commentary</span>
          </div>
          <button
            onClick={toggleFocusMode}
            className="text-white/20 hover:text-white/50 transition-colors text-xs"
            title="Toggle focus mode"
          >
            focus mode
          </button>
        </div>

        <div className="p-4 flex flex-col gap-3 min-h-[120px]">
          {visibleEntries.length === 0 && (
            <p className="text-white/20 text-xs italic">press play to start...</p>
          )}
          {visibleEntries.map((entry, i) => {
            const age = visibleEntries.length - 1 - i
            const opacity =
              age === 0 ? 'text-white/90' : age === 1 ? 'text-white/50' : 'text-white/25'

            return (
              <div key={entry.id} className={`text-xs leading-relaxed transition-all duration-300 ${opacity}`}>
                <span className="text-primary/30 mr-2 text-xs">&gt;</span>
                {entry.text}
              </div>
            )
          })}
        </div>
      </div>

      {/* Current step info */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <span className="text-accent/60">◉</span>
          <span>current step</span>
        </div>
        <div className="p-4">
          {steps[currentStep] ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 rounded border border-secondary/30 text-secondary/70 bg-secondary/5">
                  {steps[currentStep].type}
                </span>
              </div>
              <p className="text-white/40 text-xs leading-relaxed">
                {steps[currentStep].description}
              </p>
            </div>
          ) : (
            <p className="text-white/20 text-xs">—</p>
          )}
        </div>
      </div>
    </div>
  )
}
