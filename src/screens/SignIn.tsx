import { useState } from 'react';
import { useAuth } from '../state/useAuth';

export function SignIn({ onSuccess, goSignUp }: { onSuccess: () => void; goSignUp: () => void }) {
  const { signIn } = useAuth()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')

  const ok = identifier.trim().length > 3 && password.length >= 6

  const submit = async () => {
    await signIn({ identifier, password })
    onSuccess()
  }

  return (
    <div className="p-4 space-y-3 max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Entrar</h2>
      <input className="w-full border rounded-xl px-3 py-2" placeholder="E-mail, CPF ou Telefone"
             value={identifier} onChange={(e)=>setIdentifier(e.target.value)} />
      <input type="password" className="w-full border rounded-xl px-3 py-2" placeholder="Senha"
             value={password} onChange={(e)=>setPassword(e.target.value)} />
      <button disabled={!ok} onClick={submit}
        className={`w-full py-3 rounded-xl ${ok ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
        Entrar
      </button>
      <button onClick={goSignUp} className="w-full py-3 rounded-xl border">Criar conta</button>
    </div>
  )
}
