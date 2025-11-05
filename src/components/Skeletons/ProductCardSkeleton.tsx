export default function ProductCardSkeleton({ items = 4 }: { items?: number }) {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm h-full">
            {/* Imagen skeleton */}
            <div className="p-0">
              <div className="flex relative aspect-square overflow-hidden bg-muted">
                <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite]"></div>
              </div>
            </div>

            {/* Contenido skeleton */}
            <div className="[.border-t]:pt-6 flex flex-col items-start gap-3 p-4">
              <div className="w-full space-y-1">
                {/* Categoría skeleton */}
                <div className="h-3 w-16 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>

                {/* Título skeleton */}
                <div className="mt-2 space-y-2">
                  <div className="h-4 w-3/4 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
                  <div className="h-4 w-1/2 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
                </div>

                {/* Descripción skeleton */}
                <div className="space-y-2 mt-2">
                  <div className="h-3 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
                  <div className="h-3 w-4/5 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-4 mt-2">
                {/* Precio skeleton */}
                <div className="h-6 w-20 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>

                {/* Botón skeleton */}
                <div className="h-8 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-[shimmer_2s_ease-in-out_infinite] rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
