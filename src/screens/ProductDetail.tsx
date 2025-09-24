import { useState } from 'react';
import { Pill } from '../components/Pill';
import type { Addon, Product, Size } from '../types';
import { currency } from '../utils/currency';

const AVAILABLE_ADDONS: Addon[] = [
  { id: 'caramelo-extra', name: '+ Caramelo extra', price: 300 },
  { id: 'ovomaltine',     name: '+ Ovomaltine',     price: 400 },
  { id: 'choc-branco',    name: '+ Chocolate branco', price: 350 },
  { id: 'queijo-ralado',  name: '+ Queijo ralado',  price: 250 },
]

export function ProductDetail({
  product,
  onAdd,
  onGoCart,
}: { product: Product; onAdd: (size: Size, addons: Addon[]) => void; onGoCart: () => void }) {
  const [size, setSize] = useState<Size>('M')
  const [addons, setAddons] = useState<Addon[]>([])

  const toggleAddon = (a: Addon) =>
    setAddons(prev => prev.find(x => x.id === a.id) ? prev.filter(x => x.id !== a.id) : [...prev, a])

  const sizeFactor = { P: 1, M: 1.5, G: 2 } as const
  const base = Math.round(product.base * sizeFactor[size])
  const addonsTotal = addons.reduce((s, a) => s + a.price, 0)
  const price = base + addonsTotal

  return (
    <div className="pb-4">
      <div className="aspect-video w-full">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className="text-sm text-neutral-600">{product.desc}</p>
          <div className="mt-2 flex gap-2">{product.tags?.map((t) => <Pill key={t}>{t}</Pill>)}</div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Tamanho</div>
          <div className="grid grid-cols-3 gap-2">
            {(['P','M','G'] as Size[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`py-2 rounded-xl border ${size === s ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm font-medium mb-2">Adicionais</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {AVAILABLE_ADDONS.map((a) => {
              const checked = !!addons.find(x => x.id === a.id)
              return (
                <label key={a.id} className={`flex items-center justify-between rounded-xl border p-2 ${checked ? 'border-emerald-500 bg-emerald-50' : 'hover:bg-neutral-50'}`}>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" checked={checked} onChange={() => toggleAddon(a)} />
                    <span className="text-sm">{a.name}</span>
                  </div>
                  <span className="text-xs">{currency(a.price)}</span>
                </label>
              )
            })}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-500">Total</div>
            <div className="text-xl font-bold">{currency(price)}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={onGoCart} className="px-4 py-2 rounded-xl border hover:bg-neutral-50">Ver carrinho</button>
            <button onClick={() => onAdd(size, addons)} className="px-4 py-2 rounded-xl bg-emerald-600 text-white shadow hover:bg-emerald-700">
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
