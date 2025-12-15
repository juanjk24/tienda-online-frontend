import axios from "axios";
import type { Product } from "../types/product";

const API_URL = "http://127.0.0.1:8000/products";

const apiClient = axios.create({
  baseURL: API_URL,
});

export async function getProducts(limitCount?: number, category?: string): Promise<Product[]> {
  try {
    const params: Record<string, string | number> = {};

    if (category) {
      params.category = category;
    }

    if (typeof limitCount === "number" && limitCount > 0) {
      params.limit = limitCount;
    }

    const response = await apiClient.get<Product[]>("/", { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw new Error("No se pudieron cargar los productos.");
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await apiClient.get<Product>(`/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw new Error("Error al obtener el producto.");
  }
}