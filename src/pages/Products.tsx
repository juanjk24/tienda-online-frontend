import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import { useProducts } from "../hooks/useProducts";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { products, loading, error } = useProducts({ category: category ?? undefined });

  if (loading) {
    return <ProductCardSkeleton items={8} />;
  }

   if (error) {
    return <section className="container mx-auto px-4 py-16">
      <div className="space-y-8 text-center text-destructive">
        {error}
      </div>
    </section>;
  }

  return (
    <main className="flex-1 container mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Todos los productos</h1>
          <p className="text-muted-foreground">Descubre nuestra colección completa de {products?.length} productos</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}