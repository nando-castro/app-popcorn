import { ChevronLeft, CookingPot } from 'lucide-react';


interface AppHeaderProps {
  readonly screen: { key: 'home' | 'detail' | 'cart' | 'address' | 'payment' | 'tracking' | 'profile' };
  readonly onBack: () => void;
}

export function AppHeader({ screen, onBack }: AppHeaderProps) {
const title =
screen.key === 'home'
? 'Pipoca Gourmet'
: screen.key === 'detail'
? 'Detalhe do Produto'
: screen.key === 'cart'
? 'Seu Carrinho'
: screen.key === 'address'
? 'Entrega ou Retirada'
: screen.key === 'payment'
? 'Pagamento'
: screen.key === 'tracking'
? 'Acompanhar Pedido'
: 'Minha Conta'


return (
<header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b">
<div className="max-w-md mx-auto flex items-center gap-3 px-4 py-3">
{screen.key !== 'home' && (
<button className="p-2 rounded-xl hover:bg-neutral-100" onClick={onBack} aria-label="Voltar">
<ChevronLeft className="w-5 h-5" />
</button>
)}
<div className="flex items-center gap-2">
<CookingPot className="w-5 h-5" />
<h1 className="font-semibold">{title}</h1>
</div>
</div>
</header>
)
}