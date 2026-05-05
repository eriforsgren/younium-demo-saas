// lib/younium/selfservice.ts

export type CustomerIdentifierType =
  | 'AccountNumber'
  | 'AccountId'
  | 'ExternalERPId'
  | 'ExternalCRMId'

export type WidgetTokenResponse = {
  token: string
  expiresAt: string
}

export async function getWidgetToken(
  customerIdentifier: string,
  identifierType: CustomerIdentifierType = 'AccountNumber'
): Promise<WidgetTokenResponse> {
  const authUrl = process.env.YOUNIUM_SELFSERVICE_AUTH_URL
  const apiKey = process.env.YOUNIUM_SELFSERVICE_API_KEY
  const apiSecret = process.env.YOUNIUM_SELFSERVICE_API_SECRET

  if (!authUrl || !apiKey || !apiSecret) {
    throw new Error('Missing Younium Self-Service credentials in environment variables')
  }

  const response = await fetch(authUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey,
      apiSecret,
      customerIdentifier,
      customerIdentifierType: identifierType,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(
      `Younium self-service auth failed: ${response.status} ${errorText}`
    )
  }

  return response.json()
}