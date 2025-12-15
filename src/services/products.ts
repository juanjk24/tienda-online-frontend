import api from "./api";
import type { Product } from "../types/product";

// Obtener lista de productos
export async function getProducts(limitCount?: number, category?: string): Promise<Product[]> {
  try {
    const params: Record<string, any> = {};
    if (limitCount) params.limit = limitCount;
    if (category) params.category = category;

    const response = await api.get("/products", { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw new Error("No se pudieron cargar los productos.");
  }
}

// Obtener producto por ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    throw new Error("Error al obtener el producto.");
  }
}