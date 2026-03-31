import { algorithms } from '../data/algorithms'

interface FilterBarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const CATEGORY_LABELS: Record<string, string> = {
  sorting: 'Sorting',
  searching: 'Searching',
  graph: 'Graph',
  pathfinding: 'Pathfinding',
  'string-matching': 'Strings',
}

function buildCategories() {
  const counts = new Map<string, number>()
  for (const algo of algorithms) {
    counts.set(algo.category, (counts.get(algo.category) ?? 0) + 1)
  }
  return Array.from(counts.entries()).map(([id, count]) => ({
    id,
    label: CATEGORY_LABELS[id] ?? id,
    count,
  }))
}

const categories = buildCategories()

export default function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-white/30 text-xs mr-2">filter:</span>
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-1.5 rounded text-xs font-mono border transition-all duration-150 cursor-pointer ${
          activeCategory === 'all'
            ? 'bg-primary/10 border-primary text-primary'
            : 'bg-transparent border-border text-white/40 hover:border-white/30 hover:text-white/60'
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-1.5 rounded text-xs font-mono border transition-all duration-150 cursor-pointer ${
            activeCategory === cat.id
              ? 'bg-primary/10 border-primary text-primary'
              : 'bg-transparent border-border text-white/40 hover:border-white/30 hover:text-white/60'
          }`}
        >
          {cat.label}
          <span
            className={`ml-2 text-xs ${
              activeCategory === cat.id ? 'text-primary/60' : 'text-white/20'
            }`}
          >
            [{cat.count}]
          </span>
        </button>
      ))}
    </div>
  )
}
