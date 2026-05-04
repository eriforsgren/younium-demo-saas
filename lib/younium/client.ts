// lib/younium/client.ts

type AuthResponse = {
    accessToken: string
    refreshToken: string
    expires: string
    expiresIn: number
  }
  
  let cachedToken: { token: string; expiresAt: number } | null = null
  
  export async function getYouniumToken(): Promise<string> {
    // Return cached token if still valid (with 5min safety buffer)
    if (cachedToken && Date.now() < cachedToken.expiresAt - 5 * 60 * 1000) {
      return cachedToken.token
    }
  
    const authUrl = process.env.YOUNIUM_AUTH_URL
    const clientId = process.env.YOUNIUM_CLIENT_ID
    const secret = process.env.YOUNIUM_CLIENT_SECRET
  
    if (!authUrl || !clientId || !secret) {
      throw new Error('Missing Younium credentials in environment variables')
    }
  
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, secret }),
    })
  
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Younium auth failed: ${response.status} ${errorText}`)
    }
  
    const data: AuthResponse = await response.json()
  
    cachedToken = {
      token: data.accessToken,
      expiresAt: new Date(data.expires).getTime(),
    }
  
    return data.accessToken
  }