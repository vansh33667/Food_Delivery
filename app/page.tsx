import { Header } from "@/components/landing/header"
import { Hero } from "@/components/landing/hero"
import { Categories } from "@/components/landing/categories"
import { FeaturedRestaurants } from "@/components/landing/featured-restaurants"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"
import { AppDownload } from "@/components/landing/app-download"
import { Footer } from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Categories />
      <FeaturedRestaurants />
      <HowItWorks />
      <Testimonials />
      <AppDownload />
      <Footer />
    </main>
  )
}
