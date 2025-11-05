export default function CategoryItemSkeleton({ items = 4 }: { items?: number; }) {
    return (
        <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: items }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full"
                    >
                        <div className="p-6 text-center space-y-2 animate-pulse">
                            {/* Icono skeleton */}
                            <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-4"></div>

                            {/* Título skeleton */}
                            <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
