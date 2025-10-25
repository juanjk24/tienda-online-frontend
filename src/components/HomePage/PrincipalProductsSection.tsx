import Button from "../Button";
import { products } from "../../data/products";
import ProductCard from "../ProductCard";

const principalProducts = products.slice(0, 4);

export default function PrincipalProductsSection() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Productos destacados
          </h2>
          <p className="text-muted-foreground">
            Los favoritos de nuestros clientes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principalProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center pt-8">
            <Button to="/products" outline>Ver todos los productos</Button>
        </div>
      </div>
    </section>
  );
}
