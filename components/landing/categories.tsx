"use client"

import { useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const categories = [
  {
    id: 1,
    name: "Pizza",
    image: "https://i.pinimg.com/736x/b5/87/0e/b5870e373cca6fec4c04d714a26391c7.jpg",
    count: "500+ items",
  },
  {
    id: 2,
    name: "Burgers",
    image: "https://i.pinimg.com/1200x/71/f8/dd/71f8dd52a02a233c46f1ab4d88d22f7a.jpg",
    count: "350+ items",
  },
  {
    id: 3,
    name: "Sushi",
    image: "https://i.pinimg.com/1200x/ed/fc/08/edfc08ca5b88e27067af976d65bfde41.jpg",
    count: "200+ items",
  },
  {
    id: 4,
    name: "Indian",
    image: "https://i.pinimg.com/1200x/bd/e6/8d/bde68d68abd6860caa797b8040d7dfd5.jpg",
    count: "280+ items",
  },
  {
    id: 5,
    name: "Chinese",
    image: "https://i.pinimg.com/736x/3c/aa/18/3caa18d1ed70e5368e1f3e964f7a72e1.jpg",
    count: "420+ items",
  },
  {
    id: 6,
    name: "Mexican",
    image: "https://i.pinimg.com/1200x/94/f5/b4/94f5b48f11bd49642b9d7bf329028198.jpg",
    count: "180+ items",
  },
  {
    id: 7,
    name: "Thai",
    image: "https://i.pinimg.com/1200x/d2/6c/a7/d26ca7c688128542ebc5e9d491db1b6e.jpg",
    count: "150+ items",
  },
  
  {
    id: 8,
    name: "Desserts",
    image: "https://i.pinimg.com/1200x/8b/6c/4b/8b6c4b762af8044cb6698fb582586fb5.jpg",
    count: "300+ items",
  },
]

export function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{t('categories.title')}</h2>
            <p className="mt-2 text-muted-foreground">{t('categories.subtitle')}</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-transparent"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Scroll left</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10 w-10 rounded-full bg-transparent"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Scroll right</span>
            </Button>
          </div>
        </div>

        {/* Categories Grid - Now clickable with Link to menu filtered by cuisine */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-8"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/menu?cuisine=${encodeURIComponent(category.name)}`}
              className="group flex-shrink-0 snap-start w-[140px] md:w-auto"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-card shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="font-semibold text-card">{category.name}</p>
                  <p className="text-xs text-card/80">{category.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
