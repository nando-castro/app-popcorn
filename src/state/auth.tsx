import { createContext, useContext, useState } from 'react';
import type { AuthUser, GuestProfile, SignInDTO, SignUpDTO } from '../types/auth';
import { normalizeIdentifier } from '../utils/identity';
/* eslint-disable react-refresh/only-export-components */
type Ctx = {
  user: AuthUser | null;
  guest: GuestProfile | null;
  signIn: (dto: SignInDTO) => Promise<void>;
  signUp: (dto: SignUpDTO) => Promise<void>;
  saveGuest: (g: GuestProfile) => void;
  linkGuestOrders: () => Promise<void>;
  signOut: () => void;
};
const AuthCtx = createContext<Ctx>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [guest, setGuest] = useState<GuestProfile | null>(() => {
    const raw = localStorage.getItem('guest_profile');
    return raw ? JSON.parse(raw) : null;
  });

  async function signIn({ identifier }: SignInDTO) {
    const norm = normalizeIdentifier(identifier);
    // TODO: chamar API real. Aqui: mock do usuário retornado
    setUser({ id: 'u1', name: 'Cliente', email: norm.kind === 'email' ? norm.value : undefined });
    await linkGuestOrders();
  }

  async function signUp(dto: SignUpDTO) {
    // TODO: API real (cria user)
    setUser({ id: 'u2', name: dto.name, email: dto.email, phone: dto.phone, cpf: dto.cpf });
    await linkGuestOrders();
  }

  function saveGuest(g: GuestProfile) {
    setGuest(g);
    localStorage.setItem('guest_profile', JSON.stringify(g));
  }

  async function linkGuestOrders() {
    // TODO: chamar POST /auth/link-guest com guest_token ou identificadores (cpf/phone/email)
    // para reatribuir pedidos do convidado ao user logado.
  }

  function signOut() { setUser(null); }

  return <AuthCtx.Provider value={{ user, guest, signIn, signUp, saveGuest, linkGuestOrders, signOut }}>
    {children}
  </AuthCtx.Provider>;
}
export const useAuth = () => useContext(AuthCtx);