"use client"

import type React from "react"

import { useState, useMemo, useCallback, useRef, useEffect, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Leaf, ChevronDown, X, Star, Clock, Flame, Tag, Heart, ShoppingCart } from "lucide-react"
import { getOffers99Items } from "@/lib/offers-data"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import type { FoodItem } from "@/lib/food-data"

const ITEMS_PER_PAGE = 24

function OfferCardSkeleton() {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border">
      <Skeleton className="aspect-square" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  )
}

function OfferCard({ item }: { item: FoodItem }) {
  const router = useRouter()
  const { user } = useAuth()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart, getItemQuantity } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCartAnimating, setIsCartAnimating] = useState(false)
  const [isPending, startTransition] = useTransition()

  const isWishlisted = isInWishlist(item.id)
  const cartQuantity = getItemQuantity(item.id)

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (!user) {
      startTransition(() => {
        router.push("/signin")
      })
      return
    }
    setIsAnimating(true)
    await toggleWishlist(item.id)
    setTimeout(() => setIsAnimating(false), 300)
  }

  const handleShopClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    // Add item to cart
    addToCart(item)
    setIsCartAnimating(true)
    setTimeout(() => setIsCartAnimating(false), 300)

    // Navigate to cart page
    startTransition(() => {
      router.push("/cart")
    })
  }

  const handleCardClick = () => {
    startTransition(() => {
      router.push(`/item/${item.id}`)
    })
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30 cursor-pointer ${isPending ? "opacity-70" : ""}`}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Veg/Non-Veg Badge */}
        <div
          className={`absolute top-3 left-3 w-6 h-6 rounded border-2 flex items-center justify-center ${
            item.isVeg ? "border-green-600 bg-white" : "border-red-600 bg-white"
          }`}
        >
          <div className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
        </div>

        {/* Top Right Icons - Wishlist and Cart */}
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          {/* Wishlist Icon */}
          <motion.button
            animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
            onClick={handleWishlistClick}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors active:scale-90 ${
              isWishlisted ? "bg-red-500 text-white" : "bg-white/90 text-gray-500 hover:text-red-500"
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
          </motion.button>

          {/* Cart Icon */}
          <motion.button
            animate={isCartAnimating ? { scale: [1, 1.3, 1] } : {}}
            onClick={handleShopClick}
            className={`relative w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors active:scale-90 ${
              cartQuantity > 0 ? "bg-emerald-500 text-white" : "bg-white/90 text-gray-500 hover:text-emerald-500"
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {cartQuantity > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                {cartQuantity}
              </span>
            )}
          </motion.button>
        </div>

        {/* ₹99 Offer Badge - moved to bottom left */}
        <div className="absolute bottom-3 left-3 z-10 bg-red-500 text-white rounded-lg px-2 py-1 flex items-center gap-1 shadow-lg">
          <Tag className="h-3 w-3" />
          <span className="text-xs font-bold">₹99</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold">{item.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {item.name}
        </h3>

        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {item.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="h-3 w-3" />
            {item.calories} cal
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          <Badge variant="secondary" className="text-xs">
            {item.cuisine}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>

        {/* Price */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-red-500">₹99</span>
          <Badge className="bg-red-100 text-red-600 hover:bg-red-100">Special Offer</Badge>
        </div>
      </div>
    </motion.div>
  )
}

export default function Offers99Page() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isVegOnly, setIsVegOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>("popular")
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(true)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  // Get all offer items
  const allItems = useMemo(() => getOffers99Items(), [])

  // Get unique cuisines and categories
  const cuisines = useMemo(() => [...new Set(allItems.map((item) => item.cuisine))].sort(), [allItems])
  const categories = useMemo(() => [...new Set(allItems.map((item) => item.category))].sort(), [allItems])

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

    // Veg filter
    if (isVegOnly) {
      items = items.filter((item) => item.isVeg)
    }

    // Sort
    switch (sortBy) {
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
  }, [allItems, searchQuery, selectedCuisine, selectedCategory, isVegOnly, sortBy])

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
  }, [searchQuery, selectedCuisine, selectedCategory, isVegOnly, sortBy])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCuisine("all")
    setSelectedCategory("all")
    setIsVegOnly(false)
    setSortBy("popular")
  }

  const hasActiveFilters =
    searchQuery || selectedCuisine !== "all" || selectedCategory !== "all" || isVegOnly || sortBy !== "popular"

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-red-500 text-white rounded-xl px-4 py-2">
                <span className="text-2xl font-bold">₹99</span>
              </div>
              <h1 className="font-serif text-4xl font-bold text-foreground">Special Offers</h1>
            </div>
            <p className="text-muted-foreground">
              Explore {allItems.length} delicious items at just ₹99 - Limited time offer!
            </p>
          </motion.div>

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 md:p-8 mb-8 text-white"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Everything at ₹99!</h2>
                <p className="text-white/90">Order any item from this page for just ₹99. No minimum order required.</p>
              </div>
              <div className="bg-white text-red-500 rounded-xl px-6 py-3 font-bold text-xl">Flat ₹99 Only</div>
            </div>
          </motion.div>

          {/* Search and Filters Bar */}
          <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-border mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search ₹99 items..."
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
                <SheetContent side="bottom" className="h-[70vh]">
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

          {/* Items Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <OfferCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No items found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {visibleItems.map((item) => (
                  <OfferCard key={item.id} item={item} />
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
