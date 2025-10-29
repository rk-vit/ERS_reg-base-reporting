"use client"

import { useState, useEffect } from "react"
import EmergencyReporter from "@/components/emergency-reporter"
import ResultsDisplay from "@/components/results-display"
import EmergencyMap from "@/components/emergency-map"
import LanguageSelector from "@/components/language-selector"
import { type LanguageCode, detectBrowserLanguage } from "@/lib/translations"

export default function Home() {
  const [language, setLanguage] = useState<LanguageCode>("en")
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedLanguage = localStorage.getItem("preferred-language") as LanguageCode | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    } else {
      const detectedLanguage = detectBrowserLanguage()
      setLanguage(detectedLanguage)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      const isRTL = language === "ar"
      document.documentElement.dir = isRTL ? "rtl" : "ltr"
      document.documentElement.lang = language
    }
  }, [language, mounted])

  const handleLanguageChange = (newLanguage: LanguageCode) => {
    setLanguage(newLanguage)
  }

  const handleResults = (data: any) => {
    setResults(data)
    if (data.userLocation) {
      setUserLocation(data.userLocation)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">🚨</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Emergency Response</h1>
              <p className="text-xs text-slate-400">Voice-Powered Emergency Dispatch</p>
            </div>
          </div>
          <LanguageSelector language={language} onLanguageChange={handleLanguageChange} />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Emergency Reporter */}
          <div className="lg:col-span-2 space-y-6">
            <EmergencyReporter
              language={language}
              onResults={handleResults}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />

            {/* Map */}
            {results && (
              <EmergencyMap
                userLocation={
                  userLocation ||
                  (results.userLocation ? { lat: results.userLocation.lat, lng: results.userLocation.lng } : null)
                }
                dispatchedUnit={
                  results.dispatchedUnit
                    ? {
                        id: results.dispatchedUnit.id,
                        lat: results.dispatchedUnit.lat || 40.7128,
                        lng: results.dispatchedUnit.lng || -74.006,
                        type: results.dispatchedUnit.type,
                        eta: results.dispatchedUnit.eta,
                        distance: results.dispatchedUnit.distance,
                        status: "en-route",
                      }
                    : null
                }
                nearbyUnits={
                  results.nearestAmbulances?.map((unit: any) => ({
                    id: unit.id,
                    lat: unit.lat || 40.7128,
                    lng: unit.lng || -74.006,
                    type: "Ambulance",
                    distance: unit.distance,
                    eta: unit.eta,
                  })) || []
                }
                isLoading={isLoading}
              />
            )}
          </div>

          {/* Results Display */}
          <div className="lg:col-span-1">
            {results ? (
              <ResultsDisplay results={results} />
            ) : (
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                <p className="text-slate-400">Report an emergency to see dispatch details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
