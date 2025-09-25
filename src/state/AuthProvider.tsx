import { useState } from 'react'
import type { AuthUser, GuestProfile, SignInDTO, SignUpDTO } from '../types/auth'
import { normalizeIdentifier } from '../utils/identity'
import { AuthCtx, type Ctx } from './auth-context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [guest, setGuest] = useState<GuestProfile | null>(() => {
    const raw = localStorage.getItem('guest_profile')
    return raw ? JSON.parse(raw) : null
  })

  async function signIn({ identifier }: SignInDTO) {
    const norm = normalizeIdentifier(identifier)
    setUser({ id: 'u1', name: 'Cliente', email: norm.kind === 'email' ? norm.value : undefined })
    await linkGuestOrders()
  }

  async function signUp(dto: SignUpDTO) {
    setUser({ id: 'u2', name: dto.name, email: dto.email, phone: dto.phone, cpf: dto.cpf })
    await linkGuestOrders()
  }

  function saveGuest(g: GuestProfile) {
    setGuest(g)
    localStorage.setItem('guest_profile', JSON.stringify(g))
  }

  async function linkGuestOrders() { /* TODO API real */ }

  function signOut() { setUser(null) }

  const value: Ctx = { user, guest, signIn, signUp, saveGuest, linkGuestOrders, signOut }
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>
}
