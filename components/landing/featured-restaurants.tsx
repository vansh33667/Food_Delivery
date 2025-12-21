"use client"

import { useState } from "react"
import Link from "next/link"
import { Star, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getFoodItems } from "@/lib/food-data"
import { formatPrice } from "@/lib/format-price"

export function FeaturedRestaurants() {
  const allItems = getFoodItems()
  
  // Get diverse items from different cuisines
  const featuredItems: typeof allItems = []
  const cuisinesUsed = new Set<string>()
  
  for (const item of allItems) {
    if (!cuisinesUsed.has(item.cuisine) && featuredItems.length < 6) {
      featuredItems.push(item)
      cuisinesUsed.add(item.cuisine)
    }
  }
  
  // If we don't have 6, fill with remaining items
  if (featuredItems.length < 6) {
    for (const item of allItems) {
      if (!featuredItems.find(f => f.id === item.id) && featuredItems.length < 6) {
        featuredItems.push(item)
      }
    }
  }

  return (
    <section id="restaurants" className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 mb-10 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Featured Items</h2>
            <p className="mt-2 text-muted-foreground">Hand-picked favorites from our community</p>
          </div>
          <Button
            variant="outline"
            className="rounded-full bg-transparent active:scale-95 transition-transform"
            asChild
          >
            <Link href="/menu">View All Items</Link>
          </Button>
        </div>

        {/* Food Items Grid - Now clickable */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredItems.map((item) => (
            <FeaturedFoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedFoodCard({ item }: { item: ReturnType<typeof getFoodItems>[0] }) {
  const [imageError, setImageError] = useState(false)

  const imageSrc = imageError
    ? `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(item.name)}`
    : item.image || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(item.name)}`

  return (
    <Link
      href={`/item/${item.id}`}
      className="group overflow-hidden rounded-2xl bg-card border border-border shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 block active:scale-[0.98]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={item.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageError(true)}
        />

        {/* Veg/Non-Veg Badge */}
        <div
          className={`absolute left-3 top-3 w-6 h-6 rounded border-2 flex items-center justify-center ${
            item.isVeg ? "border-green-600 bg-white" : "border-red-600 bg-white"
          }`}
        >
          <div className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm shadow-sm transition-colors hover:bg-card active:scale-90"
          suppressHydrationWarning
        >
          <Heart className="h-5 w-5 text-muted-foreground transition-colors hover:text-primary" />
          <span className="sr-only">Add to favorites</span>
        </button>

        {/* Rating Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-xs font-medium text-foreground">{item.rating}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-sm text-muted-foreground">{item.cuisine}</p>
          </div>
          <span className="font-bold text-primary whitespace-nowrap">{formatPrice(item.price)}</span>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{item.prepTime}</span>
          </div>
          <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
          <Badge variant="secondary" className="text-xs">
            {item.category}
          </Badge>
        </div>
      </div>
    </Link>
  )
}
