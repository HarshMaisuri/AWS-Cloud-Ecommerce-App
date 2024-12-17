import { CartItem } from "./cart";

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: "pending" | "completed" | "cancelled";
  transactionId: string;
};
