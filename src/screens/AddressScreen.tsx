import { Bike, MapPin, Package, Truck } from 'lucide-react'

// interface Address {
//   cep: string;
//   street: string;
//   number: string;
//   district: string;
//   note?: string;
// }

// interface AddressScreenProps {
//   method: 'delivery' | 'pickup';
//   setMethod: (method: 'delivery' | 'pickup') => void;
//   address: Address;
//   setAddress: (address: Address) => void;
//   onContinue: () => void;
// }

// export function AddressScreen({ method, setMethod, address, setAddress, onContinue }: AddressScreenProps) {
// return (
export function AddressScreen({ method, setMethod, address, setAddress, onContinue }: any) {
return (
<div className="px-4 py-4 space-y-4">
<div className="bg-white rounded-2xl border p-3">
<div className="text-sm font-medium mb-2">Como você quer receber?</div>
<div className="grid grid-cols-2 gap-2">
<button onClick={() => setMethod('delivery')} className={`py-3 rounded-xl border flex items-center justify-center gap-2 ${method === 'delivery' ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}>
<Truck className="w-4 h-4" /> Entrega
</button>
<button onClick={() => setMethod('pickup')} className={`py-3 rounded-xl border flex items-center justify-center gap-2 ${method === 'pickup' ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}>
<Package className="w-4 h-4" /> Retirar
</button>
</div>
</div>


{method === 'delivery' ? (
<div className="bg-white rounded-2xl border p-3 space-y-3">
<div className="text-sm font-medium flex items-center gap-2"><MapPin className="w-4 h-4" /> Endereço de entrega</div>
<div className="grid grid-cols-3 gap-2">
<input value={address.cep} onChange={(e) => setAddress({ ...address, cep: e.target.value })} placeholder="CEP" className="border rounded-xl px-3 py-2 col-span-1" />
<input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} placeholder="Rua" className="border rounded-xl px-3 py-2 col-span-2" />
<input value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} placeholder="Número" className="border rounded-xl px-3 py-2" />
<input value={address.district} onChange={(e) => setAddress({ ...address, district: e.target.value })} placeholder="Bairro" className="border rounded-xl px-3 py-2 col-span-2" />
<input value={address.note} onChange={(e) => setAddress({ ...address, note: e.target.value })} placeholder="Complemento (opcional)" className="border rounded-xl px-3 py-2 col-span-3" />
</div>
</div>
) : (
<div className="bg-white rounded-2xl border p-3 space-y-2">
<div className="text-sm font-medium flex items-center gap-2"><Bike className="w-4 h-4" /> Retirada na loja</div>
<p className="text-sm text-neutral-600">Endereço: Av. Gourmet, 123 – Centro. Pronto em ~15min.</p>
</div>
)}


<button onClick={onContinue} className="w-full py-3 rounded-xl bg-emerald-600 text-white shadow">Continuar</button>
</div>
)
}