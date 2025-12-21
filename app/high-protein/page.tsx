"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, Leaf, ChevronDown, Dumbbell, Info, Zap, Target, TrendingUp } from "lucide-react"
import { getHighProteinItems } from "@/lib/food-data"
import { FoodCard } from "@/components/food-card"

const ITEMS_PER_PAGE = 20

function ProteinCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      <Skeleton className="aspect-[4/3]" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-2 w-full rounded-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  )
}

const proteinBenefits = [
  {
    icon: Dumbbell,
    title: "Build Muscle",
    description: "Protein is essential for muscle growth and repair after workouts",
  },
  {
    icon: Zap,
    title: "Boost Energy",
    description: "High protein meals provide sustained energy throughout the day",
  },
  {
    icon: Target,
    title: "Stay Full Longer",
    description: "Protein increases satiety, helping you manage portions naturally",
  },
  {
    icon: TrendingUp,
    title: "Support Recovery",
    description: "Accelerate recovery and reduce muscle soreness post-exercise",
  },
]

export default function HighProteinPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVegOnly, setIsVegOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>("protein")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Get high protein items
  const allItems = useMemo(() => getHighProteinItems(), [])

  // Simulate initial load
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let items = [...allItems]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.cuisine.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query),
      )
    }

    // Veg filter
    if (isVegOnly) {
      items = items.filter((item) => item.isVeg)
    }

    // Sort
    switch (sortBy) {
      case "protein":
        items.sort((a, b) => (b.protein || 0) - (a.protein || 0))
        break
      case "price-low":
        items.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        items.sort((a, b) => b.price - a.price)
        break
      case "rating":
        items.sort((a, b) => b.rating - a.rating)
        break
      case "calories":
        items.sort((a, b) => a.calories - b.calories)
        break
      default:
        items.sort((a, b) => (b.protein || 0) - (a.protein || 0))
    }

    return items
  }, [allItems, searchQuery, isVegOnly, sortBy])

  // Visible items
  const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount])

  // Load more
  const loadMore = useCallback(() => {
    if (visibleCount < filteredItems.length) {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length))
    }
  }, [visibleCount, filteredItems.length])

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [loadMore])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE)
  }, [searchQuery, isVegOnly, sortBy])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-28 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-16 mb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full mb-6">
                  <Dumbbell className="h-4 w-4" />
                  <span className="text-sm font-medium">Fitness-Focused Meals</span>
                </div>

                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                  High Protein
                  <span className="text-emerald-600"> Power Meals</span>
                </h1>

                <p className="text-lg text-muted-foreground mb-8">
                  Fuel your fitness goals with our curated selection of protein-rich dishes. Every meal is designed to
                  help you build muscle, recover faster, and stay energized throughout the day.
                </p>

                {/* Benefits Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {proteinBenefits.map((benefit) => (
                    <Tooltip key={benefit.title}>
                      <TooltipTrigger asChild>
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 cursor-help hover:bg-white transition-colors">
                          <benefit.icon className="h-6 w-6 text-emerald-600 mb-2" />
                          <h3 className="font-medium text-sm text-foreground">{benefit.title}</h3>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="max-w-xs">
                        <p>{benefit.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Info Banner */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8 flex items-start gap-4">
              <Info className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Why High Protein?</h3>
                <p className="text-sm text-muted-foreground">
                  The recommended daily protein intake is 0.8g per kg of body weight for sedentary adults, and 1.2-2.0g
                  per kg for active individuals. Our high protein meals contain 20g+ of protein per serving, helping you
                  meet your daily goals deliciously.
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search high protein dishes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              <Button
                variant={isVegOnly ? "default" : "outline"}
                className={`h-11 gap-2 ${!isVegOnly && "bg-transparent"}`}
                onClick={() => setIsVegOnly(!isVegOnly)}
              >
                <Leaf className="h-4 w-4" />
                Veg Only
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-11">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="protein">Highest Protein</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="calories">Lowest Calories</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {visibleItems.length.toLocaleString()} of {filteredItems.length.toLocaleString()} high protein
                dishes
              </p>
            </div>

            {/* Food Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProteinCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-emerald-50 mx-auto mb-4 flex items-center justify-center">
                  <Dumbbell className="h-10 w-10 text-emerald-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No dishes found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setIsVegOnly(false)
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {visibleItems.map((item) => (
                    <FoodCard key={item.id} item={item} showProtein />
                  ))}
                </div>

                {/* Load More Trigger */}
                {visibleCount < filteredItems.length && (
                  <div ref={loadMoreRef} className="flex justify-center py-8">
                    <Button variant="outline" onClick={loadMore} className="gap-2 bg-transparent">
                      Load More
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </TooltipProvider>
  )
}
