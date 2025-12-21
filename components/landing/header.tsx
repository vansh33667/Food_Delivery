"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, MapPin, ChevronDown, User, ShoppingBag, LogOut, Loader2, ShoppingCart, Heart } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useLocation } from "@/contexts/location-context"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { LocationModal } from "@/components/location-modal"
import { LanguageSwitcher } from "@/components/language-switcher"

function getAvatarColor(name: string): string {
  const colors = [
    "bg-amber-500",
    "bg-emerald-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
    "bg-orange-500",
  ]
  const index = name.charCodeAt(0) % colors.length
  return colors[index]
}

function getInitial(user: { user_metadata?: { full_name?: string }; email?: string }): string {
  const name = user.user_metadata?.full_name || user.email || "U"
  return name.charAt(0).toUpperCase()
}

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)

  const { user, isLoading: authLoading, signOut } = useAuth()
  const { displayText, isLoading: locationLoading } = useLocation()
  const { totalItems } = useCart()
  const { wishlistCount } = useWishlist()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 z-50 transition-all duration-300 rounded-2xl ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg border border-border/75"
            : "bg-white/90 backdrop-blur-md shadow-md border border-border/50"
        }`}
        style={{ borderRadius: "1%" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-14 items-center justify-between md:h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
                <span className="font-serif text-lg font-bold text-primary-foreground">F</span>
              </div>
              <span className="font-serif text-xl font-bold text-foreground">Feast</span>
            </Link>

            {/* Location Selector - Desktop - Shows Society + City */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden items-center gap-2 rounded-full bg-secondary/80 px-4 py-2 transition-all hover:bg-secondary hover:shadow-sm md:flex active:scale-95"
            >
              <MapPin className="h-4 w-4 text-primary" />
              {locationLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              ) : (
                <span className="text-sm font-medium text-foreground max-w-[200px] truncate">{displayText}</span>
              )}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>

            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/menu"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Menu
              </Link>
              <Link
                href="/high-protein"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                High Protein
              </Link>
              <Link
                href="/restaurants"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Restaurants
              </Link>
              <Link
                href="/offers-99"
                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  ₹99
                </span>
                Offers
              </Link>
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <Heart className="h-5 w-5 text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                href="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>

              <LanguageSwitcher />

              {authLoading ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold transition-transform hover:scale-105 active:scale-95 ${getAvatarColor(user.email || "U")}`}
                    >
                      {getInitial(user)}
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/account" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders" className="flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Wishlist
                        {wishlistCount > 0 && (
                          <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/cart" className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Cart
                        {totalItems > 0 && (
                          <span className="ml-auto bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded-full">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-sm font-medium hover:bg-secondary transition-colors active:scale-95"
                    asChild
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>
                  <Button className="rounded-full px-6 hover:scale-105 active:scale-95 transition-transform" asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 md:hidden">
              <Link
                href="/wishlist"
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <Heart className="h-5 w-5 text-foreground" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors"
              >
                <ShoppingCart className="h-5 w-5 text-foreground" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalItems > 99 ? "99+" : totalItems}
                  </span>
                )}
              </Link>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-colors active:scale-95"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-border bg-white shadow-lg md:hidden">
            <div className="space-y-1 px-4 py-4">
              <button
                onClick={() => {
                  setIsLocationModalOpen(true)
                  setIsMobileMenuOpen(false)
                }}
                className="flex w-full items-center gap-2 rounded-lg bg-secondary px-4 py-3 mb-4 active:scale-[0.98] transition-transform"
              >
                <MapPin className="h-4 w-4 text-primary" />
                {locationLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : (
                  <span className="text-sm font-medium text-foreground truncate">{displayText}</span>
                )}
                <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
              </button>

              <Link
                href="/menu"
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                href="/high-protein"
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                High Protein
              </Link>
              <Link
                href="/restaurants"
                className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link
                href="/offers-99"
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center justify-center bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  ₹99
                </span>
                Offers
              </Link>
              <Link
                href="/wishlist"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{wishlistCount}</span>
                )}
              </Link>
              <Link
                href="/cart"
                className="flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart
                </span>
                {totalItems > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              <div className="flex flex-col gap-2 pt-4 border-t border-border mt-4">
                {authLoading ? (
                  <div className="flex justify-center py-3">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                  </div>
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-white font-semibold ${getAvatarColor(user.email || "U")}`}
                      >
                        {getInitial(user)}
                      </div>
                      <span className="text-sm font-medium truncate">{user.email}</span>
                    </div>
                    <Link
                      href="/account"
                      className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block rounded-lg px-4 py-3 text-base font-medium text-foreground hover:bg-secondary transition-colors active:bg-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => {
                        signOut()
                        setIsMobileMenuOpen(false)
                      }}
                      className="block w-full text-left rounded-lg px-4 py-3 text-base font-medium text-destructive hover:bg-destructive/10 transition-colors active:bg-destructive/20"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent hover:bg-secondary transition-colors active:scale-[0.98]"
                      asChild
                    >
                      <Link href="/signin" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign In
                      </Link>
                    </Button>
                    <Button className="w-full hover:scale-[1.02] active:scale-[0.98] transition-transform" asChild>
                      <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                        Sign Up
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <LocationModal open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen} />
    </>
  )
}
