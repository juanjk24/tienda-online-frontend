import { useEffect, useState } from "react";
import { getProducts } from "../services/products";
import type { Product } from "../types/product";

interface UseProductsOptions {
  category?: string;
  limitCount?: number;
}

export function useProducts({ category, limitCount }: UseProductsOptions) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getProducts(limitCount, category)
      .then((data) => {
        setProducts(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message || "Error al cargar productos");
      })
      .finally(() => setLoading(false));
  }, [category, limitCount]);

  return { products, loading, error };
}