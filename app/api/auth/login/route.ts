// app/api/auth/login/route.ts
import { getSession } from '@/lib/auth/session'
import { DEMO_USERS, DemoUserId } from '@/lib/auth/demo-users'

// Hardcoded demo credentials. Maps email → demo user ID.
// In a real app, this would query a database with hashed passwords.
const DEMO_CREDENTIALS: Record<string, { password: string; userId: DemoUserId }> = {
  'bob@proco.com': { password: 'demo123', userId: 'bob' },
  'carol@enterpriseco.com': { password: 'demo123', userId: 'carol' },
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return Response.json({ error: 'Missing email or password' }, { status: 400 })
    }

    const credential = DEMO_CREDENTIALS[email.toLowerCase().trim()]
    if (!credential || credential.password !== password) {
      return Response.json({ error: 'Invalid email or password' }, { status: 401 })
    }

    if (!DEMO_USERS[credential.userId]) {
      return Response.json({ error: 'Demo user misconfigured' }, { status: 500 })
    }

    const session = await getSession()
    session.userId = credential.userId
    await session.save()

    return Response.json({ success: true, userId: credential.userId })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}