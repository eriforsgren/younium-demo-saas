// components/TopBar.tsx
'use client'

type TopBarProps = {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-6">
        {/* Page title */}
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-gray-900 truncate">{title}</h1>
          {subtitle && (
            <p className="text-sm text-gray-500 truncate">{subtitle}</p>
          )}
        </div>

        {/* Right side: search + notifications */}
        <div className="flex items-center gap-3">
          {/* Search (decorative — doesn't actually search anything) */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search…"
              className="w-64 pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              🔍
            </span>
          </div>

          {/* Notifications bell */}
          <button
            type="button"
            className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
            aria-label="Notifications"
          >
            <span className="text-lg">🔔</span>
            {/* Unread dot */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          {/* New task button */}
          <button
            type="button"
            className="bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            + New task
          </button>
        </div>
      </div>
    </header>
  )
}