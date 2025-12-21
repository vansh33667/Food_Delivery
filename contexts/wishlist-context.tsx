"use client"

import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import { useAuth } from "./auth-context"

interface WishlistContextType {
  wishlistItems: Set<string>
  isLoading: boolean
  toggleWishlist: (itemId: string) => Promise<void>
  isInWishlist: (itemId: string) => boolean
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType>({
  wishlistItems: new Set(),
  isLoading: true,
  toggleWishlist: async () => {},
  isInWishlist: () => false,
  wishlistCount: 0,
})

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const hasFetchedRef = useRef(false)
  const isFetchingRef = useRef(false)
  const lastUserIdRef = useRef<string | null>(null)

  useEffect(() => {
    const fetchWishlist = async () => {
      if (isFetchingRef.current) return
      if (hasFetchedRef.current && lastUserIdRef.current === user?.id) return

      if (!user) {
        setWishlistItems(new Set())
        setIsLoading(false)
        hasFetchedRef.current = true
        lastUserIdRef.current = null
        return
      }

      isFetchingRef.current = true

      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("wishlists").select("item_id").eq("user_id", user.id)

        if (error) {
          if (error.message?.includes("Too Many") || error.code === "429") {
            console.warn("Rate limited fetching wishlist, will retry later")
            return
          }
          throw error
        }

        setWishlistItems(new Set(data?.map((item) => item.item_id) || []))
        hasFetchedRef.current = true
        lastUserIdRef.current = user.id
      } catch (error) {
        if (!(error instanceof Error && error.message?.includes("Too Many"))) {
          console.error("Error fetching wishlist:", error)
        }
      } finally {
        setIsLoading(false)
        isFetchingRef.current = false
      }
    }

    if (lastUserIdRef.current !== user?.id) {
      hasFetchedRef.current = false
    }
    fetchWishlist()
  }, [user, user?.id])

  const toggleWishlist = useCallback(
    async (itemId: string) => {
      if (!user) return

      const supabase = createClient()
      const isCurrentlyInWishlist = wishlistItems.has(itemId)

      setWishlistItems((prev) => {
        const next = new Set(prev)
        if (isCurrentlyInWishlist) {
          next.delete(itemId)
        } else {
          next.add(itemId)
        }
        return next
      })

      try {
        if (isCurrentlyInWishlist) {
          const { error } = await supabase.from("wishlists").delete().eq("user_id", user.id).eq("item_id", itemId)

          if (error) throw error
        } else {
          const { error } = await supabase.from("wishlists").insert({
            user_id: user.id,
            item_id: itemId,
          })

          if (error) throw error
        }
      } catch (error) {
        setWishlistItems((prev) => {
          const next = new Set(prev)
          if (isCurrentlyInWishlist) {
            next.add(itemId)
          } else {
            next.delete(itemId)
          }
          return next
        })
        console.error("Error toggling wishlist:", error)
      }
    },
    [user, wishlistItems],
  )

  const isInWishlist = useCallback((itemId: string) => wishlistItems.has(itemId), [wishlistItems])

  const wishlistCount = wishlistItems.size

  return (
    <WishlistContext.Provider value={{ wishlistItems, isLoading, toggleWishlist, isInWishlist, wishlistCount }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
