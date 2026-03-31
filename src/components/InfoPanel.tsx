import type { Algorithm } from '../types'

interface InfoPanelProps {
  algorithm: Algorithm
}

function getComplexityClass(complexity: string): string {
  if (complexity === 'O(1)' || complexity === 'O(log n)') return 'complexity-badge-green'
  if (complexity === 'O(n)' || complexity === 'O(n log n)') return 'complexity-badge-yellow'
  return 'complexity-badge-red'
}

function highlightPseudocode(code: string): string {
  const keywords = ['for', 'if', 'in', 'return', 'while', 'function', 'def']
  const builtins = ['range', 'len', 'swap']

  return code
    .split('\n')
    .map((line) => {
      // Escape HTML
      let escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      // Highlight numbers
      escaped = escaped.replace(/\b(\d+)\b/g, '<span class="pseudo-number">$1</span>')

      // Highlight builtins
      builtins.forEach((b) => {
        escaped = escaped.replace(
          new RegExp(`\\b(${b})\\b`, 'g'),
          '<span class="pseudo-builtin">$1</span>'
        )
      })

      // Highlight keywords
      keywords.forEach((kw) => {
        escaped = escaped.replace(
          new RegExp(`\\b(${kw})\\b`, 'g'),
          '<span class="pseudo-keyword">$1</span>'
        )
      })

      // Function names (word followed by open paren)
      escaped = escaped.replace(
        /\b([a-zA-Z_][a-zA-Z0-9_]*)(?=\()/g,
        (match, fn) => {
          // Don't double-highlight already highlighted
          if (keywords.includes(fn) || builtins.includes(fn)) return match
          return `<span class="pseudo-function">${fn}</span>`
        }
      )

      return escaped
    })
    .join('\n')
}

export default function InfoPanel({ algorithm }: InfoPanelProps) {
  const highlighted = highlightPseudocode(algorithm.pseudocode)

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Name block */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <span className="text-primary/60">●</span>
          <span>algorithm</span>
        </div>
        <div className="p-4">
          <h1 className="text-white text-xl font-bold">{algorithm.name}</h1>
          <p className="text-secondary text-sm italic mt-1">"{algorithm.nickname}"</p>
          <p className="text-white/50 text-xs mt-3 leading-relaxed">{algorithm.description}</p>
        </div>
      </div>

      {/* Complexity table */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <span className="text-accent/60">◆</span>
          <span>complexity</span>
        </div>
        <div className="p-4">
          <table className="w-full text-xs">
            <tbody>
              <tr className="border-b border-border/50">
                <td className="text-white/40 py-2 pr-4">best</td>
                <td className="py-2">
                  <span className={getComplexityClass(algorithm.complexity.best)}>
                    {algorithm.complexity.best}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="text-white/40 py-2 pr-4">average</td>
                <td className="py-2">
                  <span className={getComplexityClass(algorithm.complexity.average)}>
                    {algorithm.complexity.average}
                  </span>
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="text-white/40 py-2 pr-4">worst</td>
                <td className="py-2">
                  <span className={getComplexityClass(algorithm.complexity.worst)}>
                    {algorithm.complexity.worst}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="text-white/40 py-2 pr-4">space</td>
                <td className="py-2">
                  <span className={getComplexityClass(algorithm.complexity.space)}>
                    {algorithm.complexity.space}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* When to use */}
      <div className="panel overflow-hidden">
        <div className="panel-header">
          <span className="text-secondary/60">▲</span>
          <span>when to actually use this</span>
        </div>
        <div className="p-4">
          <p className="text-white/50 text-xs leading-relaxed italic">{algorithm.whenToUse}</p>
        </div>
      </div>

      {/* Pseudocode */}
      <div className="panel overflow-hidden flex-1">
        <div className="panel-header">
          <span className="text-primary/60">{'</>'}</span>
          <span>pseudocode</span>
        </div>
        <div className="p-4">
          <pre
            className="text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap break-words"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      </div>
    </div>
  )
}
