"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Utensils, Store, Tag, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { getFoodItems } from "@/lib/food-data"
import { getRestaurants } from "@/lib/restaurant-data"
import { getOffers99Items } from "@/lib/offers-data"
import { formatPrice } from "@/lib/format-price"

interface SearchResult {
  type: "food" | "restaurant" | "offer"
  id: string
  name: string
  subtitle: string
  image: string
  href: string
}

export function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const performSearch = useCallback((searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      setIsOpen(false)
      return
    }

    setIsSearching(true)
    const lowerQuery = searchQuery.toLowerCase()

    // Search food items
    const foodItems = getFoodItems()
      .filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.cuisine.toLowerCase().includes(lowerQuery) ||
          item.category.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 5)
      .map(
        (item): SearchResult => ({
          type: "food",
          id: item.id,
          name: item.name,
          subtitle: `${item.cuisine} • ${formatPrice(item.price)}`,
          image: item.image,
          href: `/item/${item.id}`,
        }),
      )

    // Search restaurants
    const restaurants = getRestaurants()
      .filter(
        (r) =>
          r.name.toLowerCase().includes(lowerQuery) ||
          r.city.toLowerCase().includes(lowerQuery) ||
          r.cuisines.some((c) => c.toLowerCase().includes(lowerQuery)),
      )
      .slice(0, 5)
      .map(
        (r): SearchResult => ({
          type: "restaurant",
          id: r.id,
          name: r.name,
          subtitle: `${r.type} • ${r.city}`,
          image: r.image,
          href: `/restaurant/${r.id}`,
        }),
      )

    // Search offers
    const offers = getOffers99Items()
      .filter((item) => item.name.toLowerCase().includes(lowerQuery) || item.cuisine.toLowerCase().includes(lowerQuery))
      .slice(0, 3)
      .map(
        (item): SearchResult => ({
          type: "offer",
          id: item.id,
          name: item.name,
          subtitle: `Only ₹99 • ${item.cuisine}`,
          image: item.image,
          href: `/item/${item.id}`,
        }),
      )

    const allResults = [...foodItems, ...restaurants, ...offers].slice(0, 10)
    setResults(allResults)
    setIsOpen(allResults.length > 0)
    setSelectedIndex(-1)
    setIsSearching(false)
  }, [])

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(query)
    }, 150)
    return () => clearTimeout(timer)
  }, [query, performSearch])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && results[selectedIndex]) {
          console.log("[v0] GlobalSearch: Navigating via Enter key to:", results[selectedIndex].href)
          router.push(results[selectedIndex].href)
          setIsOpen(false)
          setQuery("")
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleResultClick = (result: SearchResult) => {
    console.log("[v0] GlobalSearch: Result clicked:", result.type, result.id, result.name)
    console.log("[v0] GlobalSearch: Navigating to:", result.href)
    router.push(result.href)
    setIsOpen(false)
    setQuery("")
  }

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "food":
        return <Utensils className="h-4 w-4 text-primary" />
      case "restaurant":
        return <Store className="h-4 w-4 text-amber-500" />
      case "offer":
        return <Tag className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <div className="relative flex-1 max-w-xl">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search food, restaurants, offers..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && setIsOpen(results.length > 0)}
          onKeyDown={handleKeyDown}
          className="h-14 rounded-xl border-border bg-card pl-12 pr-12 text-base shadow-sm focus-visible:ring-primary"
          suppressHydrationWarning
        />
        {isSearching && (
          <Loader2 className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground animate-spin" />
        )}
        {query && !isSearching && (
          <button
            onClick={() => {
              setQuery("")
              setResults([])
              setIsOpen(false)
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div
          ref={resultsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50 max-h-[400px] overflow-y-auto"
        >
          {results.map((result, index) => (
            <button
              key={`${result.type}-${result.id}`}
              onClick={() => handleResultClick(result)}
              className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                index === selectedIndex ? "bg-primary/10" : "hover:bg-secondary"
              }`}
            >
              <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                <img
                  src={result.image || "/placeholder.svg?height=48&width=48&query=food"}
                  alt={result.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = "/diverse-food-spread.png"
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {getIcon(result.type)}
                  <span className="font-medium text-foreground truncate">{result.name}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{result.subtitle}</p>
              </div>
            </button>
          ))}
          {results.length === 0 && query && !isSearching && (
            <div className="p-4 text-center text-muted-foreground">No results found for "{query}"</div>
          )}
        </div>
      )}
    </div>
  )
}
