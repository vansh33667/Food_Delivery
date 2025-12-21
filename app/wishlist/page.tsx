"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, ArrowLeft, Trash2, Clock, Star, Flame, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useCart } from "@/contexts/cart-context"
import { getFoodItemById, type FoodItem } from "@/lib/food-data"
import { formatPrice } from "@/lib/format-price"

export default function WishlistPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const { wishlistItems, toggleWishlist, isLoading: wishlistLoading } = useWishlist()
  const { addToCart } = useCart()
  const [wishlistFoodItems, setWishlistFoodItems] = useState<FoodItem[]>([])
  const [removingItems, setRemovingItems] = useState<Set<string>>(new Set())
  const [cartAnimatingItems, setCartAnimatingItems] = useState<Set<string>>(new Set())

  // Redirect to signin if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signin")
    }
  }, [authLoading, user, router])

  // Load full food item data for wishlist items
  useEffect(() => {
    const items: FoodItem[] = []
    wishlistItems.forEach((itemId) => {
      const foodItem = getFoodItemById(itemId)
      if (foodItem) {
        items.push(foodItem)
      }
    })
    setWishlistFoodItems(items)
  }, [wishlistItems])

  const handleRemoveFromWishlist = async (itemId: string) => {
    setRemovingItems((prev) => new Set(prev).add(itemId))
    await toggleWishlist(itemId)
    setRemovingItems((prev) => {
      const next = new Set(prev)
      next.delete(itemId)
      return next
    })
  }

  const handleAddToCartAndNavigate = (item: FoodItem) => {
    addToCart(item)
    setCartAnimatingItems((prev) => new Set(prev).add(item.id))
    setTimeout(() => {
      setCartAnimatingItems((prev) => {
        const next = new Set(prev)
        next.delete(item.id)
        return next
      })
      router.push("/cart")
    }, 300)
  }

  const handleItemClick = (itemId: string) => {
    router.push(`/item/${itemId}`)
  }

  if (authLoading || wishlistLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-12 px-4">
          <div className="max-w-4xl mx-auto flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back Button & Title */}
          <div className="flex items-center gap-4 mb-8">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">My Wishlist</h1>
              <p className="text-muted-foreground">
                {wishlistFoodItems.length} {wishlistFoodItems.length === 1 ? "item" : "items"} saved
              </p>
            </div>
          </div>

          {/* Empty State */}
          {wishlistFoodItems.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Your wishlist is empty</h2>
              <p className="text-muted-foreground mb-6">
                Start adding items you love by clicking the heart icon on any food item
              </p>
              <Button onClick={() => router.push("/menu")} className="rounded-full">
                Browse Menu
              </Button>
            </motion.div>
          ) : (
            /* Wishlist Items Grid */
            <div className="grid gap-4 sm:grid-cols-2">
              {wishlistFoodItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all ${
                    removingItems.has(item.id) ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex">
                    {/* Item Image */}
                    <div
                      className="relative w-32 h-32 flex-shrink-0 cursor-pointer"
                      onClick={() => handleItemClick(item.id)}
                    >
                      <img
                        src={
                          item.image || `/placeholder.svg?height=128&width=128&query=${encodeURIComponent(item.name)}`
                        }
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Veg/Non-Veg Badge */}
                      <div
                        className={`absolute top-2 left-2 w-5 h-5 rounded border-2 flex items-center justify-center ${
                          item.isVeg ? "border-green-600 bg-white" : "border-red-600 bg-white"
                        }`}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="cursor-pointer flex-1" onClick={() => handleItemClick(item.id)}>
                        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-lg font-bold text-primary mt-1">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                            {item.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {item.prepTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {item.calories} cal
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {item.cuisine}
                          </Badge>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-3">
                        <motion.button
                          animate={cartAnimatingItems.has(item.id) ? { scale: [1, 1.2, 1] } : {}}
                          onClick={() => handleAddToCartAndNavigate(item)}
                          className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2 px-3 text-sm font-medium hover:bg-primary/90 transition-colors active:scale-95"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to Cart
                        </motion.button>
                        <button
                          onClick={() => handleRemoveFromWishlist(item.id)}
                          disabled={removingItems.has(item.id)}
                          className="flex items-center justify-center w-10 h-10 rounded-lg border border-border hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-colors active:scale-95 disabled:opacity-50"
                        >
                          {removingItems.has(item.id) ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
