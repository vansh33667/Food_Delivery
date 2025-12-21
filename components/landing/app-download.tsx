import { Button } from "@/components/ui/button"
import { Apple, Play, QrCode, Check } from "lucide-react"

const features = [
  "Exclusive app-only deals",
  "Real-time order tracking",
  "Save your favorite restaurants",
  "Quick reorder from history",
]

export function AppDownload() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Content */}
          <div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Get the Feast App</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Download our mobile app for the best ordering experience. Get exclusive deals, faster checkout, and
              real-time tracking on the go.
            </p>

            {/* Features */}
            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Download Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" className="h-14 gap-3 rounded-xl px-6">
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <p className="text-xs opacity-90">Download on the</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </Button>
              <Button size="lg" variant="outline" className="h-14 gap-3 rounded-xl px-6 bg-transparent">
                <Play className="h-6 w-6 text-foreground" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Get it on</p>
                  <p className="font-semibold text-foreground">Google Play</p>
                </div>
              </Button>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="relative">
              {/* Phone Frame */}
              <div className="relative mx-auto w-[280px] rounded-[40px] bg-foreground p-3 shadow-2xl md:w-[320px]">
                <div className="overflow-hidden rounded-[32px] bg-card">
                  <img src="https://i.pinimg.com/1200x/f8/d5/d6/f8d5d6da4f3eac002d7b01ebe54ee6c0.jpg" alt="Feast mobile app" className="w-full" />  
                </div>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-foreground rounded-b-2xl" />
              </div>

              {/* QR Code Card */}
              <div className="absolute -right-4 bottom-20 rounded-2xl bg-card border border-border p-4 shadow-lg md:-right-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-secondary">
                    <QrCode className="h-10 w-10 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Scan to Download</p>
                    <p className="text-sm text-muted-foreground">iOS & Android</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-primary/20 blur-xl" />
            <div className="absolute -right-6 top-10 h-32 w-32 rounded-full bg-accent/20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
