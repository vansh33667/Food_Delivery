import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/contexts/auth-context"
import { LocationProvider } from "@/contexts/location-context"
import { WishlistProvider } from "@/contexts/wishlist-context"
import { OrdersProvider } from "@/contexts/orders-context"
import { CartProvider } from "@/contexts/cart-context"
import { LanguageProvider } from "@/contexts/language-context"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Feast | Premium Food Delivery",
  description:
    "Discover the finest restaurants and get premium food delivered to your door. Fast, reliable, delicious.",
  keywords: ["food delivery", "restaurants", "fast delivery", "premium dining"],
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#d97706",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${playfair.variable} font-sans antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            <LocationProvider>
              <WishlistProvider>
                <OrdersProvider>
                  <CartProvider>{children}</CartProvider>
                </OrdersProvider>
              </WishlistProvider>
            </LocationProvider>
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
