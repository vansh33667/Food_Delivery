"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Clock, Star, Flame, Dumbbell } from "lucide-react"
import { formatPrice } from "@/lib/format-price"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import type { FoodItem } from "@/lib/food-data"

interface FoodCardProps {
  item: FoodItem
  showProtein?: boolean
}

export function FoodCard({ item, showProtein = false }: FoodCardProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { addToCart, getItemQuantity } = useCart()
  const [isAnimating, setIsAnimating] = useState(false)
  const [isCartAnimating, setIsCartAnimating] = useState(false)
  const [imageError, setImageError] = useState(false)
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
    console.log("[v0] FoodCard clicked, navigating to item:", item.id, item.name)
    const targetUrl = `/item/${item.id}`
    console.log("[v0] Target URL:", targetUrl)
    startTransition(() => {
      router.push(targetUrl)
    })
  }

  const handleImageError = () => {
    setImageError(true)
  }

  const imageSrc = imageError
    ? `https://picsum.photos/400/300?random=${item.id}`
    : item.image || `https://picsum.photos/400/300?random=${item.id}`

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30 cursor-pointer ${isPending ? "opacity-70" : ""}`}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={imageSrc}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={handleImageError}
        />

        {/* Veg/Non-Veg Badge */}
        <div
          className={`absolute top-3 left-3 w-6 h-6 rounded border-2 flex items-center justify-center ${
            item.isVeg ? "border-green-600 bg-white" : "border-red-600 bg-white"
          }`}
        >
          <div className={`w-3 h-3 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
        </div>

        {/* Top Right Icons */}
        <div className="absolute top-3 right-3 flex gap-2">
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

        {/* Protein Badge (for high protein page) */}
        {showProtein && item.protein && (
          <div className="absolute bottom-3 left-3 bg-emerald-500 text-white rounded-full px-3 py-1 flex items-center gap-1">
            <Dumbbell className="h-3 w-3" />
            <span className="text-xs font-bold">{item.protein}g</span>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-semibold">{item.rating}</span>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">{formatPrice(item.price)}</span>
        </div>

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
          {showProtein && item.protein && (
            <span className="flex items-center gap-1 text-emerald-600">
              <Dumbbell className="h-3 w-3" />
              {item.protein}g
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          <Badge variant="secondary" className="text-xs">
            {item.cuisine}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {item.category}
          </Badge>
        </div>
      </div>
    </motion.div>
  )
}
