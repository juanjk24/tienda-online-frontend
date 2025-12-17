import { useEffect, useState, useCallback } from "react";
import { getCategories } from "../services/categories";
import type { Category } from "../types/category";

export function useCategories() {
  const [categories, setCategories] = useState<Category[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const categories = await getCategories();

      if (!Array.isArray(categories) || categories.length === 0) {
        throw new Error("No hay categorías disponibles");
      }

      setCategories(categories);
      setError(null);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Error al cargar las categorías"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const refetch = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, loading, error, refetch };
}
