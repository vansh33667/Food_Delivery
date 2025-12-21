"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Star, MapPin, Clock, Phone, Globe, ArrowLeft, Users, Check, Utensils, IndianRupee } from "lucide-react"
import { getRestaurantById, type Restaurant } from "@/lib/restaurant-data"

interface BookingFormData {
  name: string
  phone: string
  email: string
  date: string
  time: string
  guests: string
}

export default function RestaurantDetailPage() {
  const params = useParams()
  const router = useRouter()

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [bookingStep, setBookingStep] = useState<"form" | "confirming" | "success">("form")
  const [bookingData, setBookingData] = useState<BookingFormData>({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
  })

  const restaurantId = params.id as string

  useEffect(() => {
    console.log("[v0] RestaurantDetailPage mounted with params:", params)
    console.log("[v0] restaurantId from params:", restaurantId)
  }, [params, restaurantId])

  useEffect(() => {
    const fetchRestaurant = async () => {
      console.log("[v0] Fetching restaurant with id:", restaurantId)
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const found = getRestaurantById(restaurantId)
      console.log("[v0] Found restaurant:", found ? found.name : "NOT FOUND")
      setRestaurant(found || null)
      setIsLoading(false)
    }

    if (restaurantId) {
      fetchRestaurant()
    }
  }, [restaurantId])

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBookingStep("confirming")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setBookingStep("success")
  }

  const resetBooking = () => {
    setBookingStep("form")
    setBookingData({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      guests: "2",
    })
    setIsBookingModalOpen(false)
  }

  // Generate time slots
  const timeSlots = []
  for (let hour = 10; hour <= 22; hour++) {
    timeSlots.push(`${hour}:00`)
    timeSlots.push(`${hour}:30`)
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split("T")[0]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-6" />
            <Skeleton className="aspect-[21/9] rounded-2xl mb-8" />
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
              </div>
              <div>
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Restaurant not found</h1>
            <p className="text-muted-foreground mb-6">The restaurant you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/restaurants")}>Back to Restaurants</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Restaurants
          </motion.button>

          {/* Cover Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative aspect-[21/9] rounded-2xl overflow-hidden bg-secondary mb-8"
          >
            <img
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              <Badge
                className={`${
                  restaurant.type === "Hotel"
                    ? "bg-purple-500"
                    : restaurant.type === "Cafe"
                      ? "bg-amber-500"
                      : restaurant.type === "Food Outlet"
                        ? "bg-blue-500"
                        : "bg-emerald-500"
                } text-white`}
              >
                {restaurant.type}
              </Badge>
              {restaurant.offer && <Badge className="bg-red-500 text-white">{restaurant.offer}</Badge>}
            </div>

            {/* Restaurant Name on Image */}
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{restaurant.name}</h1>
              <div className="flex items-center gap-3 text-white/90">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="font-semibold">{restaurant.rating}</span>
                  <span className="text-white/70">({restaurant.reviews.toLocaleString()} reviews)</span>
                </div>
                <span className="text-white/50">|</span>
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="md:col-span-2 space-y-8"
            >
              {/* Cuisines */}
              <div>
                <h2 className="font-semibold text-lg text-foreground mb-3">Cuisines</h2>
                <div className="flex flex-wrap gap-2">
                  {restaurant.cuisines.map((cuisine) => (
                    <Badge key={cuisine} variant="secondary" className="text-sm">
                      {cuisine}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="font-semibold text-lg text-foreground mb-3">About</h2>
                <p className="text-muted-foreground leading-relaxed">{restaurant.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium text-foreground">{restaurant.address}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timing</p>
                      <p className="font-medium text-foreground">
                        {restaurant.openingTime} - {restaurant.closingTime}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium text-foreground">
                        {restaurant.city}, {restaurant.state}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Price Range</p>
                      <p className="font-medium text-foreground">
                        {restaurant.priceRange === "₹"
                          ? "Budget Friendly"
                          : restaurant.priceRange === "₹₹"
                            ? "Moderate"
                            : restaurant.priceRange === "₹₹₹"
                              ? "Premium"
                              : "Luxury Dining"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="bg-card border border-border rounded-2xl p-6 sticky top-28">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Utensils className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Book a Table</h3>
                    <p className="text-sm text-muted-foreground">Reserve your spot</p>
                  </div>
                </div>

                <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full h-12 text-base" size="lg">
                      Book Table
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <AnimatePresence mode="wait">
                      {bookingStep === "form" && (
                        <motion.div
                          key="form"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                        >
                          <DialogHeader>
                            <DialogTitle>Book a Table at {restaurant.name}</DialogTitle>
                            <DialogDescription>Fill in the details to reserve your table</DialogDescription>
                          </DialogHeader>

                          <form onSubmit={handleBookingSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                placeholder="John Doe"
                                value={bookingData.name}
                                onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                value={bookingData.phone}
                                onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                                required
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={bookingData.email}
                                onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                                required
                              />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="date">Date</Label>
                                <Input
                                  id="date"
                                  type="date"
                                  min={today}
                                  value={bookingData.date}
                                  onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                                  required
                                />
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="time">Time</Label>
                                <Select
                                  value={bookingData.time}
                                  onValueChange={(value) => setBookingData({ ...bookingData, time: value })}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select time" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {timeSlots.map((slot) => (
                                      <SelectItem key={slot} value={slot}>
                                        {slot}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="guests">Number of Guests</Label>
                              <Select
                                value={bookingData.guests}
                                onValueChange={(value) => setBookingData({ ...bookingData, guests: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select guests" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <SelectItem key={num} value={num.toString()}>
                                      {num} {num === 1 ? "Guest" : "Guests"}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <Button type="submit" className="w-full" disabled={!bookingData.time}>
                              Confirm Booking
                            </Button>
                          </form>
                        </motion.div>
                      )}

                      {bookingStep === "confirming" && (
                        <motion.div
                          key="confirming"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="py-12 text-center"
                        >
                          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                          <h3 className="text-lg font-semibold text-foreground mb-2">Confirming your booking...</h3>
                          <p className="text-muted-foreground">Please wait while we reserve your table</p>
                        </motion.div>
                      )}

                      {bookingStep === "success" && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="py-8 text-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                          >
                            <Check className="w-10 h-10 text-green-600" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-foreground mb-2">Booking Confirmed!</h3>
                          <p className="text-muted-foreground mb-6">
                            Your table at {restaurant.name} has been reserved for {bookingData.guests} guests on{" "}
                            {bookingData.date} at {bookingData.time}
                          </p>
                          <div className="bg-secondary/50 rounded-xl p-4 text-left mb-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">Name</p>
                                <p className="font-medium">{bookingData.name}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Phone</p>
                                <p className="font-medium">{bookingData.phone}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Date</p>
                                <p className="font-medium">{bookingData.date}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Time</p>
                                <p className="font-medium">{bookingData.time}</p>
                              </div>
                            </div>
                          </div>
                          <Button onClick={resetBooking} className="w-full">
                            Done
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </DialogContent>
                </Dialog>

                <p className="text-xs text-muted-foreground text-center mt-4">Free cancellation up to 2 hours before</p>

                {/* Quick Info */}
                <div className="mt-6 pt-6 border-t border-border space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Open:</span>
                    <span className="font-medium">
                      {restaurant.openingTime} - {restaurant.closingTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className="font-medium">Up to 200 guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">+91 98765 43210</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
