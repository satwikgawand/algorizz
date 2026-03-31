
interface ComplexityModalProps {
  complexity: string
  onClose: () => void
}

const brainrot: Record<string, { vibe: string; tldr: string; emoji: string }> = {
  'O(1)': {
    emoji: '⚡',
    vibe: 'the absolute GOAT no cap',
    tldr: "doesn't matter if ur list has 1 item or 1 billion — same speed fr fr. this algo said effort is optional.",
  },
  'O(log n)': {
    emoji: '🪓',
    vibe: 'lowkey fast ngl',
    tldr: "cuts the problem in half every step like it's nothing. it's giving main character energy. built different.",
  },
  'O(n)': {
    emoji: '📏',
    vibe: 'honest bestie',
    tldr: 'double the input, double the work. no drama, no surprises. respects ur time at least.',
  },
  'O(n log n)': {
    emoji: '🤝',
    vibe: 'mid but make it fashion',
    tldr: "where all the premium sorting algos live. not bussin but not trash either. understood the assignment.",
  },
  'O(n²)': {
    emoji: '💀',
    vibe: 'bro is cooked',
    tldr: "two nested loops going absolutely feral. fine for 100 items but try it on 100k and ur laptop starts praying.",
  },
  'O(2^n)': {
    emoji: '😭',
    vibe: 'actually not okay rn',
    tldr: 'doubles in work every time u add ONE element. n=30 hits different. do NOT let this near production.',
  },
  'O(n!)': {
    emoji: '⚰️',
    vibe: 'deceased. rip bozo.',
    tldr: "tries literally every possible combo. ur pc will ghost u past n=12. this algo said yolo and dipped.",
  },
}

const fallback = {
  emoji: '🤔',
  vibe: 'slay i guess?',
  tldr: "idk what this is ngl but it's giving complexity vibes. do ur own research bestie.",
}

export default function ComplexityModal({ complexity, onClose }: ComplexityModalProps) {
  const info = brainrot[complexity] ?? fallback

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-sm border border-border rounded-lg bg-surface p-5 flex flex-col gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <span className="text-3xl">{info.emoji}</span>
          <button
            onClick={onClose}
            className="text-white/30 hover:text-white/70 transition-colors text-lg leading-none cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Complexity label */}
        <div className="flex items-baseline gap-2">
          <span className="text-primary text-2xl font-bold">{complexity}</span>
          <span className="text-white/30 text-xs">time complexity</span>
        </div>

        {/* Vibe */}
        <p className="text-secondary text-sm font-semibold italic">"{info.vibe}"</p>

        {/* TLDR */}
        <p className="text-white/60 text-xs leading-relaxed">{info.tldr}</p>

        {/* Dismiss */}
        <button
          onClick={onClose}
          className="mt-1 w-full py-1.5 rounded border border-border text-white/30 text-xs hover:border-white/30 hover:text-white/60 transition-all cursor-pointer"
        >
          ok bestie
        </button>
      </div>
    </div>
  )
}
