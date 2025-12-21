"use client"

import { Star, Quote } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const testimonials = [
  {
    id: 1,
    name: "Vansh Darji",
    role: "Food Enthusiast",
    avatar: "/vansh1.jpg",
    rating: 5,
    text: "Feast has completely changed how I order food. The variety of restaurants and the quick delivery are unmatched. I use it almost every day!",
  },
  {
    id: 2,
    name: "Vansh Darji",
    role: "Busy Professional",
    avatar: "/vansh2.jpg",
    rating: 5,
    text: "As someone who works long hours, Feast is a lifesaver. Real-time tracking and accurate delivery times mean I can plan my meals perfectly.",
  },
  {
    id: 3,
    name: "Vansh Darji",
    role: "Home Cook",
    avatar: "/vansh3.jpg",
    rating: 5,
    text: "Even as someone who loves cooking, Feast is my go-to for discovering new cuisines. The restaurant quality and presentation are always top-notch.",
  },
]

export function Testimonials() {
  const { t } = useLanguage()

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">{t('testimonials.title')}</h2>
          <p className="mt-3 text-lg text-muted-foreground">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative rounded-2xl bg-card border border-border p-8 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 h-10 w-10 text-primary/10" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground leading-relaxed mb-6">
                {'"'}
                {testimonial.text}
                {'"'}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-8 rounded-2xl bg-primary p-8 text-primary-foreground md:grid-cols-4 md:p-12">
          <div className="text-center">
            <p className="text-4xl font-bold md:text-5xl">2M+</p>
            <p className="mt-1 text-sm opacity-90">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold md:text-5xl">50K+</p>
            <p className="mt-1 text-sm opacity-90">Restaurant Partners</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold md:text-5xl">200+</p>
            <p className="mt-1 text-sm opacity-90">Cities Covered</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold md:text-5xl">4.9</p>
            <p className="mt-1 text-sm opacity-90">Average Rating</p>
          </div>
        </div>
      </div>
    </section>
  )
}
