// app/projects/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { StubPage } from '@/components/StubPage'

export default async function ProjectsPage() {
  const session = await getSession()
  if (!session.userId) redirect('/')
  const user = DEMO_USERS[session.userId]

  return (
    <StubPage
      title="Projects"
      description="An overview of all active projects across your team."
      userName={user.name}
      userCompany={user.company}
    />
  )
}