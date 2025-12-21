import { Smartphone, Search, ShoppingBag, Bike } from "lucide-react"

const steps = [
  {
    icon: Smartphone,
    title: "Open the App",
    description: "Download our app or visit our website to get started on your culinary journey.",
  },
  {
    icon: Search,
    title: "Browse & Choose",
    description: "Explore thousands of restaurants and cuisines. Filter by ratings, delivery time, or distance.",
  },
  {
    icon: ShoppingBag,
    title: "Place Your Order",
    description: "Customize your meal, add to cart, and checkout securely in just a few taps.",
  },
  {
    icon: Bike,
    title: "Fast Delivery",
    description: "Track your order in real-time as our drivers bring your food straight to your door.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">How It Works</h2>
          <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting your favorite food delivered has never been easier. Just follow these simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-[2px] bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary" />
                </div>
              )}

              {/* Step Number */}
              <div className="relative mx-auto mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-card shadow-sm border border-border transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground shadow-sm">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
