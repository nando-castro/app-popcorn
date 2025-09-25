import { createContext } from 'react'
import type { AuthUser, GuestProfile, SignInDTO, SignUpDTO } from '../types/auth'

export type Ctx = {
  user: AuthUser | null
  guest: GuestProfile | null
  signIn: (dto: SignInDTO) => Promise<void>
  signUp: (dto: SignUpDTO) => Promise<void>
  saveGuest: (g: GuestProfile) => void
  linkGuestOrders: () => Promise<void>
  signOut: () => void
}

export const AuthCtx = createContext<Ctx | undefined>(undefined)
