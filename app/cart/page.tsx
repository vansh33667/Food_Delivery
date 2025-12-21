"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Skeleton } from "@/components/ui/skeleton"
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  MapPin,
  CreditCard,
  Banknote,
  ChevronRight,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react"
import { useCart, type DeliveryAddress } from "@/contexts/cart-context"
import { useOrders } from "@/contexts/orders-context"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice } from "@/lib/format-price"
import { CODSuccessAnimation } from "@/components/cod-success-animation"
import Link from "next/link"

export default function CartPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useAuth()
  const {
    items,
    deliveryAddress,
    isLoading: cartLoading,
    updateQuantity,
    removeFromCart,
    clearCart,
    setDeliveryAddress,
    totalAmount,
    totalItems,
  } = useCart()
  const { createOrderFromCart } = useOrders()

  const [paymentMethod, setPaymentMethod] = useState<"online" | "cod">("online")
  const [isOrdering, setIsOrdering] = useState(false)
  const [showCODAnimation, setShowCODAnimation] = useState(false)
  const [addressForm, setAddressForm] = useState<DeliveryAddress>(
    deliveryAddress || { apartment: "", city: "", state: "" },
  )
  const [addressError, setAddressError] = useState("")

  const handleAddressChange = (field: keyof DeliveryAddress, value: string) => {
    setAddressForm((prev) => ({ ...prev, [field]: value }))
    setAddressError("")
  }

  const validateAddress = (): boolean => {
    if (!addressForm.apartment.trim()) {
      setAddressError("Please enter your apartment/society name")
      return false
    }
    if (!addressForm.city.trim()) {
      setAddressError("Please enter your city")
      return false
    }
    if (!addressForm.state.trim()) {
      setAddressError("Please enter your state")
      return false
    }
    return true
  }

  const handlePlaceOrder = async () => {
    if (!user) {
      router.push("/signin")
      return
    }

    if (items.length === 0) {
      return
    }

    if (!validateAddress()) {
      return
    }

    setIsOrdering(true)
    setDeliveryAddress(addressForm)

    const { success } = await createOrderFromCart(items, addressForm, paymentMethod, totalAmount)

    if (success) {
      clearCart()
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

  if (authLoading || cartLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 w-full rounded-2xl" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Sign in to view your cart</h1>
            <p className="text-muted-foreground mb-6">Please sign in to access your cart and checkout</p>
            <Link href="/signin">
              <Button size="lg">Sign In</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <>
      <CODSuccessAnimation
        isVisible={showCODAnimation}
        onComplete={handleCODAnimationComplete}
        itemName={items.length > 1 ? `${items.length} items` : items[0]?.name || "Order"}
      />

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

            <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Your Cart</h1>

            {items.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-muted-foreground" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">Add some delicious items to your cart!</p>
                <Link href="/menu">
                  <Button size="lg">Browse Menu</Button>
                </Link>
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  <AnimatePresence>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-card rounded-2xl border border-border p-4"
                      >
                        <div className="flex gap-4">
                          {/* Item Image */}
                          <Link href={`/item/${item.id}`}>
                            <div className="w-20 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </Link>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-4 h-4 rounded border flex items-center justify-center ${
                                      item.isVeg ? "border-green-600" : "border-red-600"
                                    }`}
                                  >
                                    <div
                                      className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green-600" : "bg-red-600"}`}
                                    />
                                  </div>
                                  <Link href={`/item/${item.id}`}>
                                    <h3 className="font-semibold text-foreground hover:text-primary transition-colors line-clamp-1">
                                      {item.name}
                                    </h3>
                                  </Link>
                                </div>
                                <p className="text-primary font-bold mt-1">{formatPrice(item.price)}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 mt-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-semibold w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm text-muted-foreground ml-auto">
                                Subtotal: {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Checkout Section */}
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-2xl border border-border p-6 sticky top-28">
                    {/* Delivery Address */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Delivery Address</h3>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="apartment" className="text-sm">
                            Apartment / Society
                          </Label>
                          <Input
                            id="apartment"
                            placeholder="Enter apartment or society name"
                            value={addressForm.apartment}
                            onChange={(e) => handleAddressChange("apartment", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="city" className="text-sm">
                            City
                          </Label>
                          <Input
                            id="city"
                            placeholder="Enter city"
                            value={addressForm.city}
                            onChange={(e) => handleAddressChange("city", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state" className="text-sm">
                            State
                          </Label>
                          <Input
                            id="state"
                            placeholder="Enter state"
                            value={addressForm.state}
                            onChange={(e) => handleAddressChange("state", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        {addressError && <p className="text-sm text-destructive">{addressError}</p>}
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                      <h3 className="font-semibold text-foreground mb-4">Payment Method</h3>
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(value) => setPaymentMethod(value as "online" | "cod")}
                        className="space-y-2"
                      >
                        <div
                          className={`flex items-center space-x-3 rounded-xl border-2 p-3 cursor-pointer transition-all ${
                            paymentMethod === "online"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setPaymentMethod("online")}
                        >
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online" className="flex items-center gap-2 cursor-pointer flex-1">
                            <CreditCard className="w-4 h-4 text-primary" />
                            <span className="text-sm font-medium">Online Payment</span>
                          </Label>
                        </div>

                        <div
                          className={`flex items-center space-x-3 rounded-xl border-2 p-3 cursor-pointer transition-all ${
                            paymentMethod === "cod"
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/50"
                          }`}
                          onClick={() => setPaymentMethod("cod")}
                        >
                          <RadioGroupItem value="cod" id="cod" />
                          <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                            <Banknote className="w-4 h-4 text-amber-600" />
                            <span className="text-sm font-medium">Cash on Delivery</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-border pt-4 mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Items ({totalItems})</span>
                        <span>{formatPrice(totalAmount)}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Delivery</span>
                        <span className="text-emerald-600">Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span className="text-primary">{formatPrice(totalAmount)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button
                      size="lg"
                      className="w-full h-12 gap-2"
                      onClick={handlePlaceOrder}
                      disabled={isOrdering || items.length === 0}
                    >
                      {isOrdering ? (
                        "Processing..."
                      ) : (
                        <>
                          Place Order
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
