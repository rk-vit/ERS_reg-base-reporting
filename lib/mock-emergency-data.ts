export interface MockEmergencyScenario {
  emergencyType: string
  severity: "low" | "medium" | "high" | "critical"
  confidence: number
  riskFactors: string[]
  recommendedUnits: Array<{ type: string; priority: string; count: number }>
  estimatedResponse: string
  manualAttentionNeeded: boolean
}

const emergencyScenarios: MockEmergencyScenario[] = [
  {
    emergencyType: "Cardiac Arrest",
    severity: "critical",
    confidence: 0.92,
    riskFactors: ["Unconscious", "No pulse detected", "Requires immediate CPR", "Defibrillator needed"],
    recommendedUnits: [
      { type: "ambulance", priority: "critical", count: 2 },
      { type: "paramedic", priority: "critical", count: 2 },
    ],
    estimatedResponse: "5-8 minutes",
    manualAttentionNeeded: true,
  },
  {
    emergencyType: "Traffic Accident",
    severity: "high",
    confidence: 0.88,
    riskFactors: ["Multiple vehicles involved", "Potential injuries", "Road hazard", "Traffic congestion"],
    recommendedUnits: [
      { type: "ambulance", priority: "high", count: 2 },
      { type: "fire-truck", priority: "high", count: 1 },
      { type: "police", priority: "medium", count: 1 },
    ],
    estimatedResponse: "8-12 minutes",
    manualAttentionNeeded: false,
  },
  {
    emergencyType: "Severe Allergic Reaction",
    severity: "high",
    confidence: 0.85,
    riskFactors: ["Difficulty breathing", "Anaphylaxis risk", "Requires epinephrine", "Airway compromise"],
    recommendedUnits: [
      { type: "ambulance", priority: "critical", count: 1 },
      { type: "paramedic", priority: "high", count: 1 },
    ],
    estimatedResponse: "6-10 minutes",
    manualAttentionNeeded: false,
  },
  {
    emergencyType: "Building Fire",
    severity: "critical",
    confidence: 0.95,
    riskFactors: ["Active fire", "Smoke inhalation risk", "Potential trapped persons", "Structural hazard"],
    recommendedUnits: [
      { type: "fire-truck", priority: "critical", count: 3 },
      { type: "ambulance", priority: "high", count: 2 },
      { type: "police", priority: "high", count: 1 },
    ],
    estimatedResponse: "4-7 minutes",
    manualAttentionNeeded: true,
  },
  {
    emergencyType: "Severe Bleeding",
    severity: "high",
    confidence: 0.89,
    riskFactors: ["Uncontrolled bleeding", "Shock risk", "Requires transfusion", "Possible fracture"],
    recommendedUnits: [
      { type: "ambulance", priority: "critical", count: 1 },
      { type: "paramedic", priority: "high", count: 2 },
    ],
    estimatedResponse: "7-11 minutes",
    manualAttentionNeeded: false,
  },
  {
    emergencyType: "Choking",
    severity: "high",
    confidence: 0.91,
    riskFactors: ["Airway obstruction", "Loss of consciousness risk", "Requires immediate intervention"],
    recommendedUnits: [
      { type: "ambulance", priority: "critical", count: 1 },
      { type: "paramedic", priority: "critical", count: 1 },
    ],
    estimatedResponse: "5-9 minutes",
    manualAttentionNeeded: false,
  },
  {
    emergencyType: "Stroke Symptoms",
    severity: "high",
    confidence: 0.87,
    riskFactors: ["Facial drooping", "Arm weakness", "Speech difficulty", "Time-critical condition"],
    recommendedUnits: [
      { type: "ambulance", priority: "critical", count: 1 },
      { type: "paramedic", priority: "high", count: 1 },
    ],
    estimatedResponse: "6-10 minutes",
    manualAttentionNeeded: false,
  },
  {
    emergencyType: "Poisoning/Overdose",
    severity: "high",
    confidence: 0.84,
    riskFactors: [
      "Altered consciousness",
      "Respiratory depression",
      "Requires antidote",
      "Toxin identification needed",
    ],
    recommendedUnits: [
      { type: "ambulance", priority: "critical", count: 1 },
      { type: "paramedic", priority: "high", count: 2 },
    ],
    estimatedResponse: "7-12 minutes",
    manualAttentionNeeded: true,
  },
  {
    emergencyType: "Chest Pain",
    severity: "high",
    confidence: 0.82,
    riskFactors: ["Possible myocardial infarction", "Cardiac monitoring needed", "Requires ECG"],
    recommendedUnits: [
      { type: "ambulance", priority: "high", count: 1 },
      { type: "paramedic", priority: "high", count: 1 },
    ],
    estimatedResponse: "8-13 minutes",
    manualAttentionNeeded: false,
  },
  {
    emergencyType: "Difficulty Breathing",
    severity: "high",
    confidence: 0.86,
    riskFactors: ["Respiratory distress", "Oxygen saturation low", "Possible asthma/COPD exacerbation"],
    recommendedUnits: [
      { type: "ambulance", priority: "high", count: 1 },
      { type: "paramedic", priority: "high", count: 1 },
    ],
    estimatedResponse: "7-11 minutes",
    manualAttentionNeeded: false,
  },
]

