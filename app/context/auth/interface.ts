'use client'

import { Auth } from "@/app/types/auth"
import { createContext, ReactNode, useContext, useEffect } from "react"

export type IAuthProvider = React.FC<{
  children: ReactNode
}>

export type IAuthContext = {
  auth: Auth | null
  setAuth: (auth: Auth | null) => void
}

export const AuthContext = createContext<IAuthContext | null>(null)

export function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  useEffect (function onDidMount() {
    if(!context) {
      console.error('useAuth must have AuthProvider as parent.')
    }
  })

  return context as IAuthContext
}