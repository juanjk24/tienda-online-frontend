import { useState } from "react";
import CategoryItem from "../components/CategoryItems";
import CategoryItemSkeleton from "../components/Skeletons/CategoryItemSkeleton";
import { useCategories } from "../hooks/useCategories";
import useAuthStore from "../store/auth";
import Button from "../components/Button";
import { Plus } from "lucide-react";
import AddCategoryDialog from "@/components/AddCategoryDialog";

export default function Categories() {
  const { categories, loading, error, refetch } = useCategories();
  const { isAdmin } = useAuthStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  if (loading) {
    return <CategoryItemSkeleton items={8} />;
  }

  if (error) {
    return (
      <div className="text-destructive text-center min-h-screen mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="space-y-8">
          <div className="space-y-2 justify-between flex items-center">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Categorías</h1>
              <p className="text-muted-foreground">
                Explora productos por categoría
              </p>
            </div>

            {isAdmin && (
              <Button 
                onClick={() => setIsAddDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar Categoría
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories &&
              categories.map((category) => (
                <CategoryItem
                  key={category.id}
                  category={category.name}
                  icon={category.icon}
                />
              ))}
          </div>
        </div>
      </main>
       <AddCategoryDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onCategoryAdded={() => {
            refetch();
        }}
        />
    </div>
  );
}
