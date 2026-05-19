import api from "./axios"

// import type { AuthResponse, LoginData, RegisterData } from "../types/auth.types"

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





// ------------------- AUTH API -------------------

// --LOGIN
export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/login", data)
    return res.data
}

// --LOGOUT
export const logoutUser = async (): Promise<AuthResponse> => {
    const res = await api.put<AuthResponse>("/logout")
    return res.data
}

// --REGISTER
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
    const res = await api.post<AuthResponse>("/register", data)
    return res.data
}