"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

interface LocationData {
  society: string
  area: string
  city: string
  state: string
  latitude: number | null
  longitude: number | null
  isLoading: boolean
  error: string | null
  permissionDenied: boolean
  displayText: string
}

interface LocationContextType extends LocationData {
  requestLocation: () => void
  setManualLocation: (
    society: string,
    area: string,
    city: string,
    state: string,
  ) => void
}

const LOCATION_STORAGE_KEY = "feast_user_location"

const defaultLocation: LocationData = {
  society: "",
  area: "",
  city: "",
  state: "",
  latitude: null,
  longitude: null,
  isLoading: true,
  error: null,
  permissionDenied: false,
  displayText: "Detecting location...",
}

const LocationContext = createContext<LocationContextType>({
  ...defaultLocation,
  requestLocation: () => {},
  setManualLocation: () => {},
})

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState<LocationData>(defaultLocation)

  const computeDisplayText = (
    society: string,
    area: string,
    city: string,
  ) => {
    if (society && area) return `${society}, ${area}`
    if (area && city) return `${area}, ${city}`
    if (city) return city
    return "Select Location"
  }

  /* ================= LOAD FROM STORAGE ================= */
  useEffect(() => {
    const stored = localStorage.getItem(LOCATION_STORAGE_KEY)
    if (!stored) {
      requestLocation()
      return
    }

    try {
      const parsed = JSON.parse(stored)
      setLocation({
        ...parsed,
        isLoading: false,
        error: null,
        displayText: computeDisplayText(
          parsed.society,
          parsed.area,
          parsed.city,
        ),
      })
    } catch {
      requestLocation()
    }
  }, [])

  const saveLocation = (
    society: string,
    area: string,
    city: string,
    state: string,
    lat: number | null,
    lng: number | null,
  ) => {
    localStorage.setItem(
      LOCATION_STORAGE_KEY,
      JSON.stringify({
        society,
        area,
        city,
        state,
        latitude: lat,
        longitude: lng,
      }),
    )
  }

  /* ================= REVERSE GEOCODE ================= */
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "feast-app",
          },
        },
      )

      const data = await res.json()
      const a = data.address || {}

      /* ===== SOCIETY / BUILDING ===== */
      const society =
        a.neighbourhood ||
        a.residential ||
        a.building ||
        a.house ||
        a.road ||
        ""

      /* ===== AREA / LOCALITY ===== */
      const area =
        a.suburb ||
        a.sublocality ||
        a.locality ||
        a.quarter ||
        a.village ||
        ""

      /* ===== CITY (STRICT – NO TALUKA) ===== */
      let city = ""
      if (a.city) city = a.city
      else if (a.town) city = a.town
      else if (a.municipality) city = a.municipality

      if (!city) city = a.village || "Unknown City"

      const state = a.state || ""

      return { society, area, city, state }
    } catch {
      return {
        society: "",
        area: "",
        city: "Unknown City",
        state: "",
      }
    }
  }

  /* ================= REQUEST LOCATION ================= */
  const requestLocation = () => {
    setLocation((p) => ({
      ...p,
      isLoading: true,
      error: null,
      displayText: "Detecting location...",
    }))

    if (!navigator.geolocation) {
      setLocation({
        ...defaultLocation,
        city: "Ahmedabad",
        state: "Gujarat",
        isLoading: false,
        displayText: "Ahmedabad",
      })
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        const { society, area, city, state } = await reverseGeocode(
          latitude,
          longitude,
        )

        saveLocation(society, area, city, state, latitude, longitude)

        setLocation({
          society,
          area,
          city,
          state,
          latitude,
          longitude,
          isLoading: false,
          error: null,
          permissionDenied: false,
          displayText: computeDisplayText(society, area, city),
        })
      },
      (err) => {
        setLocation((p) => ({
          ...p,
          isLoading: false,
          permissionDenied: err.code === err.PERMISSION_DENIED,
          error: err.message,
          displayText: computeDisplayText(
            p.society,
            p.area,
            p.city || "Ahmedabad",
          ),
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      },
    )
  }

  /* ================= MANUAL LOCATION ================= */
  const setManualLocation = (
    society: string,
    area: string,
    city: string,
    state: string,
  ) => {
    saveLocation(society, area, city, state, null, null)

    setLocation({
      society,
      area,
      city,
      state,
      latitude: null,
      longitude: null,
      isLoading: false,
      error: null,
      permissionDenied: false,
      displayText: computeDisplayText(society, area, city),
    })
  }

  return (
    <LocationContext.Provider
      value={{ ...location, requestLocation, setManualLocation }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => useContext(LocationContext)
