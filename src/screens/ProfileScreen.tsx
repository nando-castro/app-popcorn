export function ProfileScreen() {
return (
<div className="px-4 py-6 space-y-4">
<div className="bg-white rounded-2xl border p-4">
<div className="text-lg font-semibold">Minha conta</div>
<div className="text-sm text-neutral-600">Pedidos, endereços e pagamentos salvos (mock).</div>
</div>
<div className="grid gap-2">
<button className="py-3 rounded-xl border">Meus pedidos</button>
<button className="py-3 rounded-xl border">Endereços</button>
<button className="py-3 rounded-xl border">Formas de pagamento</button>
</div>
</div>
)
}