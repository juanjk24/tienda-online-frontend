import axios from "axios";
import type { Category } from "../types/category";

const API_URL = "http://127.0.0.1:8000/categories";

const apiClient = axios.create({
  baseURL: API_URL,
});

export async function getCategories(limitCount?: number): Promise<Category[]> {
  try {
    const params: Record<string, number> = {};

    if (typeof limitCount === "number" && limitCount > 0) {
      params.limit = limitCount;
    }

    const response = await apiClient.get<Category[]>("/", { params });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    throw new Error("No se pudieron cargar las categorías.");
  }
}

export async function getCategoryById(id: string): Promise<Category | null> {
  try {
    const response = await apiClient.get<Category>(`/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    console.error(`Error al obtener la categoría con ID ${id}:`, error);
    throw new Error("Error al obtener la categoría.");
  }
}
