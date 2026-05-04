// app/api/younium/test/route.ts
import { getYouniumToken } from '@/lib/younium/client'

export async function GET() {
  try {
    const token = await getYouniumToken()

    return Response.json({
      success: true,
      tokenPreview: `${token.slice(0, 20)}...`,
      message: 'Successfully authenticated with Younium',
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}