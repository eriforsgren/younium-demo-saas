// app/tasks/page.tsx
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS } from '@/lib/auth/demo-users'
import { StubPage } from '@/components/StubPage'

export default async function TasksPage() {
  const session = await getSession()
  if (!session.userId) redirect('/')
  const user = DEMO_USERS[session.userId]

  return (
    <StubPage
      title="My Tasks"
      description="A personal task list view, filtered to just what's assigned to you."
      userName={user.name}
      userCompany={user.company}
    />
  )
}