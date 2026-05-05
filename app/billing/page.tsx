// app/billing/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'
import { YouniumWidget } from '@/components/YouniumWidget'

export default async function BillingPage() {
  const session = await getSession()
  if (!session.userId) redirect('/')
  const user = DEMO_USERS[session.userId]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar userName={user.name} userCompany={user.company} />

      <div className="flex-1 flex flex-col">
        <TopBar
          title="Billing"
          subtitle="Manage your subscription, invoices, and account details."
        />

        <main className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <YouniumWidget userId={session.userId} />
          </div>
        </main>
      </div>
    </div>
  )
}