import { Product } from "./product";

export interface CartItem {
  product: Product;
  quantity: number;
  size: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
}

export interface Cart {
  items: CartItem[];
}

export type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};
