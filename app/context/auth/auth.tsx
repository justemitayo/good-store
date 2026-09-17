'use client'

import { useAuthStore } from "@/app/store/auth.store"
import { AuthContext, IAuthProvider } from "./interface"


export const AuthProvider: IAuthProvider = function AuthProvider({ children }) {
  const auth = useAuthStore().auth
  const setAuth = useAuthStore().updateAuth

  return(
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
  )

}