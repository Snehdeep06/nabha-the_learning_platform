"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: "student" | "teacher"
  class?: string
  board?: string
  isFirstLogin?: boolean
}

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  isAuthenticated: boolean
  updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    console.log("[v0] AuthProvider initializing...")

    // Check for stored user data on mount
    const storedUser = localStorage.getItem("nabha_user")
    console.log("[v0] Stored user data:", storedUser)

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log("[v0] Parsed user:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("[v0] Error parsing stored user:", error)
        localStorage.removeItem("nabha_user")
      }
    }

    setIsInitialized(true)
    console.log("[v0] AuthProvider initialized")
  }, [])

  const login = (userData: User) => {
    console.log("[v0] Logging in user:", userData)
    setUser(userData)
    localStorage.setItem("nabha_user", JSON.stringify(userData))
  }

  const logout = () => {
    console.log("[v0] Logging out user")
    setUser(null)
    localStorage.removeItem("nabha_user")
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData }
      console.log("[v0] Updating user:", updatedUser)
      setUser(updatedUser)
      localStorage.setItem("nabha_user", JSON.stringify(updatedUser))
    }
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
