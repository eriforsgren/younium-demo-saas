// app/api/auth/logout/route.ts
import { getSession } from '@/lib/auth/session'

export async function POST(request: Request) {
  const session = await getSession()
  session.destroy()
  return Response.redirect(new URL('/', request.url), 303)
}