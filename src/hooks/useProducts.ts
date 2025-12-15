import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { getProducts } from "../services/products";

export function useProducts({ limit, category } : { limit?: number, category?: string } = {}) {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await getProducts(limit, category);

        if (!Array.isArray(products) || products.length === 0) {
          throw new Error("No hay productos disponibles");
        }

        setProducts(products);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar los productos"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

    return { products, loading, error };
}
