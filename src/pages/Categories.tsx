import CategoryItem from "../components/CategoryItems";
import CategoryItemSkeleton from "../components/Skeletons/CategoryItemSkeleton";
import { useCategories } from "../hooks/useCategories";

export default function Categories() {
    const { categories, loading, error } = useCategories();

    if (loading) {
        return <CategoryItemSkeleton items={8} />;
    }

    if (error) {
        return <div className="text-destructive text-center min-h-screen mt-10">Error: {error}</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tight">Categorías</h1>
                        <p className="text-muted-foreground">
                            Explora productos por categoría
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories && categories.map((category) => (
                            <CategoryItem key={category.id} category={category.name} icon={category.icon} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
