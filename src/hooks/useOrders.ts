import { useEffect, useState } from "react";
import type { Order } from "../types/checkout";
import { getOrders } from "../services/orders";

export function useOrders({ limit, email } : { limit?: number, email?: string } = {}) {
  const [orders, setOrders] = useState<Order[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const orders = await getOrders(limit, email);

        if (!Array.isArray(orders) || orders.length === 0) {
          throw new Error("No hay pedidos disponibles");
        }

        setOrders(orders);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Error al cargar los pedidos"
        );
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

    return { orders, loading, error };
}
