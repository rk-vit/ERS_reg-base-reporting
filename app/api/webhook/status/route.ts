import { type NextRequest, NextResponse } from "next/server"

/**
 * Webhook status endpoint for health checks
 */
export async function GET(request: NextRequest) {
  return NextResponse.json({
    status: "operational",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    endpoints: {
      emergency_report: "/api/emergency-report",
      webhook_status: "/api/webhook/status",
      webhook_logs: "/api/webhook/logs",
    },
  })
}
