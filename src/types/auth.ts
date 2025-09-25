export type IdentifierKind = 'email' | 'phone' | 'cpf';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  phone?: string; // E.164, ex: +5511999999999
  cpf?: string;   // somente dígitos
}

export interface GuestProfile {
  name: string;
  cpf: string;
  phone: string;
  email?: string;
}

export interface SignInDTO { identifier: string; password: string; }
export interface SignUpDTO extends GuestProfile { password: string; }
