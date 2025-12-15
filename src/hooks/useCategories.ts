import { useEffect, useState } from "react";
import { getCategories } from "../services/categories";
import type { Category } from "../types/category";

export function useCategories(limitCount?: number) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getCategories(limitCount)
      .then((data) => {
        setCategories(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar categorías");
      })
      .finally(() => setLoading(false));
  }, [limitCount]);

  return { categories, loading, error };
}