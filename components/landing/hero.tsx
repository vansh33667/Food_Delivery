"use client"

import { Button } from "@/components/ui/button"
import { Clock, Star, Bike } from "lucide-react"
import { GlobalSearch } from "./global-search"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative overflow-hidden pt-20 md:pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Now delivering in 200+ cities</span>
            </div>

            <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-balance">{t('hero.title')}</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
              {t('hero.subtitle')}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GlobalSearch />
              <Button size="lg" className="h-14 rounded-xl px-8 text-base">
                {t('hero.findFood')}
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8 lg:justify-start">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">25 min</p>
                  <p className="text-sm text-muted-foreground">Avg. delivery</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">4.9</p>
                  <p className="text-sm text-muted-foreground">User rating</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-2xl font-bold text-foreground">50K+</p>
                  <p className="text-sm text-muted-foreground">Deliveries/day</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto max-w-lg lg:max-w-none">
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-secondary shadow-2xl">
              <video
                src="/SaveClip.App_AQMXaIZl4OvxnqdnSYnoPSArlSoissEFIzywSjV20ndugkAfP0OvtHxBsy0nMYIN9p2a2ldVZoXu_tHoV1GTCW16QmAjfLnw5RmXR3w.mp4"
                autoPlay
                loop
                muted
                className="h-full w-full object-cover"
              />

              {/* Floating Card - Delivery Time */}
              <div className="absolute left-4 top-4 flex items-center gap-3 rounded-2xl bg-card/95 backdrop-blur-sm p-4 shadow-lg">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Delivery in</p>
                  <p className="text-lg font-bold text-foreground">20-25 min</p>
                </div>
              </div>

              {/* Floating Card - Rating */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl bg-card/95 backdrop-blur-sm px-4 py-3 shadow-lg">
                <Star className="h-5 w-5 fill-primary text-primary" />
                <span className="text-lg font-bold text-foreground">4.9</span>
                <span className="text-sm text-muted-foreground">(2.5k)</span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-primary/20 blur-xl" />
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-accent/20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
