// app/reports/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { StubPage } from '@/components/StubPage'

export default async function ReportsPage() {
  const session = await getSession()
  if (!session.userId) redirect('/')
  const user = DEMO_USERS[session.userId]

  return (
    <StubPage
      title="Reports"
      description="Productivity analytics, throughput trends, and project velocity reports."
      userName={user.name}
      userCompany={user.company}
    />
  )
}