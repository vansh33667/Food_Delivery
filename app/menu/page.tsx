"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Leaf, ChevronDown, X } from "lucide-react"
import { getFoodItems, cuisines, categories } from "@/lib/food-data"
import { FoodCard } from "@/components/food-card"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const ITEMS_PER_PAGE = 24

function FoodCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      <Skeleton className="aspect-square" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedMealType, setSelectedMealType] = useState<string>("all")
  const [isVegOnly, setIsVegOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>("popular")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Get all food items
  const allItems = useMemo(() => getFoodItems(), [])

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

    // Cuisine filter
    if (selectedCuisine !== "all") {
      items = items.filter((item) => item.cuisine === selectedCuisine)
    }

    // Category filter
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory)
    }

    // Meal type filter
    if (selectedMealType !== "all") {
      items = items.filter((item) => item.mealType === selectedMealType || item.mealType === "all")
    }

    // Veg filter
    if (isVegOnly) {
      items = items.filter((item) => item.isVeg)
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        items.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        items.sort((a, b) => b.price - a.price)
        break
      case "rating":
        items.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        items.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Popular - sort by rating
        items.sort((a, b) => b.rating - a.rating)
    }

    return items
  }, [allItems, searchQuery, selectedCuisine, selectedCategory, selectedMealType, isVegOnly, sortBy])

  // Visible items for virtualization
  const visibleItems = useMemo(() => filteredItems.slice(0, visibleCount), [filteredItems, visibleCount])

  // Infinite scroll
  const loadMore = useCallback(() => {
    if (visibleCount < filteredItems.length) {
      setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, filteredItems.length))
    }
  }, [visibleCount, filteredItems.length])

  // Intersection observer for infinite scroll
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
  }, [searchQuery, selectedCuisine, selectedCategory, selectedMealType, isVegOnly, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCuisine("all")
    setSelectedCategory("all")
    setSelectedMealType("all")
    setIsVegOnly(false)
    setSortBy("popular")
  }

  const hasActiveFilters =
    searchQuery ||
    selectedCuisine !== "all" ||
    selectedCategory !== "all" ||
    selectedMealType !== "all" ||
    isVegOnly ||
    sortBy !== "popular"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Our Menu</h1>
            <p className="text-muted-foreground">
              Explore {allItems.length.toLocaleString()}+ delicious dishes from around the world
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search dishes, cuisines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-3">
                <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                  <SelectTrigger className="w-40 h-11">
                    <SelectValue placeholder="Cuisine" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Cuisines</SelectItem>
                    {cuisines.map((cuisine) => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40 h-11">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                  <SelectTrigger className="w-36 h-11">
                    <SelectValue placeholder="Meal Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Meals</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={isVegOnly ? "default" : "outline"}
                  className={`h-11 gap-2 ${!isVegOnly && "bg-transparent"}`}
                  onClick={() => setIsVegOnly(!isVegOnly)}
                >
                  <Leaf className="h-4 w-4" />
                  Veg Only
                </Button>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-36 h-11">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Popular</SelectItem>
                    <SelectItem value="rating">Top Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-11 gap-2 bg-transparent">
                    <Filter className="h-4 w-4" />
                    Filters
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-1">
                        Active
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="space-y-6 py-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Cuisine</label>
                      <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cuisines</SelectItem>
                          {cuisines.map((cuisine) => (
                            <SelectItem key={cuisine} value={cuisine}>
                              {cuisine}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Category</label>
                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Meal Type</label>
                      <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select meal type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Meals</SelectItem>
                          <SelectItem value="breakfast">Breakfast</SelectItem>
                          <SelectItem value="lunch">Lunch</SelectItem>
                          <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Diet</label>
                      <Button
                        variant={isVegOnly ? "default" : "outline"}
                        className={`w-full gap-2 ${!isVegOnly && "bg-transparent"}`}
                        onClick={() => setIsVegOnly(!isVegOnly)}
                      >
                        <Leaf className="h-4 w-4" />
                        Vegetarian Only
                      </Button>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Sort By</label>
                      <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popular">Popular</SelectItem>
                          <SelectItem value="rating">Top Rated</SelectItem>
                          <SelectItem value="price-low">Price: Low to High</SelectItem>
                          <SelectItem value="price-high">Price: High to Low</SelectItem>
                          <SelectItem value="name">Name A-Z</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {hasActiveFilters && (
                      <Button variant="outline" className="w-full bg-transparent" onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedCuisine !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCuisine}
                    <button onClick={() => setSelectedCuisine("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedMealType !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedMealType}
                    <button onClick={() => setSelectedMealType("all")}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {isVegOnly && (
                  <Badge variant="secondary" className="gap-1">
                    Veg Only
                    <button onClick={() => setIsVegOnly(false)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <button onClick={clearFilters} className="text-sm text-primary hover:underline ml-2">
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {visibleItems.length.toLocaleString()} of {filteredItems.length.toLocaleString()} items
            </p>
          </div>

          {/* Food Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <FoodCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No dishes found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleItems.map((item) => (
                  <FoodCard key={item.id} item={item} />
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
  )
}
