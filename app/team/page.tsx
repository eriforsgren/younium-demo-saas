// app/team/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { StubPage } from '@/components/StubPage'

export default async function TeamPage() {
  const session = await getSession()
  if (!session.userId) redirect('/')
  const user = DEMO_USERS[session.userId]

  return (
    <StubPage
      title="Team"
      description="Manage team members, permissions, and roles."
      userName={user.name}
      userCompany={user.company}
    />
  )
}