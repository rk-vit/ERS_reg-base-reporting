"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Ambulance, AlertTriangle } from "lucide-react"
import AIAnalysisDisplay from "./ai-analysis-display"

interface ResultsDisplayProps {
  results: {
    emergencyType: string
    severity: "critical" | "high" | "medium" | "low"
    dispatchedUnit: {
      id: string
      type: string
      eta: number
      distance: number
    }
    nearestAmbulances: Array<{
      id: string
      distance: number
      eta: number
    }>
    manualAttentionNeeded: boolean
    analysisDetails: string
    confidence?: number
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
  }
}

export default function ResultsDisplay({ results }: ResultsDisplayProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 border-red-500 text-red-400"
      case "high":
        return "bg-orange-500/20 border-orange-500 text-orange-400"
      case "medium":
        return "bg-yellow-500/20 border-yellow-500 text-yellow-400"
      default:
        return "bg-green-500/20 border-green-500 text-green-400"
    }
  }

  const hasAIAnalysis =
    results.confidence !== undefined || results.riskFactors || results.recommendations || results.requiredUnits

  if (hasAIAnalysis) {
    return (
      <AIAnalysisDisplay
        analysis={{
          emergencyType: results.emergencyType,
          severity: results.severity,
          confidence: results.confidence || 0.85,
          riskFactors: results.riskFactors || [],
          recommendations: results.recommendations || [],
          estimatedCasuality: results.estimatedCasuality || 0,
          responseTime: results.responseTime || results.dispatchedUnit.eta,
          requiredUnits: results.requiredUnits || [],
          analysisDetails: results.analysisDetails,
          keywords: results.keywords || [],
        }}
        dispatchedUnit={results.dispatchedUnit}
      />
    )
  }

  return (
    <div className="space-y-4">
      {/* Emergency Type & Severity */}
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h3 className="font-semibold text-white">Emergency Analysis</h3>
          </div>
          <Badge className={`${getSeverityColor(results.severity)} border`}>{results.severity.toUpperCase()}</Badge>
        </div>
        <p className="text-sm text-slate-300">{results.emergencyType}</p>
      </Card>

      {/* Dispatched Unit */}
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Ambulance className="w-5 h-5 text-blue-400" />
          <h3 className="font-semibold text-white">Dispatched Unit</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">Unit ID:</span>
            <span className="text-white font-mono">{results.dispatchedUnit.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Type:</span>
            <span className="text-white">{results.dispatchedUnit.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Distance:</span>
            <span className="text-white">{results.dispatchedUnit.distance} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">ETA:</span>
            <span className="text-white font-semibold">{results.dispatchedUnit.eta} min</span>
          </div>
        </div>
      </Card>

      {/* Nearby Units */}
      {results.nearestAmbulances.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <h3 className="font-semibold text-white mb-3 text-sm">Nearby Units</h3>
          <div className="space-y-2">
            {results.nearestAmbulances.map((unit, idx) => (
              <div key={idx} className="flex justify-between text-sm p-2 rounded bg-slate-700/30">
                <span className="text-slate-400">{unit.id}</span>
                <span className="text-slate-300">
                  {unit.distance} km • {unit.eta} min
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Manual Attention Alert */}
      {results.manualAttentionNeeded && (
        <Card className="bg-orange-500/10 border-orange-500/50 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-orange-400 text-sm">Manual Review Required</p>
              <p className="text-xs text-orange-300 mt-1">
                This emergency requires manual operator attention. A dispatcher will contact you shortly.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis Details */}
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <p className="text-xs text-slate-400 leading-relaxed">{results.analysisDetails}</p>
      </Card>
    </div>
  )
}
