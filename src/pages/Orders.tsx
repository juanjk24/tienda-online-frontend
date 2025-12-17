import Unauthenticated from "../components/OrdersPage/Unauthenticated";
import NoItems from "../components/OrdersPage/NoItems";
import OrdersTable from "../components/OrdersPage/OrdersTable";
import useAuthStore  from "../store/auth";
import { useOrders } from "../hooks/useOrders";
import LoadingItems from "@/components/OrdersPage/LoadingItems";

export default function Orders() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const userEmail = useAuthStore((state) => state.user?.email || "");

    if (!isAuthenticated || !userEmail) return <Unauthenticated />;
    
    const { orders, loading, error } = useOrders({ email: userEmail });
    
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Tus pedidos</h1>
          <p className="text-muted-foreground">
            Aquí puedes ver el estado de todos tus pedidos.
          </p>
        </div>

        {
            (loading) ? <LoadingItems /> :
            (!orders || orders?.length === 0) ? <NoItems /> :
            error ? <p className="text-red-500">Error: {error}</p> :
            (
                <OrdersTable orders={orders} />
            )
        }

      </div>
    </main>
  );
}
