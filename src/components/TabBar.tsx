import { Home, ShoppingCart, User } from 'lucide-react'

export function TabBar({
  active,
  cartCount = 0,
  onHome,
  onCart,
  onProfile,
}: {
  active: string
  cartCount?: number
  onHome: () => void
  onCart: () => void
  onProfile: () => void
}) {
  const item = (key: string, Icon: any, label: string, onClick: () => void, badge?: number) => (
    <button
      onClick={onClick}
      className={`relative flex-1 flex flex-col items-center justify-center py-2 ${active === key ? 'text-emerald-600' : 'text-neutral-500'}`}
    >
      <Icon className="w-5 h-5" />
      {!!badge && (
        <span className="absolute top-1/2 left-1/2 translate-x-3 -translate-y-4 text-[10px] min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white grid place-items-center">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
      <span className="text-xs">{label}</span>
    </button>
  )

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
      <div className="max-w-md mx-auto flex">
        {item('home', Home, 'Início', onHome)}
        {item('cart', ShoppingCart, 'Carrinho', onCart, cartCount)}   {/* badge aqui */}
        {item('profile', User, 'Perfil', onProfile)}
      </div>
    </nav>
  )
}
