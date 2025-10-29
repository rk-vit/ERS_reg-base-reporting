import { type NextRequest, NextResponse } from "next/server"

/**
 * Webhook verification endpoint for n8n configuration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook payload structure
    if (!body.location || !body.language || !body.timestamp) {
      return NextResponse.json(
        {
          valid: false,
          errors: ["Missing required fields: location, language, timestamp"],
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      valid: true,
      message: "Webhook payload is valid",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return NextResponse.json(
      {
        valid: false,
        error: error instanceof Error ? error.message : "Invalid request",
      },
      { status: 400 },
    )
  }
}
