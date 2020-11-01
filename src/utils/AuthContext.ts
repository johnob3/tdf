import * as React from 'react'
import { AuthError } from '../auth/LoginPage'

export interface AuthContextType {
    login(email: string, password: string, setError: React.Dispatch<React.SetStateAction<AuthError>>): void
    logout(): void
}

export const AuthContext = React.createContext<AuthContextType>(undefined as any)