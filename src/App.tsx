import { useMemo, useState } from "react";
import { AppHeader } from "./components/Header";
import { TabBar } from "./components/TabBar";
import { AddressScreen } from "./screens/AddressScreen";
import { CartScreen } from "./screens/CartScreen";
import { HomeScreen } from "./screens/HomeScreen";
import { PaymentScreen } from "./screens/PaymentScreen";
import { ProductDetail } from "./screens/ProductDetail";
import { ProfileScreen } from "./screens/ProfileScreen";
import { TrackingScreen } from "./screens/TrackingScreen";

import { catalog as baseCatalog } from "./data/catalog";
import { SignIn } from "./screens/SignIn";
import { SignUp } from "./screens/SignUp";
import { useAuth } from "./state/useAuth";
import type { Addon, CartItem, Product, Size } from "./types";

export default function App() {
  type Screen =
    | { key: "home" }
    | { key: "detail"; product: Product }
    | { key: "cart" }
    | { key: "address" }
    | { key: "payment" }
    | { key: "tracking"; orderId: string }
    | { key: "profile" }
    | { key: "signin" }
    | { key: "signup" };

  const [screen, setScreen] = useState<Screen>({ key: "home" });
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState({
    cep: "",
    street: "",
    number: "",
    district: "",
    city: "",
    note: "",
  });
  const [pay, setPay] = useState<"pix" | "card" | "cash">("pix");
  const [coupon, setCoupon] = useState("");
  const [pixGenerated, setPixGenerated] = useState(false);

  const { user } = useAuth();

  const sizeFactor = { P: 1, M: 1.5, G: 2 } as const;
  const subtotal = cart.reduce((acc: number, it: CartItem) => {
    const base = Math.round(it.product.base * sizeFactor[it.size]);
    const addonsTotal = (it.addons ?? []).reduce(
      (s: number, a: any) => s + a.price,
      0
    );
    const unit = base + addonsTotal;
    return acc + unit * it.qty;
  }, 0);
  const catalog = useMemo(() => baseCatalog, []);
  const filtered = catalog.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const deliveryFee = method === "delivery" ? 700 : 0;
  const discount =
    coupon.trim().toUpperCase() === "POPCORN10"
      ? Math.floor(subtotal * 0.1)
      : 0;
  const total = Math.max(subtotal + deliveryFee - discount, 0);

  const cartCount = cart.reduce((acc: number, it: any) => acc + it.qty, 0);

  const addToCart = (
    product: Product,
    size: Size,
    addons: Addon[] = [],
    qty = 1
  ) => {
    const addonKey = addons
      .map((a) => a.id)
      .sort()
      .join("_");
    const id = `${product.id}-${size}-${addonKey}`;
    setCart((old: any[]) => {
      const found = old.find((c) => c.id === id);
      if (found)
        return old.map((c) => (c.id === id ? { ...c, qty: c.qty + qty } : c));
      return [...old, { id, product, size, qty, addons }];
    });
  };

  const changeQty = (id: string, delta: number) => {
    setCart((old: any[]) =>
      old
        .map((c) =>
          c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const placeOrder = () => {
    if (method === "delivery" && (!address.cep || !address.street)) {
      alert("Preencha o endereço (CEP e Rua).");
      return;
    }
    if (cart.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }
    const oid = `#${Math.floor(Math.random() * 9999)
      .toString()
      .padStart(4, "0")}`;
    setScreen({ key: "tracking", orderId: oid });
  };

  return (
    <div className="w-full h-full min-h-screen bg-neutral-50 text-neutral-900">
      <AppHeader screen={screen} onBack={() => setScreen({ key: "home" })} />
      {!user && screen.key === "home" && (
        <div className="max-w-md mx-auto px-4 mt-3">
          <button
            onClick={() => setScreen({ key: "signin" })}
            className="w-full py-2 rounded-xl border"
          >
            Entrar / Criar conta
          </button>
        </div>
      )}

      <div className="max-w-md mx-auto pb-24">
        {screen.key === "signin" && (
          <SignIn
            onSuccess={() => setScreen({ key: "home" })} // ou voltar para a tela anterior
            goSignUp={() => setScreen({ key: "signup" })}
          />
        )}

        {screen.key === "signup" && (
          <SignUp onSuccess={() => setScreen({ key: "home" })} />
        )}
        {screen.key === "home" && (
          <HomeScreen
            products={filtered}
            cartCount={cartCount}
            query={query}
            setQuery={setQuery}
            onOpenProduct={(p) => setScreen({ key: "detail", product: p })}
            onGoCart={() => setScreen({ key: "cart" })}
          />
        )}

        {screen.key === "detail" && (
          <ProductDetail
            product={screen.product}
            onAdd={(size, addons, qty) =>
              addToCart(screen.product, size, addons, qty)
            }
            onGoCart={() => setScreen({ key: "cart" })}
          />
        )}

        {screen.key === "cart" && (
          <CartScreen
            cart={cart}
            changeQty={changeQty}
            subtotal={subtotal}
            deliveryFee={deliveryFee}
            discount={discount}
            total={total}
            coupon={coupon}
            setCoupon={setCoupon}
            method={method}
            setMethod={setMethod}
            address={address}
            setAddress={setAddress}
            onContinue={() => {
              // validação mínima: se for entrega e faltou CEP/Rua, permanece no carrinho
              if (method === "delivery" && (!address.cep || !address.street)) {
                alert("Preencha CEP e Rua para entrega.");
                return;
              }
              setScreen({ key: "payment" });
            }}
            onClear={clearCart}
          />
        )}

        {screen.key === "address" && (
          <AddressScreen
            method={method}
            setMethod={setMethod}
            address={address}
            setAddress={setAddress}
            onContinue={() => setScreen({ key: "payment" })}
          />
        )}

        {screen.key === "payment" && (
          <PaymentScreen
            pay={pay}
            setPay={setPay}
            total={total}
            onGeneratePix={() => setPixGenerated(true)}
            pixGenerated={pixGenerated}
            onConfirm={placeOrder}
          />
        )}

        {screen.key === "tracking" && (
          <TrackingScreen
            orderId={screen.orderId}
            onGoHome={() => setScreen({ key: "home" })}
          />
        )}
        {screen.key === "profile" && <ProfileScreen />}
      </div>

      <TabBar
        active={screen.key}
        cartCount={cartCount}
        onHome={() => setScreen({ key: "home" })}
        onCart={() => setScreen({ key: "cart" })}
        onProfile={() =>
          setScreen(user ? { key: "profile" } : { key: "signin" })
        }
      />
    </div>
  );
}
