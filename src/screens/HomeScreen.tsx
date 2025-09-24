import { Search, ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../types';
import { currency } from '../utils/currency';

interface HomeScreenProps {
    products: Product[];
    cartCount?: number;
    query: string;
    setQuery: (v: string) => void;
    onOpenProduct: (p: Product) => void;
    onGoCart: () => void;
}


export function HomeScreen({ products, cartCount = 0, query, setQuery, onOpenProduct, onGoCart }: HomeScreenProps) {
return (
<div className="px-4 py-4">
<div className="flex gap-2 items-center">
<div className="flex-1 relative">
<Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
<input
value={query}
onChange={(e) => setQuery(e.target.value)}
placeholder="Buscar sabores, combos..."
className="w-full pl-9 pr-3 py-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-emerald-500"
/>
</div>
<button onClick={onGoCart} className="relative p-2 rounded-xl border hover:bg-neutral-50">
  <ShoppingCart className="w-5 h-5" />
  {typeof cartCount === 'number' && cartCount > 0 && (
    <span className="absolute -top-1 -right-1 text-[10px] min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white grid place-items-center">
      {cartCount > 99 ? '99+' : cartCount}
    </span>
  )}
</button>
</div>


<div className="mt-4 grid grid-cols-2 gap-3">
{products.map((p) => (
<button key={p.id} onClick={() => onOpenProduct(p)} className="text-left bg-white rounded-2xl shadow-sm border hover:shadow-md transition">
<div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
<img src={p.image} alt={p.name} className="w-full h-full object-cover" />
</div>
<div className="p-3">
<div className="flex items-center gap-1 text-amber-500 text-sm">
<Star className="w-4 h-4 fill-amber-500" />
<span>{p.rating?.toFixed(1)}</span>
</div>
<h3 className="font-semibold leading-tight">{p.name}</h3>
<p className="text-xs text-neutral-500 line-clamp-2">{p.desc}</p>
<div className="mt-2 font-semibold">a partir de {currency(p.base)}</div>
</div>
</button>
))}
</div>
</div>
)
}