import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import type { Category } from "../types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getCategories();

        if (!Array.isArray(categories) || categories.length === 0) {
          throw new Error("No hay categorías disponibles");
        }

        setCategories(categories);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar las categorías"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  return { categories, loading, error };
}
