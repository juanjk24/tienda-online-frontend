import axios from "axios";
import type { Order } from "../types/checkout";

const API_URL = "http://127.0.0.1:8000/orders";

const apiClient = axios.create({
  baseURL: API_URL,
});

export async function getOrders(limitCount?: number, email?: string): Promise<Order[]> {
  try {
    const params: Record<string, string | number> = {};

    if (email) {
      params.email = email;
    }

    if (typeof limitCount === "number" && limitCount > 0) {
      params.limit = limitCount;
    }

    const response = await apiClient.get<Order[]>("/", { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    throw new Error("No se pudieron cargar los pedidos.");
  }
}

export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const response = await apiClient.get<Order>(`/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error(`Error al obtener el pedido con ID ${id}:`, error);
    throw new Error("Error al obtener el pedido.");
  }
}

export async function createOrder(orderData: Omit<Order, "id">): Promise<Order> {
    try {
        const response = await apiClient.post<Order>("/", orderData);
        return response.data;
    } catch (error) {
        console.error("Error al crear el pedido:", error);
        throw new Error("No se pudo crear el pedido.");
    }
}