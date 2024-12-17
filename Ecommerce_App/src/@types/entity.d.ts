export interface Entity {
  id: string;
  name: string;
  createdAt: string;
}

export interface ProductBase extends Entity {
  price: number;
  category: string;
  image: string;
  images: string[];
  description: string;
  shortDescription: string;
}

export interface ProductEntity extends ProductBase {
  stock: Stock[];
  status: "draft" | "active" | "archived";
}

export interface Stock {
  quantity: number;
  size: "S" | "M" | "L";
}

export interface UserEntity extends Entity {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contactNumber: string;
  address: string;
  role: "user" | "admin";
  status: "active" | "inactive";
}

export interface OrderEntity extends Entity {
  type: "sale" | "refund";
  status: "pending" | "fulfilled" | "declined";
  customerId: string;
  email: string;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  product: ProductBase;
  size: "S" | "M" | "L";
  quantity: number;
}

export type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
};
