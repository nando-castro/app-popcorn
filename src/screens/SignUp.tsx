import { useState } from 'react'
import { useAuth } from '../state/useAuth'
import { onlyDigits } from '../utils/identity'

export function SignUp({ onSuccess }: { onSuccess: () => void }) {
  const { signUp } = useAuth()
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const ok = name && onlyDigits(cpf).length===11 && phone && email && password.length>=6

  const submit = async () => {
    await signUp({ name, cpf: onlyDigits(cpf), phone, email, password })
    onSuccess()
  }

  return (
    <div className="p-4 space-y-3 max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Criar conta</h2>
      <input className="w-full border rounded-xl px-3 py-2" placeholder="Nome completo" value={name} onChange={e=>setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <input className="border rounded-xl px-3 py-2" placeholder="CPF" value={cpf} onChange={e=>setCpf(e.target.value)} />
        <input className="border rounded-xl px-3 py-2" placeholder="Telefone" value={phone} onChange={e=>setPhone(e.target.value)} />
      </div>
      <input className="w-full border rounded-xl px-3 py-2" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="w-full border rounded-xl px-3 py-2" placeholder="Senha (mín. 6)"
             value={password} onChange={e=>setPassword(e.target.value)} />
      <button disabled={!ok} onClick={submit}
        className={`w-full py-3 rounded-xl ${ok ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
        Criar conta
      </button>
    </div>
  )
}
