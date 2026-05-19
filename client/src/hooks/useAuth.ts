import { useState } from "react"
import { loginUser, logoutUser, registerUser } from "../api/auth.api"
// import { AuthResponse, LoginData, RegisterData } from "../types/auth.types"

 type LoginData = {
  email: string
  password: string
}

 type RegisterData = {
  name: string
  email: string
  password: string
  phoneNumber: string
  consent: boolean
}

 type AuthResponse = {
  success: boolean
  user: {
    _id: string
    name?: string
    email: string
    phoneNumber?: string
    lastLoginAt?: string
  }
  accessToken?: string
  refreshToken?: string
}



type AuthHook = {
    user: AuthResponse["user"] | null
    loading: boolean
    error: string | null
    login: (data: LoginData) => Promise<void>
    logout: () => Promise<void>
    register: (data: RegisterData) => Promise<void>
}

export const useAuth = (): AuthHook => {
    const [user, setUser] = useState<AuthResponse["user"] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (data: LoginData) => {
        setLoading(true)
        setError(null)
        try {
            const res = await loginUser(data)
            setUser(res.user)
        } catch (err: any) {
            setError(err?.message || "Login failed")
        } finally {
            setLoading(false)
        }
    }

    const logout = async () => {
        setLoading(true)
        setError(null)
        try {
            await logoutUser()
            setUser(null)
        } catch (err: any) {
            setError(err?.message || "Logout failed")
        } finally {
            setLoading(false)
        }
    }

    const register = async (data: RegisterData) => {
        setLoading(true)
        setError(null)
        try {
            const res = await registerUser(data)
            setUser(res.user)
        } catch (err: any) {
            setError(err?.message || "Register failed")
        } finally {
            setLoading(false)
        }
    }

    return { user, loading, error, login, logout, register }
}