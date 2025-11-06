import useAuthStore  from "../store/auth";
import Unauthenticated from "../components/ShoppingCartPage/Unauthenticated";
import NoItems from "../components/ShoppingCartPage/NoItems";
import useCartStore from "../store/cart";
import ItemCard from "../components/ShoppingCartPage/ItemCard";
import OrderSummary from "../components/ShoppingCartPage/OrderSummary";

export default function ShoppingCart() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Unauthenticated />;
  }

  const items = useCartStore((state) => state.items);

  if (!items || items.length === 0) {
    return <NoItems />;
  }

  return (
    <div className="min-h-screen flex flex-col max-w-full overflow-x-hidden">
      <main className="flex-1 w-full max-w-full px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto w-full space-y-6 sm:space-y-8">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">Carrito de compras</h1>
            <p className="text-sm sm:text-base text-muted-foreground">{items.length} productos en tu carrito</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 w-full max-w-full">
              {
                items.map((item) => <ItemCard key={item.product.id} item={item} />)
              }
            </div>

            <div className="lg:col-span-1 w-full">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
