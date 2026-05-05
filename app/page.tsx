// app/page.tsx
'use client'

import { useState } from 'react'
import { DEMO_USERS, DemoUserId } from '@/lib/auth/demo-users'

// Hardcoded demo credentials. Maps email → demo user ID.
// In a real app, this would be a database with hashed passwords.
const DEMO_CREDENTIALS: Record<string, { password: string; userId: DemoUserId }> = {
  'bob@proco.com': { password: 'demo123', userId: 'bob' },
  'carol@enterpriseco.com': { password: 'demo123', userId: 'carol' },
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    // Tiny artificial delay so it feels like a real network request
    await new Promise((r) => setTimeout(r, 400))

    const credential = DEMO_CREDENTIALS[email.toLowerCase().trim()]
    if (!credential || credential.password !== password) {
      setError('Invalid email or password.')
      setIsSubmitting(false)
      return
    }

    // We'll wire up the real session in the next task.
    // For now just confirm the click works.
    alert(`Login flow not built yet. You logged in as: ${credential.userId}`)
    setIsSubmitting(false)
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tasksy</h1>
          <p className="text-gray-500 text-sm mt-1">Project management, simplified.</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">Sign in</h2>
          <p className="text-sm text-gray-500 mb-6">
            Welcome back. Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gray-900 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        {/* Demo helper text */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="text-xs font-semibold text-blue-900 mb-2">Demo accounts</p>
          <div className="text-xs text-blue-800 space-y-1 font-mono">
            <div>bob@proco.com / demo123</div>
            <div>carol@enterpriseco.com / demo123</div>
          </div>
        </div>

        <p className="text-xs text-center text-gray-400 mt-6">
          This is a demo environment.
        </p>
      </div>
    </main>
  )
}