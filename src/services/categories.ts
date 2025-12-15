import api from "./api";
import type { Category } from "../types/category";

// Obtener lista de categorías
export async function getCategories(limitCount?: number): Promise<Category[]> {
  try {
    const params: Record<string, any> = {};
    if (limitCount) params.limit = limitCount;

    const response = await api.get("/categories", { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw new Error("No se pudieron cargar las categorías.");
  }
}

// Obtener categoría por ID
export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la categoría con ID ${id}:`, error);
    throw new Error("Error al obtener la categoría.");
  }
}