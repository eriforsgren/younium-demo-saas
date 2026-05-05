// app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session.userId) {
    redirect('/')
  }

  const user = DEMO_USERS[session.userId]

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome, {user.name} 👋
        </h1>
        <p className="text-gray-500 mb-6">
          You're logged in as <strong>{user.name}</strong> from{' '}
          <strong>{user.company}</strong> on the <strong>{user.plan}</strong> plan.
        </p>
        <p className="text-sm text-gray-500 mb-8">
          This is a placeholder. We'll build the real Tasksy dashboard next.
        </p>
        <form action="/api/auth/logout" method="POST">
          <button
            type="submit"
            className="text-sm text-gray-700 hover:text-gray-900 underline"
          >
            Log out
          </button>
        </form>
      </div>
    </main>
  )
}