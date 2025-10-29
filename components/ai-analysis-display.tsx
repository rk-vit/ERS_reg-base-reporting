"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Ambulance, AlertTriangle, CheckCircle2, Brain, Clock, Users, Zap } from "lucide-react"

interface AIAnalysisResult {
  emergencyType: string
  severity: "critical" | "high" | "medium" | "low"
  confidence: number
  riskFactors: Array<{
    factor: string
    severity: "high" | "medium" | "low"
    description: string
  }>
  recommendations: string[]
  estimatedCasuality: number
  responseTime: number
  requiredUnits: Array<{
    type: string
    count: number
    priority: "immediate" | "secondary"
  }>
  analysisDetails: string
  keywords: string[]
}

interface AIAnalysisDisplayProps {
  analysis: AIAnalysisResult
  dispatchedUnit?: {
    id: string
    type: string
    eta: number
    distance: number
  }
}

export default function AIAnalysisDisplay({ analysis, dispatchedUnit }: AIAnalysisDisplayProps) {
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

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      default:
        return "text-green-400"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "bg-green-500"
    if (confidence >= 0.7) return "bg-blue-500"
    if (confidence >= 0.5) return "bg-yellow-500"
    return "bg-orange-500"
  }

  return (
    <div className="space-y-4">
      {/* Emergency Type & Severity */}
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">AI Analysis</h3>
          </div>
          <Badge className={`${getSeverityColor(analysis.severity)} border`}>{analysis.severity.toUpperCase()}</Badge>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-slate-400 mb-1">Emergency Type</p>
            <p className="text-lg font-semibold text-white">{analysis.emergencyType}</p>
          </div>

          {/* Confidence Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-400">Analysis Confidence</p>
              <span className="text-sm font-semibold text-white">{(analysis.confidence * 100).toFixed(0)}%</span>
            </div>
            <Progress value={analysis.confidence * 100} className="h-2" />
          </div>

          {/* Keywords */}
          {analysis.keywords && analysis.keywords.length > 0 && (
            <div>
              <p className="text-xs text-slate-400 mb-2">Detected Keywords</p>
              <div className="flex flex-wrap gap-1">
                {analysis.keywords.map((keyword, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-slate-700/50 border-slate-600">
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Risk Factors */}
      {analysis.riskFactors && analysis.riskFactors.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            <h3 className="font-semibold text-white">Risk Factors</h3>
          </div>
          <div className="space-y-2">
            {analysis.riskFactors.map((risk, idx) => (
              <div key={idx} className="p-2 rounded bg-slate-700/30 border border-slate-600">
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-sm font-medium ${getRiskColor(risk.severity)}`}>{risk.factor}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      risk.severity === "high"
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : risk.severity === "medium"
                          ? "bg-yellow-500/20 border-yellow-500 text-yellow-400"
                          : "bg-green-500/20 border-green-500 text-green-400"
                    }`}
                  >
                    {risk.severity}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400">{risk.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Required Units */}
      {analysis.requiredUnits && analysis.requiredUnits.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Ambulance className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Required Units</h3>
          </div>
          <div className="space-y-2">
            {analysis.requiredUnits.map((unit, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-700/30">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-300">{unit.type}</span>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      unit.priority === "immediate"
                        ? "bg-red-500/20 border-red-500 text-red-400"
                        : "bg-blue-500/20 border-blue-500 text-blue-400"
                    }`}
                  >
                    {unit.priority}
                  </Badge>
                </div>
                <span className="text-sm font-semibold text-white">x{unit.count}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Response Metrics */}
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-yellow-400" />
          <h3 className="font-semibold text-white">Response Metrics</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-2 rounded bg-slate-700/30">
            <div className="flex items-center gap-1 mb-1">
              <Clock className="w-4 h-4 text-slate-400" />
              <p className="text-xs text-slate-400">Response Time</p>
            </div>
            <p className="text-lg font-semibold text-white">{analysis.responseTime} min</p>
          </div>
          <div className="p-2 rounded bg-slate-700/30">
            <div className="flex items-center gap-1 mb-1">
              <Users className="w-4 h-4 text-slate-400" />
              <p className="text-xs text-slate-400">Est. Casualties</p>
            </div>
            <p className="text-lg font-semibold text-white">{analysis.estimatedCasuality}</p>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      {analysis.recommendations && analysis.recommendations.length > 0 && (
        <Card className="bg-slate-800/50 border-slate-700 p-4">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            <h3 className="font-semibold text-white">Recommendations</h3>
          </div>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex gap-2 text-sm text-slate-300">
                <span className="text-green-400 font-bold">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Dispatched Unit Status */}
      {dispatchedUnit && (
        <Card className="bg-blue-500/10 border-blue-500/30 p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <Ambulance className="w-5 h-5 text-blue-400" />
              <span className="font-semibold text-white text-sm">Unit Dispatched</span>
            </div>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50">{dispatchedUnit.type}</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs text-slate-300 mt-3">
            <div>
              <span className="text-slate-400">ID:</span>
              <p className="font-mono text-white">{dispatchedUnit.id}</p>
            </div>
            <div>
              <span className="text-slate-400">Distance:</span>
              <p className="font-semibold text-white">{dispatchedUnit.distance.toFixed(1)} km</p>
            </div>
            <div>
              <span className="text-slate-400">ETA:</span>
              <p className="font-semibold text-white">{dispatchedUnit.eta} min</p>
            </div>
          </div>
        </Card>
      )}

      {/* Analysis Details */}
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <p className="text-xs text-slate-400 leading-relaxed">{analysis.analysisDetails}</p>
      </Card>
    </div>
  )
}
