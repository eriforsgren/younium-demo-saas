// app/dashboard/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'
import { KanbanBoard } from '@/components/KanbanBoard'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session.userId) {
    redirect('/')
  }

  const user = DEMO_USERS[session.userId]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={user.name} userCompany={user.company} />

      <div className="flex-1 flex flex-col">
        <TopBar
          title="Dashboard"
          subtitle={`Welcome back, ${user.name} 👋`}
        />

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <KanbanBoard />
          </div>
        </main>
      </div>
    </div>
  )
}