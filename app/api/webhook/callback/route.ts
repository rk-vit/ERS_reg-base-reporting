import { type NextRequest, NextResponse } from "next/server"

/**
 * Webhook callback endpoint for n8n to send updates
 * This allows n8n to push updates back to the client
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate callback payload
    if (!body.reportId || !body.status) {
      return NextResponse.json({ error: "Missing reportId or status" }, { status: 400 })
    }

    const callbackData = {
      reportId: body.reportId,
      status: body.status, // "processing", "completed", "failed"
      timestamp: new Date().toISOString(),
      data: body.data || {},
    }

    console.log("[Webhook Callback]", callbackData)

    // In production, store this in a database and emit to connected clients via WebSocket
    // Example: await db.callbacks.create(callbackData)
    // Example: io.emit('emergency-update', callbackData)

    return NextResponse.json({
      success: true,
      message: "Callback received",
      callbackId: `CB-${Date.now()}`,
    })
  } catch (error) {
    console.error("Webhook callback error:", error)
    return NextResponse.json({ error: "Failed to process callback" }, { status: 500 })
  }
}
