"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, MapPin, Ambulance, AlertCircle } from "lucide-react"

interface Unit {
  id: string
  lat: number
  lng: number
  type: string
  eta?: number
  distance?: number
  status?: "en-route" | "arrived" | "dispatched"
}

interface EmergencyMapProps {
  userLocation: { lat: number; lng: number } | null
  dispatchedUnit: Unit | null
  nearbyUnits?: Unit[]
  isLoading?: boolean
}

export default function EmergencyMap({
  userLocation,
  dispatchedUnit,
  nearbyUnits = [],
  isLoading = false,
}: EmergencyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 })
  const [zoom, setZoom] = useState(14)

  // Initialize map center when user location is available
  useEffect(() => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng })
    }
  }, [userLocation])

  // Draw map on canvas
  useEffect(() => {
    if (!canvasRef.current || !mapRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = mapRef.current.clientWidth
    canvas.height = mapRef.current.clientHeight

    // Draw background
    ctx.fillStyle = "#1e293b"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = "#334155"
    ctx.lineWidth = 1
    const gridSize = 40
    for (let i = 0; i < canvas.width; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += gridSize) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Helper function to convert lat/lng to canvas coordinates
    const latLngToCanvas = (lat: number, lng: number) => {
      const x = (lng - mapCenter.lng) * Math.cos((mapCenter.lat * Math.PI) / 180) * zoom * 10 + canvas.width / 2
      const y = (mapCenter.lat - lat) * zoom * 10 + canvas.height / 2
      return { x, y }
    }

    // Draw user location
    if (userLocation) {
      const { x, y } = latLngToCanvas(userLocation.lat, userLocation.lng)
      if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
        // Draw user marker
        ctx.fillStyle = "#ef4444"
        ctx.beginPath()
        ctx.arc(x, y, 8, 0, Math.PI * 2)
        ctx.fill()

        // Draw pulse effect
        ctx.strokeStyle = "rgba(239, 68, 68, 0.3)"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(x, y, 12, 0, Math.PI * 2)
        ctx.stroke()

        // Draw label
        ctx.fillStyle = "#ffffff"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("You", x, y - 18)
      }
    }

    // Draw dispatched unit
    if (dispatchedUnit) {
      const { x, y } = latLngToCanvas(dispatchedUnit.lat, dispatchedUnit.lng)
      if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
        // Draw ambulance marker
        ctx.fillStyle = "#3b82f6"
        ctx.beginPath()
        ctx.moveTo(x, y - 10)
        ctx.lineTo(x + 8, y + 10)
        ctx.lineTo(x, y + 6)
        ctx.lineTo(x - 8, y + 10)
        ctx.closePath()
        ctx.fill()

        // Draw label
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(dispatchedUnit.id, x, y - 18)

        // Draw line from user to unit
        if (userLocation) {
          const userCoords = latLngToCanvas(userLocation.lat, userLocation.lng)
          ctx.strokeStyle = "rgba(59, 130, 246, 0.3)"
          ctx.lineWidth = 2
          ctx.setLineDash([5, 5])
          ctx.beginPath()
          ctx.moveTo(userCoords.x, userCoords.y)
          ctx.lineTo(x, y)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }
    }

    // Draw nearby units
    nearbyUnits.forEach((unit, idx) => {
      const { x, y } = latLngToCanvas(unit.lat, unit.lng)
      if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
        // Draw nearby unit marker
        ctx.fillStyle = "#10b981"
        ctx.beginPath()
        ctx.arc(x, y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Draw label
        ctx.fillStyle = "#ffffff"
        ctx.font = "11px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(unit.id, x, y - 14)
      }
    })
  }, [mapCenter, zoom, userLocation, dispatchedUnit, nearbyUnits])

  const handleZoom = (direction: "in" | "out") => {
    setZoom((prev) => (direction === "in" ? Math.min(prev + 2, 20) : Math.max(prev - 2, 5)))
  }

  const handleCenter = () => {
    if (userLocation) {
      setMapCenter({ lat: userLocation.lat, lng: userLocation.lng })
      setZoom(14)
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-red-500" />
          Emergency Response Map
        </h3>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin text-blue-400" />}
      </div>

      {/* Map Canvas */}
      <div ref={mapRef} className="flex-1 rounded-lg overflow-hidden bg-slate-700/50 relative mb-4 min-h-96">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => handleZoom("in")}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
            title="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => handleZoom("out")}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
            title="Zoom out"
          >
            −
          </button>
          <button
            onClick={handleCenter}
            className="w-10 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center text-white transition-colors"
            title="Center on location"
          >
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2 p-2 rounded bg-slate-700/30">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-slate-300">Your Location</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-slate-700/30">
          <Ambulance className="w-4 h-4 text-blue-400" />
          <span className="text-slate-300">Dispatched Unit</span>
        </div>
        <div className="flex items-center gap-2 p-2 rounded bg-slate-700/30">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-slate-300">Nearby Units</span>
        </div>
        {dispatchedUnit && (
          <div className="flex items-center gap-2 p-2 rounded bg-slate-700/30">
            <span className="text-slate-300">
              ETA: <span className="font-semibold text-white">{dispatchedUnit.eta || "—"} min</span>
            </span>
          </div>
        )}
      </div>

      {/* Unit Details */}
      {dispatchedUnit && (
        <div className="mt-4 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Ambulance className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-white text-sm">{dispatchedUnit.id}</span>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">
              {dispatchedUnit.status || "dispatched"}
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
            <div>
              <span className="text-slate-400">Type:</span> {dispatchedUnit.type}
            </div>
            <div>
              <span className="text-slate-400">Distance:</span>{" "}
              {typeof dispatchedUnit.distance === "number"
                ? dispatchedUnit.distance.toFixed(1)
                : Number(dispatchedUnit.distance)?.toFixed(1) || "—"}{" "}
              km
            </div>
          </div>
        </div>
      )}

      {!userLocation && (
        <div className="mt-4 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-yellow-300">Waiting for location data...</p>
        </div>
      )}
    </Card>
  )
}
