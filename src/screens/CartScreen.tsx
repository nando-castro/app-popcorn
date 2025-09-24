import { Minus, Plus, ShoppingCart } from "lucide-react";
import { EmptyState } from "../components/EmptyState";
import { Row } from "../components/Row";
import type { CartItem } from "../types";
import { currency } from "../utils/currency";

interface CartScreenProps {
  cart: CartItem[];
  changeQty: (id: string, delta: number) => void;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  coupon: string;
  setCoupon: (coupon: string) => void;
  onContinue: () => void;
  onClear: () => void;
}

export function CartScreen({
  cart,
  changeQty,
  subtotal,
  deliveryFee,
  discount,
  total,
  coupon,
  setCoupon,
  onContinue,
  onClear,
}: CartScreenProps) {
  return (
    <div className="px-4 py-4 space-y-4">
      {cart.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Seu carrinho está vazio"
          subtitle="Adicione delícias no catálogo."
        />
      ) : (
        <>
          <div className="space-y-2">
            {cart.map((it: CartItem) => (
              <div
                key={it.id}
                className="bg-white rounded-2xl border p-3 flex gap-3 items-center"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden">
                  <img
                    src={it.product.image}
                    alt="thumb"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium">
                    {it.product.name} · {it.size}
                  </div>
                  <div className="text-xs text-neutral-500 truncate">
                    {(it.addons ?? []).length
                      ? it.addons.map((a: any) => a.name).join(", ")
                      : "Sem adicionais"}
                  </div>
                  <div className="font-semibold mt-1">
                    {(() => {
                      const factor = { P: 1, M: 1.5, G: 2 } as const;
                      const base = Math.round(
                        it.product.base * factor[it.size]
                      );
                      const addonsTotal = (it.addons ?? []).reduce(
                        (s: number, a: any) => s + a.price,
                        0
                      );
                      return currency(base + addonsTotal);
                    })()}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(it.id, -1)}
                    className="p-2 rounded-xl border hover:bg-neutral-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button
                    onClick={() => changeQty(it.id, 1)}
                    className="p-2 rounded-xl border hover:bg-neutral-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl border p-3 space-y-2">
            <label className="text-sm font-medium">Cupom</label>
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="POPCORN10"
              className="w-full border rounded-xl px-3 py-2"
            />
            <div className="text-xs text-neutral-500">
              Dica: use POPCORN10 para 10% off (mock).
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-3 text-sm">
            <Row label="Subtotal" value={currency(subtotal)} />
            <Row label="Entrega" value={currency(deliveryFee)} />
            {discount > 0 && (
              <Row label="Desconto" value={"- " + currency(discount)} />
            )}
            <div className="h-px bg-neutral-200 my-2" />
            <Row label={<b>Total</b>} value={<b>{currency(total)}</b>} />
          </div>

          <div className="flex gap-2">
            <button onClick={onClear} className="flex-1 py-3 rounded-xl border">
              Limpar
            </button>
            <button
              onClick={onContinue}
              className="flex-1 py-3 rounded-xl bg-emerald-600 text-white shadow"
            >
              Continuar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
