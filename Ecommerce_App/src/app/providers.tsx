"use client";

import { PropsWithChildren } from "react";
import { CartProvider } from "../context/cart-context";
import { AuthProvider } from "../context/auth-context";

const Providers: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
};

export default Providers;