const ambulanceUnits = [
  { id: "AMB-001", type: "ambulance", crew: "2 paramedics", status: "en-route" },
  { id: "AMB-002", type: "ambulance", crew: "1 paramedic, 1 EMT", status: "available" },
  { id: "AMB-003", type: "ambulance", crew: "2 paramedics", status: "available" },
  { id: "FIR-001", type: "fire-truck", crew: "4 firefighters", status: "available" },
  { id: "FIR-002", type: "fire-truck", crew: "4 firefighters", status: "available" },
  { id: "POL-001", type: "police", crew: "2 officers", status: "available" },
]

export function getRandomMockScenario(): MockEmergencyScenario {
  return emergencyScenarios[Math.floor(Math.random() * emergencyScenarios.length)]
}

export function generateMockResponse(latitude: number, longitude: number) {
  const scenario = getRandomMockScenario()
  const dispatchedUnit = ambulanceUnits[Math.floor(Math.random() * ambulanceUnits.length)]
  const nearbyUnits = ambulanceUnits
    .filter((u) => u.id !== dispatchedUnit.id)
    .slice(0, Math.floor(Math.random() * 3) + 1)
    .map((unit) => ({
      id: unit.id,
      type: unit.type,
      distance: Math.random() * 4 + 0.5,
      eta: `${Math.floor(Math.random() * 8) + 8}-${Math.floor(Math.random() * 8) + 15} minutes`,
      status: unit.status,
    }))

  return {
    success: true,
    emergencyId: `EMG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: "received",
    message: "Emergency report received and analyzed",
    emergencyType: scenario.emergencyType,
    severity: scenario.severity,
    confidence: scenario.confidence,
    riskFactors: scenario.riskFactors.map((factor) => ({
      factor,
      severity: scenario.severity === "critical" ? "high" : scenario.severity,
      description: `Risk factor identified during emergency analysis`,
    })),
    recommendations: [
      `Dispatch ${scenario.recommendedUnits.map((u) => u.type).join(", ")}`,
      `Estimated response time: ${scenario.estimatedResponse}`,
      "Ensure clear access to emergency location",
      "Prepare for immediate medical intervention",
    ],
    requiredUnits: scenario.recommendedUnits.map((unit) => ({
      type: unit.type,
      count: unit.count,
      priority: unit.priority as "immediate" | "secondary",
    })),
    estimatedCasuality: Math.floor(Math.random() * 3) + 1,
    responseTime: Number.parseInt(scenario.estimatedResponse.split("-")[0]),
    keywords: scenario.riskFactors,
    analysisDetails: `Emergency analysis indicates ${scenario.emergencyType.toLowerCase()}. ${scenario.riskFactors.join(", ")}. Immediate response required.`,
    dispatchedUnit: {
      id: dispatchedUnit.id,
      type: dispatchedUnit.type,
      status: dispatchedUnit.status,
      eta: Math.floor(Math.random() * 5) + 8,
      distance: Math.random() * 3 + 0.5,
      location: {
        latitude: latitude + (Math.random() - 0.5) * 0.02,
        longitude: longitude + (Math.random() - 0.5) * 0.02,
      },
      crew: dispatchedUnit.crew,
    },
    nearestAmbulances: nearbyUnits.map((unit) => ({
      id: unit.id,
      distance: unit.distance,
      eta: Number.parseInt(unit.eta.split("-")[0]),
    })),
    manualAttentionNeeded: scenario.manualAttentionNeeded,
    userLocation: {
      lat: latitude,
      lng: longitude,
    },
    timestamp: new Date().toISOString(),
  }
}
