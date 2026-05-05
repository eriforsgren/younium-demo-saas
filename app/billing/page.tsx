// app/billing/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { Sidebar } from '@/components/Sidebar'
import { TopBar } from '@/components/TopBar'

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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div className="text-5xl mb-4">💳</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Younium widget will live here
              </h2>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                This is where we'll embed the self-service widget. Coming next!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}