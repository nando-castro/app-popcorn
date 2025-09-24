import { CreditCard, QrCode, SendHorizontal, Wallet } from 'lucide-react'
import { Row } from '../components/Row'
import { currency } from '../utils/currency'


export function PaymentScreen({ pay, setPay, total, onGeneratePix, pixGenerated, onConfirm }: any) {
return (
<div className="px-4 py-4 space-y-4">
<div className="bg-white rounded-2xl border p-3">
<div className="text-sm font-medium mb-2">Forma de pagamento</div>
<div className="grid grid-cols-3 gap-2">
<button onClick={() => setPay('pix')} className={`py-3 rounded-xl border flex items-center justify-center gap-2 ${pay === 'pix' ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}>
<QrCode className="w-4 h-4" /> PIX
</button>
<button onClick={() => setPay('card')} className={`py-3 rounded-xl border flex items-center justify-center gap-2 ${pay === 'card' ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}>
<CreditCard className="w-4 h-4" /> Cartão
</button>
<button onClick={() => setPay('cash')} className={`py-3 rounded-xl border flex items-center justify-center gap-2 ${pay === 'cash' ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}>
<Wallet className="w-4 h-4" /> Dinheiro
</button>
</div>
</div>


{pay === 'pix' && (
<div className="bg-white rounded-2xl border p-3 space-y-2">
<div className="text-sm font-medium flex items-center gap-2"><SendHorizontal className="w-4 h-4" /> PIX</div>
{!pixGenerated ? (
<button onClick={onGeneratePix} className="w-full py-2 rounded-xl border">Gerar QR Code (mock)</button>
) : (
<div className="text-center space-y-2">
<div className="aspect-square w-40 mx-auto rounded-xl bg-neutral-100 grid place-content-center">QR</div>
<div className="text-xs text-neutral-500">Simulação de QR. Ao confirmar, o pedido será criado.</div>
</div>
)}
</div>
)}


<div className="bg-white rounded-2xl border p-3 text-sm">
<Row label="Total a pagar" value={<b>{currency(total)}</b>} />
</div>


<button onClick={onConfirm} className="w-full py-3 rounded-xl bg-emerald-600 text-white shadow">Confirmar pedido</button>
</div>
)
}