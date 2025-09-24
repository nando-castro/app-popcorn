import { CheckCircle2, Clock, CookingPot, ListChecks, Package, Truck } from 'lucide-react';
import { useState } from 'react';


export function TrackingScreen({ orderId, onGoHome }: { orderId: string; onGoHome: () => void }) {
const [step, setStep] = useState(0)
const steps = [
{ key: 'RECEBIDO', icon: ListChecks, desc: 'Pedido recebido' },
{ key: 'EM_PREPARO', icon: CookingPot, desc: 'Em preparo' },
{ key: 'PRONTO', icon: Package, desc: 'Pronto' },
{ key: 'A_CAMINHO', icon: Truck, desc: 'A caminho' },
{ key: 'ENTREGUE', icon: CheckCircle2, desc: 'Entregue' },
]
const next = () => setStep((s) => Math.min(s + 1, steps.length - 1))


return (
<div className="px-4 py-6 space-y-4">
<div className="bg-white rounded-2xl border p-4">
<div className="text-sm text-neutral-500">Pedido</div>
<div className="text-xl font-semibold">{orderId}</div>
</div>


<div className="bg-white rounded-2xl border p-4">
<div className="text-sm font-medium mb-3 flex items-center gap-2"><Clock className="w-4 h-4" /> Acompanhar status</div>
<ol className="space-y-3">
{steps.map((s, i) => (
<li key={s.key} className="flex items-center gap-3">
<s.icon className={`w-5 h-5 ${i <= step ? 'text-emerald-600' : 'text-neutral-300'}`} />
<div className="flex-1">
<div className={`text-sm ${i <= step ? 'font-semibold' : 'text-neutral-500'}`}>{s.desc}</div>
</div>
</li>
))}
</ol>
{step < steps.length - 1 ? (
<button onClick={next} className="mt-4 w-full py-2 rounded-xl border">Avançar status (demo)</button>
) : (
<button onClick={onGoHome} className="mt-4 w-full py-2 rounded-xl bg-emerald-600 text-white">Voltar ao início</button>
)}
</div>
</div>
)
}