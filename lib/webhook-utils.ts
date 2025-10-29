// Webhook utility functions for n8n integration

export interface WebhookPayload {
  audio?: string
  audioMimeType?: string
  location?: {
    latitude: number
    longitude: number
    accuracy?: number
    altitude?: number
    speed?: number
  }
  language?: string
  timestamp?: string
  reportedAt?: string
}

export interface WebhookResponse {
  emergencyType: string
  severity: "critical" | "high" | "medium" | "low"
  confidence?: number
  dispatchedUnit?: {
    id: string
    type: string
    eta: number
    distance: number
    lat?: number
    lng?: number
  }
  nearestAmbulances?: Array<{
    id: string
    distance: number
    eta: number
    lat?: number
    lng?: number
  }>
  riskFactors?: Array<{
    factor: string
    severity: "high" | "medium" | "low"
    description: string
  }>
  recommendations?: string[]
  estimatedCasuality?: number
  responseTime?: number
  requiredUnits?: Array<{
    type: string
    count: number
    priority: "immediate" | "secondary"
  }>
  keywords?: string[]
  manualAttentionNeeded: boolean
  analysisDetails: string
}

/**
 * Validate webhook payload
 */
export function validateWebhookPayload(payload: any): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (!payload.location) {
    errors.push("Location data is required")
  } else {
    if (
      typeof payload.location.latitude !== "number" ||
      payload.location.latitude < -90 ||
      payload.location.latitude > 90
    ) {
      errors.push("Invalid latitude")
    }
    if (
      typeof payload.location.longitude !== "number" ||
      payload.location.longitude < -180 ||
      payload.location.longitude > 180
    ) {
      errors.push("Invalid longitude")
    }
  }

  if (!payload.language) {
    errors.push("Language is required")
  }

  if (!payload.timestamp) {
    errors.push("Timestamp is required")
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

/**
 * Verify webhook signature (if n8n provides one)
 */
export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  if (!secret) return true // Skip verification if no secret configured

  const crypto = require("crypto")
  const hash = crypto.createHmac("sha256", secret).update(payload).digest("hex")
  return hash === signature
}

/**
 * Format webhook response
 */
export function formatWebhookResponse(data: any): WebhookResponse {
  return {
    emergencyType: data.emergencyType || "Unknown Emergency",
    severity: data.severity || "high",
    confidence: data.confidence,
    dispatchedUnit: data.dispatchedUnit || {
      id: "AMB-001",
      type: "Ambulance",
      eta: 8,
      distance: 2.5,
    },
    nearestAmbulances: data.nearestAmbulances || [],
    riskFactors: data.riskFactors,
    recommendations: data.recommendations,
    estimatedCasuality: data.estimatedCasuality,
    responseTime: data.responseTime,
    requiredUnits: data.requiredUnits,
    keywords: data.keywords,
    manualAttentionNeeded: data.manualAttentionNeeded || false,
    analysisDetails: data.analysisDetails || "Emergency report received and processed.",
  }
}

/**
 * Log webhook event
 */
export async function logWebhookEvent(
  eventType: string,
  payload: any,
  response: any,
  status: "success" | "error",
): Promise<void> {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    eventType,
    status,
    payloadSize: JSON.stringify(payload).length,
    responseSize: JSON.stringify(response).length,
  }

  console.log(`[Webhook ${status.toUpperCase()}]`, logEntry)

  // In production, you would send this to a logging service
  // Example: await logService.log(logEntry)
}
