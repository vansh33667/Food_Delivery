"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Package, Clock, CheckCircle2, Truck, CreditCard, Banknote, ShoppingBag, MapPin } from "lucide-react"
import { useOrders } from "@/contexts/orders-context"
import { useAuth } from "@/contexts/auth-context"
import { formatPrice } from "@/lib/format-price"
import Link from "next/link"

const statusConfig = {
  pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", label: "Pending" },
  confirmed: { icon: CheckCircle2, color: "text-emerald-500", bg: "bg-emerald-50", label: "Confirmed" },
  preparing: { icon: Package, color: "text-blue-500", bg: "bg-blue-50", label: "Preparing" },
  delivered: { icon: Truck, color: "text-green-500", bg: "bg-green-50", label: "Delivered" },
  cancelled: { icon: Package, color: "text-red-500", bg: "bg-red-50", label: "Cancelled" },
}

export default function OrdersPage() {
  const searchParams = useSearchParams()
  const { orders, isLoading, refreshOrders } = useOrders()
  const { user, isLoading: authLoading } = useAuth()

  const paymentSuccess = searchParams.get("payment") === "success"

  useEffect(() => {
    if (paymentSuccess) {
      refreshOrders()
    }
  }, [paymentSuccess, refreshOrders])

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-28 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
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
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Sign in to view your orders</h1>
            <p className="text-muted-foreground mb-6">Please sign in to see your order history</p>
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
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Payment Success Banner */}
          {paymentSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-8 flex items-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              <div>
                <p className="font-semibold text-emerald-800">Payment Successful!</p>
                <p className="text-sm text-emerald-600">Your order has been placed successfully.</p>
              </div>
            </motion.div>
          )}

          <h1 className="font-serif text-3xl font-bold text-foreground mb-8">Your Orders</h1>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 rounded-full bg-secondary mx-auto mb-6 flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">No orders yet</h2>
              <p className="text-muted-foreground mb-6">Start exploring our menu and place your first order!</p>
              <Link href="/menu">
                <Button size="lg">Browse Menu</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order, index) => {
                const status = statusConfig[order.status]
                const StatusIcon = status.icon
                const deliveryAddress = order.delivery_address as {
                  apartment?: string
                  city?: string
                  state?: string
                } | null

                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-card rounded-2xl border border-border p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* Item Image */}
                      <Link href={`/item/${order.item_id}`}>
                        <div className="w-24 h-24 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={order.item_image || "/placeholder.svg"}
                            alt={order.item_name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </Link>

                      {/* Order Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <Link href={`/item/${order.item_id}`}>
                            <h3 className="font-semibold text-foreground hover:text-primary transition-colors">
                              {order.item_name}
                            </h3>
                          </Link>
                          <span className="font-bold text-primary whitespace-nowrap">
                            {formatPrice(order.total_amount || order.item_price * order.quantity)}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground mt-1">
                          Order ID: {order.id.slice(0, 8).toUpperCase()}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          {/* Status Badge */}
                          <Badge variant="secondary" className={`${status.bg} ${status.color} gap-1`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </Badge>

                          {/* Payment Method Badge */}
                          <Badge variant="outline" className="gap-1">
                            {order.payment_method === "online" ? (
                              <>
                                <CreditCard className="w-3 h-3" />
                                Online
                              </>
                            ) : (
                              <>
                                <Banknote className="w-3 h-3" />
                                COD
                              </>
                            )}
                          </Badge>

                          {/* Quantity */}
                          <Badge variant="outline">Qty: {order.quantity}</Badge>
                        </div>

                        {deliveryAddress && deliveryAddress.apartment && (
                          <div className="flex items-start gap-1.5 mt-2 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                            <span className="line-clamp-1">
                              {deliveryAddress.apartment}, {deliveryAddress.city}, {deliveryAddress.state}
                            </span>
                          </div>
                        )}

                        <p className="text-xs text-muted-foreground mt-2">
                          Ordered on{" "}
                          {new Date(order.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
