import { Outlet, Link, useLocation } from 'react-router-dom'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="min-h-screen bg-background font-mono">
      {isHome && (
        <header className="border-b border-border px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <span className="text-2xl font-bold text-primary glow-green tracking-tight">
                algorizz
              </span>
              <span className="text-white/20 text-xs hidden sm:block">
                // dsa visualizer
              </span>
            </Link>
            <div className="text-white/30 text-xs hidden md:block">
              <span className="text-primary/60">$</span> npm install knowledge
            </div>
          </div>
        </header>
      )}
      {!isHome && (
        <header className="border-b border-border px-6 py-3 bg-surface/50">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <Link
              to="/"
              className="text-white/40 hover:text-primary transition-colors text-sm flex items-center gap-2"
            >
              <span>←</span>
              <span>back</span>
            </Link>
            <span className="text-border">|</span>
            <Link to="/" className="text-primary font-bold text-lg glow-green">
              algorizz
            </Link>
          </div>
        </header>
      )}
      <main>
        <Outlet />
      </main>
    </div>
  )
}
