import { ShoppingBag } from "lucide-react";
import Button from "../Button";

export default function Unauthenticated() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <ShoppingBag
          className="lucide lucide-heart h-24 w-24 mx-auto text-muted-foreground"
          size={48}
        />

        <p className="text-muted-foreground">
          Por favor, inicia sesión para ver tus pedidos.
        </p>

        <Button to="/login?redirect=/orders">Ir al inicio de sesión</Button>
      </div>
    </main>
  );
}
