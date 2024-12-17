import { Entity } from "@/@types/entity";
import { api } from "./api";
import { OrderEntity, ProductEntity, UserEntity } from "@/@types/entity";

export class ApiService<T extends Entity> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(): Promise<T[] | any> {
    const response = await api.get<T[] | any>(this.endpoint);
    return response.data;
  }

  async getById(id: string): Promise<T> {
    const response = await api.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }

  async create(data: Omit<T, "id" | "role" | "status">): Promise<T> {
    const response = await api.post<T>(this.endpoint, data);
    return response.data;
  }

  async update(id: string, data: Partial<T>): Promise<T> {
    const response = await api.patch<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    await api.delete(`${this.endpoint}/${id}`);
  }
}

export const productService = new ApiService<ProductEntity>("/products");
export const orderService = new ApiService<OrderEntity>("/orders");
export const userService = new ApiService<UserEntity>("/users");
