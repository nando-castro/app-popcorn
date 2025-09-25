export const onlyDigits = (s: string) => (s || '').replace(/\D/g, '');

export function detectIdentifier(id: string): 'email'|'phone'|'cpf' {
  const v = id.trim();
  if (v.includes('@')) return 'email';
  const d = onlyDigits(v);
  if (d.length === 11) return 'cpf';
  return 'phone';
}

export function normalizeIdentifier(id: string) {
  const kind = detectIdentifier(id);
  if (kind === 'email') return { kind, value: id.trim().toLowerCase() };
  if (kind === 'cpf')   return { kind, value: onlyDigits(id) };
  // phone – normalize para E.164 simplificado (assuma BR se vier com 10/11 dígitos)
  let d = onlyDigits(id);
  if (!d.startsWith('55')) d = '55' + d;
  return { kind, value: '+' + d };
}

// validações simples (pode trocar por zod depois)
export const isValidCPF = (cpf: string) => onlyDigits(cpf).length === 11; // (coloque algoritmo oficial se quiser)
export const isValidPhone = (p: string) => onlyDigits(p).length >= 10;    // simplificado
export const isValidEmail = (e: string) => /\S+@\S+\.\S+/.test(e);
