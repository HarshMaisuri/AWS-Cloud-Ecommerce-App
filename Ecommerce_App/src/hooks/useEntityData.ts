import { useEffect } from "react";
import { useData } from "@/context/data-context";

export function useEntityData(entityType: "products" | "users" | "orders") {
  const { products, users, orders, fetchProducts, fetchUsers, fetchOrders } =
    useData();

  useEffect(() => {
    const fetchData = async () => {
      switch (entityType) {
        case "products":
          await fetchProducts();
          break;
        case "users":
          await fetchUsers();
          break;
        case "orders":
          await fetchOrders();
          break;
      }
    };

    fetchData();
  }, [entityType, fetchProducts, fetchUsers, fetchOrders]);

  switch (entityType) {
    case "products":
      return products;
    case "users":
      return users;
    case "orders":
      return orders;
    default:
      return [];
  }
}
