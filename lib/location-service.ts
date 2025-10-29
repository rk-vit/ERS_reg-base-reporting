// Location service utility for GPS capture and management
export interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
  altitude?: number
  heading?: number
  speed?: number
}

export interface LocationError {
  code: number
  message: string
}

class LocationService {
  private watchId: number | null = null
  private locationCache: LocationData | null = null
  private listeners: Set<(location: LocationData) => void> = new Set()
  private errorListeners: Set<(error: LocationError) => void> = new Set()
  private retryCount = 0
  private maxRetries = 3

  /**
   * Get current location with high accuracy
   */
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject({
          code: 0,
          message: "Geolocation is not supported by this browser",
        })
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
            altitude: position.coords.altitude || undefined,
            heading: position.coords.heading || undefined,
            speed: position.coords.speed || undefined,
          }
          this.locationCache = locationData
          this.retryCount = 0
          resolve(locationData)
        },
        (error) => {
          if (error.code === 3 && this.retryCount < this.maxRetries) {
            this.retryCount++
            console.log(`[v0] Location timeout, retrying (${this.retryCount}/${this.maxRetries})`)
            setTimeout(() => {
              this.getCurrentLocation().then(resolve).catch(reject)
            }, 1000 * this.retryCount) // Exponential backoff
            return
          }

          if (this.locationCache && error.code === 3) {
            console.log("[v0] Using cached location due to timeout")
            resolve(this.locationCache)
            return
          }

          const errorData: LocationError = {
            code: error.code,
            message: this.getErrorMessage(error.code),
          }
          this.notifyErrorListeners(errorData)
          this.retryCount = 0
          reject(errorData)
        },
        {
          enableHighAccuracy: true,
          timeout: 30000, // Increased from 10s to 30s
          maximumAge: 5000, // Allow 5s old location to speed up response
        },
      )
    })
  }

  /**
   * Watch location changes in real-time
   */
  watchLocation(
    onLocationChange: (location: LocationData) => void,
    onError?: (error: LocationError) => void,
  ): () => void {
    if (!navigator.geolocation) {
      const error: LocationError = {
        code: 0,
        message: "Geolocation is not supported",
      }
      onError?.(error)
      return () => {}
    }

    this.listeners.add(onLocationChange)
    if (onError) {
      this.errorListeners.add(onError)
    }

    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
          altitude: position.coords.altitude || undefined,
          heading: position.coords.heading || undefined,
          speed: position.coords.speed || undefined,
        }
        this.locationCache = locationData
        this.notifyListeners(locationData)
      },
      (error) => {
        if (error.code === 3 && this.locationCache) {
          console.log("[v0] Location watch timeout, using cached location")
          this.notifyListeners(this.locationCache)
          return
        }

        const errorData: LocationError = {
          code: error.code,
          message: this.getErrorMessage(error.code),
        }
        this.notifyErrorListeners(errorData)
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // Increased from 10s to 30s
        maximumAge: 10000, // Increased from 5s to 10s to allow more cached results
      },
    )

    // Return unsubscribe function
    return () => {
      this.listeners.delete(onLocationChange)
      if (onError) {
        this.errorListeners.delete(onError)
      }
      if (this.listeners.size === 0 && this.watchId !== null) {
        navigator.geolocation.clearWatch(this.watchId)
        this.watchId = null
      }
    }
  }

  /**
   * Stop watching location
   */
  stopWatching(): void {
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId)
      this.watchId = null
    }
    this.listeners.clear()
    this.errorListeners.clear()
  }

  /**
   * Get cached location
   */
  getCachedLocation(): LocationData | null {
    return this.locationCache
  }

  /**
   * Calculate distance between two coordinates (in km)
   */
  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  /**
   * Check if location accuracy is acceptable
   */
  static isAccuracyAcceptable(accuracy: number, threshold = 50): boolean {
    return accuracy <= threshold
  }

  private notifyListeners(location: LocationData): void {
    this.listeners.forEach((listener) => listener(location))
  }

  private notifyErrorListeners(error: LocationError): void {
    this.errorListeners.forEach((listener) => listener(error))
  }

  private getErrorMessage(code: number): string {
    switch (code) {
      case 1:
        return "Permission denied. Please enable location access."
      case 2:
        return "Position unavailable. Unable to retrieve location."
      case 3:
        return "Request timeout. Location request took too long."
      default:
        return "Unknown location error occurred."
    }
  }
}

export const locationService = new LocationService()
