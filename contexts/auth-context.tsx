"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface MockUser {
  id: string
  email: string
  user_metadata: {
    full_name?: string
  }
}

interface AuthContextType {
  user: MockUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
  refreshUser: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const signIn = async (email: string, password: string) => {
    // Mock sign in - accept any email/password combination
    if (email && password) {
      const mockUser: MockUser = {
        id: "mock-user-id",
        email,
        user_metadata: {
          full_name: email.split("@")[0]
        }
      }
      setUser(mockUser)
      localStorage.setItem("mockUser", JSON.stringify(mockUser))
      return { error: null }
    }
    return { error: "Invalid credentials" }
  }

  const signUp = async (email: string, password: string, fullName?: string) => {
    // Mock sign up - accept any email/password combination
    if (email && password) {
      const mockUser: MockUser = {
        id: "mock-user-id",
        email,
        user_metadata: {
          full_name: fullName || email.split("@")[0]
        }
      }
      setUser(mockUser)
      localStorage.setItem("mockUser", JSON.stringify(mockUser))
      return { error: null }
    }
    return { error: "Invalid credentials" }
  }

  const signOut = async () => {
    setUser(null)
    localStorage.removeItem("mockUser")
    router.push("/")
  }

  const refreshUser = async () => {
    const storedUser = localStorage.getItem("mockUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("mockUser")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
