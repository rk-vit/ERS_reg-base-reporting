import { type NextRequest, NextResponse } from "next/server"
import { formatWebhookResponse, logWebhookEvent } from "@/lib/webhook-utils"
import { generateMockResponse } from "@/lib/mock-emergency-data"

export async function POST(request: NextRequest) {
  const startTime = Date.now()

  try {
    const formData = await request.formData()
    const audio = formData.get("audio") as Blob
    const latitude = formData.get("latitude") as string
    const longitude = formData.get("longitude") as string
    const accuracy = formData.get("accuracy") as string
    const language = formData.get("language") as string
    const timestamp = formData.get("timestamp") as string
    const altitude = formData.get("altitude") as string
    const speed = formData.get("speed") as string

    if (!audio || !latitude || !longitude || !language || !timestamp) {
      const missingFields = []
      if (!audio) missingFields.push("audio")
      if (!latitude) missingFields.push("latitude")
      if (!longitude) missingFields.push("longitude")
      if (!language) missingFields.push("language")
      if (!timestamp) missingFields.push("timestamp")

      await logWebhookEvent("emergency-report", { missingFields }, {}, "error")
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    // Validate coordinates
    const lat = Number.parseFloat(latitude)
    const lng = Number.parseFloat(longitude)
    const acc = Number.parseFloat(accuracy)

    if (Number.isNaN(lat) || Number.isNaN(lng) || lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      await logWebhookEvent("emergency-report", { latitude, longitude }, {}, "error")
      return NextResponse.json({ error: "Invalid coordinates" }, { status: 400 })
    }

    const audioBuffer = await audio.arrayBuffer()
    const audioSize = audioBuffer.byteLength
    if (audioSize > 50 * 1024 * 1024) {
      // 50MB limit
      await logWebhookEvent("emergency-report", { audioSize }, {}, "error")
      return NextResponse.json({ error: "Audio file too large (max 50MB)" }, { status: 413 })
    }

    const audioBase64 = Buffer.from(audioBuffer).toString("base64")

    const n8nPayload = {
      audio: audioBase64,
      audioMimeType: "audio/webm",
      location: {
        latitude: lat,
        longitude: lng,
        accuracy: acc,
        altitude: altitude ? Number.parseFloat(altitude) : null,
        speed: speed ? Number.parseFloat(speed) : null,
      },
      language,
      timestamp,
      reportedAt: new Date().toISOString(),
    }

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (!n8nWebhookUrl) {
      console.log("[v0] N8N_WEBHOOK_URL not configured, using realistic mock response for demo")

      const mockResponse = generateMockResponse(lat, lng)

      const processingTime = Date.now() - startTime
      await logWebhookEvent("emergency-report", n8nPayload, mockResponse, "success")
      console.log(`[Emergency Report] Processed in ${processingTime}ms (mock)`)

      return NextResponse.json(mockResponse)
    }

    if (!n8nWebhookUrl.startsWith("http")) {
      console.error("[v0] Invalid N8N_WEBHOOK_URL configuration:", n8nWebhookUrl)
      return NextResponse.json({ error: "Webhook configuration error: Invalid URL format" }, { status: 500 })
    }

    console.log("[v0] Sending to n8n webhook:", n8nWebhookUrl)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

    let n8nResponse
    try {
      n8nResponse = await fetch(n8nWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(n8nPayload),
        signal: controller.signal,
      })
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error("[v0] Fetch error:", fetchError.message)

      if (fetchError.name === "AbortError") {
        throw new Error("n8n webhook request timed out after 30 seconds")
      }

      throw new Error(`Failed to connect to n8n webhook: ${fetchError.message}`)
    } finally {
      clearTimeout(timeoutId)
    }

    if (!n8nResponse.ok) {
      const errorText = await n8nResponse.text()
      console.error("[v0] n8n webhook error:", errorText)
      await logWebhookEvent("emergency-report", n8nPayload, { status: n8nResponse.status, error: errorText }, "error")
      throw new Error(`n8n webhook failed with status ${n8nResponse.status}: ${errorText}`)
    }

    const n8nResult = await n8nResponse.json()
    const formattedResponse = formatWebhookResponse(n8nResult)

    const processingTime = Date.now() - startTime
    await logWebhookEvent("emergency-report", n8nPayload, formattedResponse, "success")

    console.log(`[Emergency Report] Processed in ${processingTime}ms`)

    return NextResponse.json(formattedResponse)
  } catch (error) {
    const processingTime = Date.now() - startTime
    const errorMessage = error instanceof Error ? error.message : "Failed to process emergency report"
    console.error("[v0] Emergency report error:", errorMessage)
    await logWebhookEvent("emergency-report", {}, { error: errorMessage }, "error")

    return NextResponse.json(
      {
        error: errorMessage,
        timestamp: new Date().toISOString(),
        processingTime,
      },
      { status: 500 },
    )
  }
}
