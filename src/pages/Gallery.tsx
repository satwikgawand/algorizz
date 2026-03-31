import { useState } from 'react'
import { algorithms } from '../data/algorithms'
import AlgorithmCard from '../components/AlgorithmCard'
import FilterBar from '../components/FilterBar'

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? algorithms
      : algorithms.filter((a) => a.category === activeCategory)

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-white/20 text-sm font-mono">$</span>
          <span className="text-white/20 text-sm font-mono">algorizz --help</span>
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold text-primary glow-green tracking-tight mb-3">
          algorizz
        </h1>
        <p className="text-white/40 text-sm sm:text-base max-w-lg leading-relaxed">
          algorithms. explained by someone who has given up.
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-white/20">
          <span>
            <span className="text-primary/50">{algorithms.length}</span> algorithms
          </span>
          <span>·</span>
          <span>
            <span className="text-secondary/50">1</span> category
          </span>
          <span>·</span>
          <span>
            <span className="text-accent/50">0</span> regrets
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-border" />
        <span className="text-white/10 text-xs font-mono">// available algorithms</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      {/* Filter bar */}
      <div className="mb-6">
        <FilterBar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-white/20 text-sm">
          <p>no algorithms found for this filter.</p>
          <p className="mt-1 text-xs">skill issue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((algo) => (
            <AlgorithmCard key={algo.id} algorithm={algo} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-border text-center">
        <p className="text-white/15 text-xs font-mono">
          built with vibes and O(n²) amount of coffee
        </p>
      </div>
    </div>
  )
}
