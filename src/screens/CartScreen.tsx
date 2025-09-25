import {
  Loader2,
  MapPin,
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useState } from "react";
import { EmptyState } from "../components/EmptyState";
import { Row } from "../components/Row";
import type { CartItem } from "../types";
import { fetchAddressByCep } from "../utils/cep";
import { currency } from "../utils/currency";

export function CartScreen(props: any) {
  const {
    cart,
    changeQty,
    subtotal,
    deliveryFee,
    discount,
    total,
    coupon,
    setCoupon,
    method,
    setMethod,
    address,
    setAddress,
    onContinue,
    onClear,
  } = props;

  const factor = { P: 1, M: 1.5, G: 2 } as const;
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);
  const [cepTimer, setCepTimer] = useState<any>(null);

  const handleCepChange = (value: string) => {
    const onlyDigits = value.replace(/\D/g, "");
    setAddress({ ...address, cep: value });
    if (cepTimer) clearTimeout(cepTimer);
    setCepError(null);
    if (onlyDigits.length === 8) {
      const t = setTimeout(async () => {
        try {
          setCepLoading(true);
          const data = await fetchAddressByCep(onlyDigits);
          if (!data) setCepError("CEP não encontrado.");
          else
            setAddress({
              ...address,
              cep: value,
              street: data.logradouro || "",
              district: data.bairro || "",
              city: data.localidade || "",
            });
        } catch {
          setCepError("Falha ao consultar CEP.");
        } finally {
          setCepLoading(false);
        }
      }, 350);
      setCepTimer(t);
    }
  };

  console.log(cart)
  console.log(subtotal)

  return (
    <div className="px-4 py-4 mx-auto w-full max-w-[420px]">
      {cart.length === 0 ? (
        <EmptyState
          icon={ShoppingCart}
          title="Seu carrinho está vazio"
          subtitle="Adicione delícias no catálogo."
        />
      ) : (
        <div className="space-y-4">
          {/* Itens */}
          <div className="space-y-3">
            {cart.map((it: CartItem) => {
              const base = Math.round(it.product.base * factor[it.size]);
              const addonsTotal = (it.addons ?? []).reduce(
                (s: number, a: any) => s + a.price,
                0
              );
              const unit = base + addonsTotal;
              return (
                <div
                  key={it.id}
                  className="bg-white rounded-2xl border p-3 overflow-hidden"
                >
                  <div className="flex gap-3 items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <img
                        src={it.product.image}
                        alt="thumb"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">
                        {it.product.name} · {it.size}
                      </div>
                      <div className="text-xs text-neutral-500 break-words">
                        {(it.addons ?? []).length
                          ? it.addons.map((a: any) => a.name).join(", ")
                          : "Sem adicionais"}
                      </div>
                      <div className="font-semibold mt-1">{currency(unit)}</div>
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
                </div>
              );
            })}
          </div>

          {/* Cupom */}
          <div className="bg-white rounded-2xl border p-3 space-y-2 overflow-hidden">
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

          {/* Entrega/Retirada + Endereço */}
          <div className="bg-white rounded-2xl border p-3 space-y-3 overflow-hidden">
            <div className="text-sm font-medium">Como você quer receber?</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMethod("delivery")}
                className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 ${
                  method === "delivery"
                    ? "border-emerald-500 bg-emerald-50"
                    : "hover:bg-neutral-50"
                }`}
              >
                <Truck className="w-4 h-4" /> Entrega
              </button>
              <button
                onClick={() => setMethod("pickup")}
                className={`w-full py-3 rounded-xl border flex items-center justify-center gap-2 ${
                  method === "pickup"
                    ? "border-emerald-500 bg-emerald-50"
                    : "hover:bg-neutral-50"
                }`}
              >
                <Package className="w-4 h-4" /> Retirar
              </button>
            </div>

            {method === "delivery" ? (
              <div className="space-y-2">
                <div className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Endereço de entrega
                </div>

                {/* grid: 1 coluna no mobile; 3 colunas a partir de sm */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {/* CEP (sm: 1 col), Rua (sm: 2 cols) */}
                  <div className="relative sm:col-span-1">
                    <input
                      value={address.cep}
                      onChange={(e) => handleCepChange(e.target.value)}
                      placeholder="CEP"
                      className="w-full border rounded-xl px-3 py-2 pr-9"
                    />
                    {cepLoading && (
                      <Loader2 className="w-4 h-4 animate-spin absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400" />
                    )}
                  </div>
                  <input
                    value={address.street}
                    onChange={(e) =>
                      setAddress({ ...address, street: e.target.value })
                    }
                    placeholder="Rua"
                    className="w-full border rounded-xl px-3 py-2 sm:col-span-2"
                  />
                  {/* Número (sm: 1), Bairro (sm: 1), Cidade (sm: 1) */}
                  <input
                    value={address.number}
                    onChange={(e) =>
                      setAddress({ ...address, number: e.target.value })
                    }
                    placeholder="Número"
                    className="w-full border rounded-xl px-3 py-2 sm:col-span-1"
                  />
                  <input
                    value={address.district}
                    onChange={(e) =>
                      setAddress({ ...address, district: e.target.value })
                    }
                    placeholder="Bairro"
                    className="w-full border rounded-xl px-3 py-2 sm:col-span-1"
                  />
                  <input
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    placeholder="Cidade"
                    className="w-full border rounded-xl px-3 py-2 sm:col-span-1"
                  />
                  {/* Complemento ocupa linha inteira */}
                  <input
                    value={address.note}
                    onChange={(e) =>
                      setAddress({ ...address, note: e.target.value })
                    }
                    placeholder="Complemento (opcional)"
                    className="w-full border rounded-xl px-3 py-2 sm:col-span-3"
                  />
                </div>

                {cepError && <p className="text-xs text-red-600">{cepError}</p>}
              </div>
            ) : (
              <p className="text-sm text-neutral-600">
                Retirada: Av. Gourmet, 123 – Centro. Pronto em ~15min.
              </p>
            )}
          </div>

          {/* Resumo */}
          <div className="bg-white rounded-2xl border p-3 text-sm overflow-hidden">
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
        </div>
      )}
    </div>
  );
}
