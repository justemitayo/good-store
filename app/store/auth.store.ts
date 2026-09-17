'use cient'
import {create} from  'zustand'
import {persist, createJSONStorage} from 'zustand/middleware'
import { Auth } from '../types/auth'

interface State {
  auth: Auth | null
}

interface Action {
  updateAuth: (auth: State['auth']) => void
  clearAuth: () => void
}

export const useAuthStore = create<
  State & Action, [['zustand/persist', unknown]]
>(
  persist(
    set => ({
      auth: null,
      updateAuth: auth => set(() => ({auth})), 
      clearAuth: () => set(() => ({auth: null}))
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)