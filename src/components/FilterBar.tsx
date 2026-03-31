interface FilterBarProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'sorting', label: 'Sorting' },
]

export default function FilterBar({ activeCategory, onCategoryChange }: FilterBarProps) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-white/30 text-xs mr-2">filter:</span>
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
          {cat.id !== 'all' && (
            <span
              className={`ml-2 text-xs ${
                activeCategory === cat.id ? 'text-primary/60' : 'text-white/20'
              }`}
            >
              [{cat.id === 'sorting' ? '3' : '3'}]
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
