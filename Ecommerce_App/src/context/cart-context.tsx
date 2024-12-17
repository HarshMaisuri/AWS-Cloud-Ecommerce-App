import { CartContextType, CartItem } from "@/@types/entity";

import { createContext, PropsWithChildren, useContext, useState } from "react";

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQty = (id: string | number, qty: number) => {
    let item = cart.find((item) => item.product.id == id);

    item.quantity = qty;

    let filteredCart = cart.filter((cartItem) => cartItem.product.id != id);

    setCart([...filteredCart, item]);
  };

  return (
    <CartContext.Provider
      value={{ items: cart, addToCart, removeFromCart, clearCart, updateQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};
