"use client"

import type React from "react"
import { useState, useTransition, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Eye, EyeOff, Mail, Lock, ArrowLeft, Check } from "lucide-react"

function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
  const [countdown, setCountdown] = useState(3)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + 100 / 30
      })
    }, 100)

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          return 0
        }
        return prev - 1
      })
    }, 1000)

    const redirectTimeout = setTimeout(() => {
      onComplete()
    }, 3000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(countdownInterval)
      clearTimeout(redirectTimeout)
    }
  }, [onComplete])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center animate-in fade-in zoom-in duration-500">
        <div className="relative w-28 h-28 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-green-100 animate-in zoom-in duration-300" />
          <div className="absolute inset-2 rounded-full bg-green-50 flex items-center justify-center">
            <Check className="h-14 w-14 text-green-600 animate-in fade-in zoom-in duration-500 delay-200" />
          </div>
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className="text-green-200"
            />
            <circle
              cx="56"
              cy="56"
              r="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              className="text-green-500 transition-all duration-100 ease-linear"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - progress / 100)}`}
            />
          </svg>
        </div>

        <h2 className="font-serif text-2xl font-bold text-foreground mb-2">Welcome back!</h2>
        <p className="text-muted-foreground mb-6">You have successfully signed in.</p>

        <div className="inline-flex items-center gap-2 bg-secondary/50 rounded-full px-4 py-2">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">
            Redirecting to home in <span className="font-bold text-primary">{countdown}</span>s
          </span>
        </div>

        <div className="mt-6 w-64 mx-auto h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleAnimationComplete = useCallback(() => {
    startTransition(() => {
      router.replace("/")
      router.refresh()
    })
  }, [router])

  const { signIn } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    const { error } = await signIn(email, password)

    if (error) {
      setError(error)
      setIsLoading(false)
      return
    }

    setShowSuccess(true)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    // Mock Google login
    const { error } = await signIn("google@example.com", "password")
    if (error) {
      setError(error)
    } else {
      setShowSuccess(true)
    }
    setIsLoading(false)
  }

  const handleAppleLogin = async () => {
    setIsLoading(true)
    // Mock Apple login
    const { error } = await signIn("apple@example.com", "password")
    if (error) {
      setError(error)
    } else {
      setShowSuccess(true)
    }
    setIsLoading(false)
  }

  if (showSuccess) {
    return <SuccessAnimation onComplete={handleAnimationComplete} />
  }

  return (
    <div className="min-h-screen flex">
      {/* Left - Form Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to home
          </Link>

          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
              <span className="font-serif text-2xl font-bold text-primary-foreground">F</span>
            </div>
            <span className="font-serif text-3xl font-bold text-foreground">Feast</span>
          </Link>

          <h1 className="text-3xl font-serif font-bold text-foreground">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your account to continue ordering</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full h-12 gap-3 hover:bg-secondary bg-transparent active:scale-[0.98] transition-all"
              onClick={handleGoogleLogin}
              type="button"
              disabled={isLoading || isPending}
              suppressHydrationWarning
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.84c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23s.43-3.45 1.18-4.93l3.66 2.84z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66 2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 2.43-4.53 4.12-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 gap-3 hover:bg-secondary bg-transparent active:scale-[0.98] transition-all"
              onClick={handleAppleLogin}
              type="button"
              disabled={isLoading || isPending}
              suppressHydrationWarning
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with email</span>
            </div>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                  disabled={isLoading || isPending}
                  suppressHydrationWarning
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                  disabled={isLoading || isPending}
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  suppressHydrationWarning
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>}

            <Button
              type="submit"
              className="w-full h-12 active:scale-[0.98] transition-all"
              disabled={isLoading || isPending}
              suppressHydrationWarning
            >
              {isLoading || isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right - Image Section (hidden on mobile) */}
      <div className="hidden lg:flex lg:flex-1 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            <img
              src="https://i.pinimg.com/736x/89/22/39/892239cedc40aee2ad8d5d35e38d7a0e.jpg"
              alt="Delicious food"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Craving something delicious?</h2>
          <p className="text-muted-foreground">
            Sign in to discover thousands of restaurants and get your favorite meals delivered fast.
          </p>
        </div>
      </div>
    </div>
  )
}
