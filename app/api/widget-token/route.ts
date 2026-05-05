// app/api/widget-token/route.ts
import { getWidgetToken } from '@/lib/younium/selfservice'
import { DEMO_USERS } from '@/lib/auth/demo-users'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId } = body

    if (!userId) {
      return Response.json({ error: 'Missing userId' }, { status: 400 })
    }

    const user = DEMO_USERS[userId as keyof typeof DEMO_USERS]
    if (!user) {
      return Response.json({ error: 'Unknown user' }, { status: 404 })
    }

    const result = await getWidgetToken(user.youniumAccountNumber, 'AccountNumber')

    return Response.json({
      token: result.token,
      expiresAt: result.expiresAt,
    })
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}