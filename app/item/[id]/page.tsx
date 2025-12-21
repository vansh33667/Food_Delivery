"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Heart,
  Store,
  Clock,
  Star,
  Flame,
  Dumbbell,
  CreditCard,
  Banknote,
  ArrowLeft,
  ChevronRight,
  ShoppingCart,
  Check,
  Minus,
  Plus,
} from "lucide-react"
import { getFoodItemById, type FoodItem } from "@/lib/food-data"
import { getOffers99Items } from "@/lib/offers-data"
import { formatPrice } from "@/lib/format-price"
import { useWishlist } from "@/contexts/wishlist-context"
import { useOrders } from "@/contexts/orders-context"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { CODSuccessAnimation } from "@/components/cod-success-animation"
import Link from "next/link"

function findItemById(id: string): FoodItem | undefined {
  // First try the main getFoodItemById function
  const mainItem = getFoodItemById(id)
  if (mainItem) {
    return mainItem
  }

  // If still not found, directly search offers data as a fallback
  if (id.startsWith("offer-")) {
    const offerItems = getOffers99Items()
    const offerItem = offerItems.find((item) => item.id === id)
    if (offerItem) {
      return offerItem
    }
  }

  return undefined
}

export default function ItemDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const { isInWishlist, toggleWishlist } = useWishlist()
  const { hasOrderedItem, createOrder, orders } = useOrders()
  const { addToCart, getItemQuantity, updateQuantity, totalItems } = useCart()

  const [item, setItem] = useState<FoodItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online")
  const [isOrdering, setIsOrdering] = useState(false)
  const [showCODAnimation, setShowCODAnimation] = useState(false)
  const [justAddedToCart, setJustAddedToCart] = useState(false)

  const itemId = params.id as string
  const quantityInCart = getItemQuantity(itemId)

  useEffect(() => {
    const fetchItem = async () => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 300))
      const foundItem = findItemById(itemId)
      setItem(foundItem || null)
      setIsLoading(false)
    }

    if (itemId) {
      fetchItem()
    }
  }, [itemId])

  const handleWishlistToggle = async () => {
    if (!user) {
      router.push("/signin")
      return
    }
    await toggleWishlist(itemId)
  }

  const handleAddToCart = () => {
    if (!user) {
      router.push("/signin")
      return
    }
    if (!item) return

    addToCart(item)
    setJustAddedToCart(true)
    setTimeout(() => setJustAddedToCart(false), 2000)
  }

  const handleOrder = async () => {
    if (!user) {
      router.push("/signin")
      return
    }

    if (!item) return

    setIsOrdering(true)

    const { success } = await createOrder(item, paymentMethod)

    if (success) {
      if (paymentMethod === "cod") {
        setShowCODAnimation(true)
      } else {
        router.push("/orders?payment=success")
      }
    }

    setIsOrdering(false)
  }

  const handleCODAnimationComplete = () => {
    setShowCODAnimation(false)
    router.push("/orders")
  }

  const isWishlisted = isInWishlist(itemId)
  const hasOrdered = hasOrderedItem(itemId)
  const itemOrders = orders.filter((o) => o.item_id === itemId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="grid md:grid-cols-2 gap-8">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-40 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Item not found</h1>
            <p className="text-muted-foreground mb-6">The item you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/menu")}>Back to Menu</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <CODSuccessAnimation isVisible={showCODAnimation} onComplete={handleCODAnimationComplete} itemName={item.name} />

      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => router.back()}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </motion.button>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Image Section */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Veg/Non-Veg Badge */}
                <div
                  className={`absolute top-4 left-4 w-8 h-8 rounded border-2 flex items-center justify-center ${
                    item.isVeg ? "border-green-600 bg-white" : "border-red-600 bg-white"
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`} />
                </div>

                {/* Wishlist & Shop Icons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlistToggle}
                    className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                      isWishlisted ? "bg-red-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                  </motion.button>

                  <Link href="/orders">
                    <motion.div
                      whileTap={{ scale: 0.9 }}
                      className={`relative w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors ${
                        hasOrdered ? "bg-emerald-500 text-white" : "bg-white/90 text-gray-600 hover:bg-white"
                      }`}
                    >
                      <Store className="w-5 h-5" />
                      {hasOrdered && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                          {itemOrders.length}
                        </span>
                      )}
                    </motion.div>
                  </Link>
                </div>
              </motion.div>

              {/* Details Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col"
              >
                {/* Category & Cuisine */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="secondary">{item.category}</Badge>
                  <Badge variant="outline">{item.cuisine}</Badge>
                  <Badge variant={item.isVeg ? "default" : "destructive"} className={item.isVeg ? "bg-green-600" : ""}>
                    {item.isVeg ? "Vegetarian" : "Non-Veg"}
                  </Badge>
                </div>

                {/* Name & Price */}
                <h1 className="font-serif text-3xl font-bold text-foreground mb-2">{item.name}</h1>
                <p className="text-3xl font-bold text-primary mb-4">{formatPrice(item.price)}</p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span className="font-semibold">{item.rating}</span>
                  </div>
                  <span className="text-muted-foreground">|</span>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{item.description}</p>

                {/* Nutrition Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm">Calories</span>
                    </div>
                    <p className="text-xl font-semibold">{item.calories} kcal</p>
                  </div>
                  {item.protein && (
                    <div className="bg-emerald-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 text-emerald-600 mb-1">
                        <Dumbbell className="w-4 h-4" />
                        <span className="text-sm">Protein</span>
                      </div>
                      <p className="text-xl font-semibold text-emerald-700">{item.protein}g</p>
                    </div>
                  )}
                </div>

                <div className="bg-secondary/30 rounded-2xl p-6 mb-4">
                  <h3 className="font-semibold text-foreground mb-4">Add to Cart</h3>
                  {quantityInCart > 0 ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 bg-transparent"
                          onClick={() => updateQuantity(itemId, quantityInCart - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="font-bold text-lg w-8 text-center">{quantityInCart}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 bg-transparent"
                          onClick={() => updateQuantity(itemId, quantityInCart + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <Link href="/cart">
                        <Button variant="outline" className="gap-2 bg-transparent">
                          <ShoppingCart className="w-4 h-4" />
                          View Cart ({totalItems})
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <Button size="lg" className="w-full h-12 gap-2" onClick={handleAddToCart}>
                      {justAddedToCart ? (
                        <>
                          <Check className="w-5 h-5" />
                          Added to Cart!
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {totalItems > 0 && (
                  <Link href="/cart" className="mb-4">
                    <Button
                      variant="default"
                      size="lg"
                      className="w-full h-12 gap-2 bg-emerald-600 hover:bg-emerald-700"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Go to Cart ({totalItems} items) - {formatPrice(item.price * quantityInCart || 0)}
                      <ChevronRight className="w-5 h-5" />
                    </Button>
                  </Link>
                )}

                {/* Payment Selection - Quick Buy Option */}
                <div className="bg-secondary/30 rounded-2xl p-6 mb-6">
                  <h3 className="font-semibold text-foreground mb-4">Quick Buy (Single Item)</h3>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as "online" | "cod")}
                    className="space-y-3"
                  >
                    <div
                      className={`flex items-center space-x-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        paymentMethod === "online"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setPaymentMethod("online")}
                    >
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Online Payment</p>
                          <p className="text-sm text-muted-foreground">Pay securely with card/UPI</p>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-3 rounded-xl border-2 p-4 cursor-pointer transition-all ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-3 cursor-pointer flex-1">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                          <Banknote className="w-5 h-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Order Button */}
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full h-14 text-lg gap-2 bg-transparent"
                  onClick={handleOrder}
                  disabled={isOrdering}
                >
                  {isOrdering ? (
                    "Processing..."
                  ) : (
                    <>
                      Buy Now (Single Item)
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>

                {!user && (
                  <p className="text-sm text-muted-foreground text-center mt-3">
                    Please{" "}
                    <Link href="/signin" className="text-primary hover:underline">
                      sign in
                    </Link>{" "}
                    to place an order
                  </p>
                )}
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
