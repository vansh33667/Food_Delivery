"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Navigation, Loader2 } from "lucide-react"
import { useLocation } from "@/contexts/location-context"

interface LocationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LocationModal({ open, onOpenChange }: LocationModalProps) {
  const { displayText, isLoading, permissionDenied, requestLocation, setManualLocation } = useLocation()
  const [manualSociety, setManualSociety] = useState("")
  const [manualCity, setManualCity] = useState("")
  const [manualState, setManualState] = useState("")
  const [showManual, setShowManual] = useState(false)

  const handleDetectLocation = () => {
    requestLocation()
    if (!permissionDenied) {
      setTimeout(() => onOpenChange(false), 1500)
    }
  }

  const handleManualSubmit = () => {
    if (manualCity.trim()) {
      setManualLocation(manualSociety.trim(), manualCity.trim(), manualState.trim())
      onOpenChange(false)
      setManualSociety("")
      setManualCity("")
      setManualState("")
      setShowManual(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Set Your Location
          </DialogTitle>
          <DialogDescription>
            {displayText && displayText !== "Detecting location..." && displayText !== "Select Location"
              ? `Current location: ${displayText}`
              : "Allow location access for the best delivery experience"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {!showManual ? (
            <>
              <Button onClick={handleDetectLocation} className="w-full h-12 gap-2" disabled={isLoading}>
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Navigation className="h-4 w-4" />}
                {isLoading ? "Detecting Location..." : "Detect My Location"}
              </Button>

              {permissionDenied && (
                <p className="text-sm text-amber-600 text-center">
                  Location access denied. Please enable it in your browser settings or enter manually.
                </p>
              )}

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or enter manually</span>
                </div>
              </div>

              <Button variant="outline" onClick={() => setShowManual(true)} className="w-full bg-transparent">
                Enter Location Manually
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="society">Society / Area Name</Label>
                  <Input
                    id="society"
                    placeholder="e.g., Shiv Shakti Society"
                    value={manualSociety}
                    onChange={(e) => setManualSociety(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="e.g., Ahmedabad"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="e.g., Gujarat"
                    value={manualState}
                    onChange={(e) => setManualState(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowManual(false)} className="flex-1 bg-transparent">
                  Back
                </Button>
                <Button onClick={handleManualSubmit} className="flex-1" disabled={!manualCity.trim()}>
                  Set Location
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
