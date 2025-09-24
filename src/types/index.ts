export type Size = "P" | "M" | "G";
export type Method = "delivery" | "pickup";
export type Pay = "pix" | "card" | "cash";

export interface Product {
  id: string;
  name: string;
  desc: string;
  base: number;
  image: string;
  tags?: string[];
  rating?: number;
}

export interface Addon {
  id: string
  name: string
  price: number // cents
}

export interface CartItem {
  id: string;
  product: Product;
  size: Size;
  qty: number;
  addons: Addon[]
  note?: string;
}
