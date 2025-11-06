import { ShoppingBag } from "lucide-react";
import Button from "../Button";

export default function NoItems() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <ShoppingBag
          className="lucide lucide-heart h-24 w-24 mx-auto text-muted-foreground"
          size={48}
        />

        <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
        <p className="text-muted-foreground">
          Agrega productos a tu carrito para comenzar tu compra
        </p>

        <Button to="/products">Explorar Productos</Button>
      </div>
    </main>
  );
}
