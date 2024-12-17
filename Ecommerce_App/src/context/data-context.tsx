import { OrderEntity, ProductEntity, UserEntity } from "@/@types/entity";
import { orderService, productService, userService } from "@/api/services";
import { createContext, useCallback, useContext, useState } from "react";

interface DataContextType {
  products: ProductEntity[];
  users: UserEntity[];
  orders: OrderEntity[];
  fetchProducts: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchOrders: () => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  createUser: (payload: any) => Promise<void>;
  updateUser: (id: string, payload: any) => Promise<void>;
  getProductDetails: (id: string) => any;
  updateProduct: (
    id: string,
    data: Partial<ProductEntity>
  ) => Promise<ProductEntity>;
  createProduct: (data: any) => Promise<ProductEntity>;
  deleteProduct: (id: string) => Promise<void>;
  createOrder: (
    data: Omit<OrderEntity, "id" | "createdAt">
  ) => Promise<OrderEntity>;
  updateOrder: (id: string, data: Partial<OrderEntity>) => Promise<OrderEntity>;
  deleteOrder: (id: string) => Promise<void>;
  getOrderDetails: (id: string) => Promise<OrderEntity>;
  // Add other methods as needed
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

export const DataProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductEntity[]>([]);
  const [users, setUsers] = useState<UserEntity[]>([]);
  const [orders, setOrders] = useState<OrderEntity[]>([]);

  const fetchProducts = useCallback(async () => {
    const data = await productService.getAll();
    console.log("data", data);

    setProducts(data.data);
  }, []);

  const fetchUsers = useCallback(async () => {
    const data = await userService.getAll();
    setUsers(data.data);
  }, []);

  const fetchOrders = useCallback(async () => {
    const data = await orderService.getAll();

    setOrders(data.data);
  }, []);

  const deleteUser = useCallback(async (id: string) => {
    await userService.delete(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }, []);

  const createUser = useCallback(async (payload: any) => {
    await userService.create(payload);
    await fetchUsers();
  }, []);

  const updateUser = useCallback(async (id: string, payload: any) => {
    await userService.update(id, payload);
    await fetchUsers();
  }, []);

  const getProductDetails = useCallback(async (id: string) => {
    return await productService.getById(id);
    // setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }, []);

  const updateProduct = useCallback(
    async (id: string, data: Partial<ProductEntity>) => {
      const updatedProduct = await productService.update(id, data);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? updatedProduct : product
        )
      );
      return updatedProduct;
    },
    []
  );

  const createProduct = useCallback(async (data: Omit<ProductEntity, "id">) => {
    const newProduct = await productService.create(data);
    console.log("newP", newProduct);

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    return newProduct;
  }, []);

  const deleteProduct = useCallback(async (id: string) => {
    await productService.delete(id);
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  }, []);

  const createOrder = useCallback(async (data: Omit<OrderEntity, "id">) => {
    const newOrder = await orderService.create(data);
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    return newOrder;
  }, []);

  const updateOrder = useCallback(
    async (id: string, data: Partial<OrderEntity>) => {
      const updatedOrder = await orderService.update(id, data);
      await fetchOrders();
      return updatedOrder;
    },
    []
  );

  const deleteOrder = useCallback(async (id: string) => {
    await orderService.delete(id);
    setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
  }, []);

  const getOrderDetails = useCallback(async (id: string) => {
    return await orderService.getById(id);
  }, []);

  const value = {
    products,
    users,
    orders,
    fetchProducts,
    fetchUsers,
    fetchOrders,
    deleteUser,
    createUser,
    updateUser,
    getProductDetails,
    deleteProduct,
    updateProduct,
    createProduct,
    createOrder,
    updateOrder,
    deleteOrder,
    getOrderDetails,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
