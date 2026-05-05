// lib/auth/session.ts
import { getIronSession, SessionOptions } from 'iron-session'
import { cookies } from 'next/headers'
import { DemoUserId } from './demo-users'

export type SessionData = {
  userId?: DemoUserId
}

const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET as string,
  cookieName: 'tasksy_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
  },
}

export async function getSession() {
  if (!process.env.SESSION_SECRET) {
    throw new Error('SESSION_SECRET not set in environment')
  }
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}