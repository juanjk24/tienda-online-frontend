import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

export default function Products() {
  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Todos los productos</h1>
          <p className="text-muted-foreground">Descubre nuestra colección completa de {products.length} productos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}