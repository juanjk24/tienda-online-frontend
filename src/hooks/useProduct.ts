import { useEffect, useState } from "react"
import type { Product } from "../types/product"
import { getProductById } from "../services/products"

export function useProduct(id: string) {
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    async function fetchProduct() {
      try {
        const data = await getProductById(id)

        if (!data) {
          throw new Error("Producto no encontrado")
        }

        setProduct(data)
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar el producto"
        )
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  return { product, loading, error }
}
