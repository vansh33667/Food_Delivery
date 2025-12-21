"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "./auth-context"
import type { FoodItem } from "@/lib/food-data"
import type { CartItem, DeliveryAddress } from "./cart-context"

export interface Order {
  id: string
  user_id: string
  item_id: string
  item_name: string
  item_price: number
  item_image: string | null
  quantity: number
  payment_method: "online" | "cod"
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled"
  delivery_address: DeliveryAddress | null
  total_amount: number | null
  created_at: string
  updated_at: string
}

interface OrdersContextType {
  orders: Order[]
  orderedItemIds: Set<string>
  isLoading: boolean
  createOrder: (item: FoodItem, paymentMethod: "online" | "cod") => Promise<{ success: boolean; order?: Order }>
  createOrderFromCart: (
    items: CartItem[],
    address: DeliveryAddress,
    paymentMethod: "online" | "cod",
    totalAmount: number,
  ) => Promise<{ success: boolean; orders?: Order[] }>
  hasOrderedItem: (itemId: string) => boolean
  refreshOrders: () => Promise<void>
}

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  orderedItemIds: new Set(),
  isLoading: true,
  createOrder: async () => ({ success: false }),
  createOrderFromCart: async () => ({ success: false }),
  hasOrderedItem: () => false,
  refreshOrders: async () => {},
})

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [orderedItemIds, setOrderedItemIds] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const hasFetchedRef = useRef(false)
  const isFetchingRef = useRef(false)
  const lastUserIdRef = useRef<string | null>(null)

  const fetchOrders = useCallback(
    async (force = false) => {
      if (isFetchingRef.current) return
      if (!force && hasFetchedRef.current && lastUserIdRef.current === user?.id) return

      if (!user) {
        setOrders([])
        setOrderedItemIds(new Set())
        setIsLoading(false)
        hasFetchedRef.current = true
        lastUserIdRef.current = null
        return
      }

      isFetchingRef.current = true

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })

        if (error) {
          if (error.message?.includes("Too Many") || error.code === "429") {
            console.warn("Rate limited fetching orders, will retry later")
            return
          }
          throw error
        }

        setOrders(data || [])
        setOrderedItemIds(new Set(data?.map((order) => order.item_id) || []))
        hasFetchedRef.current = true
        lastUserIdRef.current = user.id
      } catch (error) {
        if (!(error instanceof Error && error.message?.includes("Too Many"))) {
          console.error("Error fetching orders:", error)
        }
      } finally {
        setIsLoading(false)
        isFetchingRef.current = false
      }
    },
    [user],
  )

  useEffect(() => {
    if (lastUserIdRef.current !== user?.id) {
      hasFetchedRef.current = false
    }
    fetchOrders()
  }, [fetchOrders, user?.id])

  const createOrder = useCallback(
    async (item: FoodItem, paymentMethod: "online" | "cod"): Promise<{ success: boolean; order?: Order }> => {
      if (!user) return { success: false }

      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("orders")
          .insert({
            user_id: user.id,
            item_id: item.id,
            item_name: item.name,
            item_price: item.price,
            item_image: item.image,
            quantity: 1,
            payment_method: paymentMethod,
            status: "confirmed",
            total_amount: item.price,
          })
          .select()
          .single()

        if (error) throw error

        setOrders((prev) => [data, ...prev])
        setOrderedItemIds((prev) => new Set([...prev, item.id]))

        return { success: true, order: data }
      } catch (error) {
        console.error("Error creating order:", error)
        return { success: false }
      }
    },
    [user],
  )

  const createOrderFromCart = useCallback(
    async (
      items: CartItem[],
      address: DeliveryAddress,
      paymentMethod: "online" | "cod",
      totalAmount: number,
    ): Promise<{ success: boolean; orders?: Order[] }> => {
      if (!user) return { success: false }
      if (items.length === 0) return { success: false }

      try {
        const supabase = createClient()

        // Create order entries for each cart item
        const orderEntries = items.map((item) => ({
          user_id: user.id,
          item_id: item.id,
          item_name: item.name,
          item_price: item.price,
          item_image: item.image,
          quantity: item.quantity,
          payment_method: paymentMethod,
          status: "confirmed" as const,
          delivery_address: address,
          total_amount: item.price * item.quantity,
        }))

        const { data, error } = await supabase.from("orders").insert(orderEntries).select()

        if (error) throw error

        // Update local state
        setOrders((prev) => [...(data || []), ...prev])
        setOrderedItemIds((prev) => {
          const newSet = new Set(prev)
          items.forEach((item) => newSet.add(item.id))
          return newSet
        })

        return { success: true, orders: data || [] }
      } catch (error) {
        console.error("Error creating orders from cart:", error)
        return { success: false }
      }
    },
    [user],
  )

  const hasOrderedItem = useCallback((itemId: string) => orderedItemIds.has(itemId), [orderedItemIds])

  const refreshOrders = useCallback(async () => {
    await fetchOrders(true)
  }, [fetchOrders])

  return (
    <OrdersContext.Provider
      value={{ orders, orderedItemIds, isLoading, createOrder, createOrderFromCart, hasOrderedItem, refreshOrders }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export const useOrders = () => useContext(OrdersContext)
