import { useState } from 'react';
import { useAuth } from '../state/auth';
import { isValidCPF, isValidEmail, isValidPhone, onlyDigits } from '../utils/identity';

export function GuestInfo({ onDone }: { onDone: () => void }) {
  const { saveGuest } = useAuth();
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const ok = name && isValidCPF(cpf) && isValidPhone(phone) && (!email || isValidEmail(email));

  return (
    <div className="bg-white rounded-2xl border p-4 space-y-3">
      <div className="text-sm font-medium">Seus dados</div>
      <input className="w-full border rounded-xl px-3 py-2" placeholder="Nome completo" value={name} onChange={e=>setName(e.target.value)} />
      <div className="grid grid-cols-2 gap-2">
        <input className="border rounded-xl px-3 py-2" placeholder="CPF" value={cpf}
               onChange={e=>setCpf(onlyDigits(e.target.value))} />
        <input className="border rounded-xl px-3 py-2" placeholder="Telefone (DDD...)" value={phone}
               onChange={e=>setPhone(e.target.value)} />
      </div>
      <input className="w-full border rounded-xl px-3 py-2" placeholder="E-mail (opcional)" value={email} onChange={e=>setEmail(e.target.value)} />
      <button disabled={!ok}
        onClick={() => { saveGuest({ name, cpf: onlyDigits(cpf), phone, email: email || undefined }); onDone(); }}
        className={`w-full py-3 rounded-xl ${ok ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
        Continuar
      </button>
      <p className="text-xs text-neutral-500">Você também pode <b>entrar</b> ou <b>cadastrar</b> para salvar seus dados permanentemente.</p>
    </div>
  );
}
