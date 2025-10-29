"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2, Mic, Square, MapPin, AlertCircle, CheckCircle2 } from "lucide-react"
import { locationService, type LocationData } from "@/lib/location-service"

interface EmergencyReporterProps {
  language: string
  onResults: (results: any) => void
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

export default function EmergencyReporter({ language, onResults, isLoading, setIsLoading }: EmergencyReporterProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [location, setLocation] = useState<LocationData | null>(null)
  const [locationError, setLocationError] = useState("")
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const unsubscribeRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    const initializeLocation = async () => {
      setLocationStatus("loading")
      try {
        // Get initial location
        const initialLocation = await locationService.getCurrentLocation()
        setLocation(initialLocation)
        setAccuracy(initialLocation.accuracy)
        setLocationStatus("success")
        setLocationError("")
        console.log("[v0] Initial location acquired:", initialLocation)

        // Watch for location updates
        unsubscribeRef.current = locationService.watchLocation(
          (updatedLocation) => {
            setLocation(updatedLocation)
            setAccuracy(updatedLocation.accuracy)
            console.log("[v0] Location updated:", updatedLocation)
          },
          (error) => {
            console.error("[v0] Location watch error:", error)
            if (location) {
              console.log("[v0] Using cached location, not showing error")
              return
            }
            setLocationError(error.message)
            setLocationStatus("error")
          },
        )
      } catch (error: any) {
        console.error("[v0] Location initialization error:", error)
        const cachedLocation = locationService.getCachedLocation()
        if (cachedLocation) {
          console.log("[v0] Using cached location after initialization error")
          setLocation(cachedLocation)
          setAccuracy(cachedLocation.accuracy)
          setLocationStatus("success")
          setLocationError("")
          return
        }
        setLocationError(error.message || "Unable to access location")
        setLocationStatus("error")
      }
    }

    initializeLocation()

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check permissions.")
    }
  }

  const stopRecording = async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" })
        await submitEmergency(audioBlob)
      }

      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop())
    }
  }

  const submitEmergency = async (audioBlob: Blob) => {
    if (!location) {
      alert("Location not available. Please enable GPS and try again.")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("audio", audioBlob, "emergency-report.webm")
      formData.append("latitude", location.latitude.toString())
      formData.append("longitude", location.longitude.toString())
      formData.append("accuracy", location.accuracy.toString())
      formData.append("language", language)
      formData.append("timestamp", new Date(location.timestamp).toISOString())
      formData.append("altitude", location.altitude?.toString() || "")
      formData.append("speed", location.speed?.toString() || "")

      console.log("[v0] Submitting emergency report with location:", location)

      const response = await fetch("/api/emergency-report", {
        method: "POST",
        body: formData,
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        console.error("[v0] API error response:", errorData)
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to submit emergency report`)
      }

      const data = await response.json()
      console.log("[v0] Emergency report submitted successfully:", data)
      onResults(data)
    } catch (error) {
      console.error("[v0] Error submitting emergency:", error)
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      alert(`Failed to submit emergency report: ${errorMessage}`)
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getLocationStatusIcon = () => {
    switch (locationStatus) {
      case "loading":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <MapPin className="w-5 h-5 text-slate-400" />
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-6">
      <div className="space-y-6">
        {/* Location Status */}
        <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-700/30 border border-slate-600">
          {getLocationStatusIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium text-white">
              {locationStatus === "loading" && "Detecting location..."}
              {locationStatus === "success" &&
                location &&
                `Location: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
              {locationStatus === "error" && "Location unavailable"}
            </p>
            {accuracy !== null && locationStatus === "success" && (
              <p className="text-xs text-slate-400 mt-1">Accuracy: ±{accuracy.toFixed(0)}m</p>
            )}
            {locationError && <p className="text-xs text-red-400 mt-1">{locationError}</p>}
          </div>
        </div>

        {/* Recording Section */}
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-slate-300 text-sm mb-4">
              {language === "en" && "Describe your emergency in English"}
              {language === "hi" && "अपनी आपातकाल का वर्णन करें"}
              {language === "es" && "Describe su emergencia en español"}
              {language === "fr" && "Décrivez votre urgence en français"}
            </p>

            {/* Recording Timer */}
            {isRecording && (
              <div className="mb-4 text-center">
                <div className="inline-block px-4 py-2 rounded-lg bg-red-500/20 border border-red-500">
                  <p className="text-red-400 font-mono text-lg">{formatTime(recordingTime)}</p>
                </div>
              </div>
            )}

            {/* Record Button */}
            <Button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isLoading || locationStatus !== "success"}
              className={`w-full h-16 text-lg font-semibold transition-all ${
                isRecording
                  ? "bg-red-600 hover:bg-red-700 animate-pulse"
                  : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : isRecording ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Start Emergency Report
                </>
              )}
            </Button>
          </div>

          {/* Instructions */}
          <div className="p-4 rounded-lg bg-slate-700/20 border border-slate-600">
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Instructions:</strong> Press the button above and clearly describe your emergency. Include details
              about the type of emergency, number of people affected, and any injuries. Your location will be
              automatically sent with your report.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
