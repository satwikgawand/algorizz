import { useNavigate } from 'react-router-dom'
import type { Algorithm } from '../types'

interface AlgorithmCardProps {
  algorithm: Algorithm
}

function getComplexityClass(complexity: string): string {
  if (complexity === 'O(1)' || complexity === 'O(log n)') return 'complexity-badge-green'
  if (complexity === 'O(n)' || complexity === 'O(n log n)') return 'complexity-badge-yellow'
  return 'complexity-badge-red'
}

export default function AlgorithmCard({ algorithm }: AlgorithmCardProps) {
  const navigate = useNavigate()

  return (
    <div
      className="panel group hover:border-primary/50 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col"
      onClick={() => navigate(`/algorithm/${algorithm.id}`)}
    >
      {/* Card top bar */}
      <div className="h-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-transparent group-hover:from-primary/60 group-hover:via-secondary/60 transition-all duration-300" />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-white font-bold text-base group-hover:text-primary transition-colors duration-150">
              {algorithm.name}
            </h3>
            <p className="text-secondary text-xs mt-0.5 italic">"{algorithm.nickname}"</p>
          </div>
          <span className="text-xs px-2 py-0.5 rounded border border-secondary/30 text-secondary/70 bg-secondary/5 shrink-0">
            {algorithm.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
          {algorithm.description}
        </p>

        {/* Complexity badges */}
        <div className="flex flex-col gap-1.5">
          <span className="text-white/20 text-xs uppercase tracking-widest">complexity</span>
          <div className="grid grid-cols-3 gap-1.5">
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-xs">best</span>
              <span className={getComplexityClass(algorithm.complexity.best)}>
                {algorithm.complexity.best}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-xs">avg</span>
              <span className={getComplexityClass(algorithm.complexity.average)}>
                {algorithm.complexity.average}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-white/30 text-xs">worst</span>
              <span className={getComplexityClass(algorithm.complexity.worst)}>
                {algorithm.complexity.worst}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/30 text-xs">space</span>
            <span className={getComplexityClass(algorithm.complexity.space)}>
              {algorithm.complexity.space}
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <button
            className="w-full text-center text-xs py-2 px-4 border border-primary/30 text-primary/70 rounded
              group-hover:border-primary group-hover:text-primary group-hover:bg-primary/5
              transition-all duration-150 font-mono"
          >
            visualize it →
          </button>
        </div>
      </div>
    </div>
  )
}
