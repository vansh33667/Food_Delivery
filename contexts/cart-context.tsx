"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import type { FoodItem } from "@/lib/food-data"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string | null
  quantity: number
  isVeg: boolean
}

export interface DeliveryAddress {
  apartment: string
  city: string
  state: string
}

interface CartContextType {
  items: CartItem[]
  deliveryAddress: DeliveryAddress | null
  isLoading: boolean
  addToCart: (item: FoodItem) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  setDeliveryAddress: (address: DeliveryAddress) => void
  getItemQuantity: (itemId: string) => number
  totalItems: number
  totalAmount: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  deliveryAddress: null,
  isLoading: true,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  setDeliveryAddress: () => {},
  getItemQuantity: () => 0,
  totalItems: 0,
  totalAmount: 0,
})

const CART_STORAGE_KEY = "feast_cart"
const ADDRESS_STORAGE_KEY = "feast_delivery_address"

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [deliveryAddress, setDeliveryAddressState] = useState<DeliveryAddress | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (storedCart) {
        setItems(JSON.parse(storedCart))
      }
      const storedAddress = localStorage.getItem(ADDRESS_STORAGE_KEY)
      if (storedAddress) {
        setDeliveryAddressState(JSON.parse(storedAddress))
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
    setIsLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isLoading])

  // Save address to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading && deliveryAddress) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(deliveryAddress))
    }
  }, [deliveryAddress, isLoading])

  const addToCart = useCallback((item: FoodItem) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id)
      if (existingItem) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1,
          isVeg: item.isVeg,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId))
  }, [])

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId))
    } else {
      setItems((prev) => prev.map((i) => (i.id === itemId ? { ...i, quantity } : i)))
    }
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    localStorage.removeItem(CART_STORAGE_KEY)
  }, [])

  const setDeliveryAddress = useCallback((address: DeliveryAddress) => {
    setDeliveryAddressState(address)
  }, [])

  const getItemQuantity = useCallback(
    (itemId: string) => {
      const item = items.find((i) => i.id === itemId)
      return item?.quantity || 0
    },
    [items],
  )

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        deliveryAddress,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setDeliveryAddress,
        getItemQuantity,
        totalItems,
        totalAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
