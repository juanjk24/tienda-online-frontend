import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductCardSkeleton from "../components/Skeletons/ProductCardSkeleton";
import AddProductDialog from "../components/AddProductDialog";
import { useProducts } from "../hooks/useProducts";
import useAuthStore from "../store/auth";
import Button from "../components/Button";

export default function Products() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { isAdmin } = useAuthStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { products, loading, error, refetch } = useProducts({ category: category ?? undefined });

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Todos los productos</h1>
              <p className="text-muted-foreground">Descubre nuestra colección completa de {products?.length} productos</p>
            </div>
            
            {isAdmin && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar Producto
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Diálogo para agregar producto */}
      <AddProductDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onProductAdded={() => {
          refetch();
        }}
      />
    </main>
  );
}