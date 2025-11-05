export default function ProductInfoSkeleton() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Imagen skeleton */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted animate-pulse">
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            </div>
          </div>

          {/* Información del producto skeleton */}
          <div className="space-y-6">
            {/* Categoría, título y precio */}
            <div className="space-y-2">
              {/* Categoría */}
              <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              
              {/* Título */}
              <div className="space-y-2">
                <div className="h-8 md:h-10 w-5/6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-8 md:h-10 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              </div>
              
              {/* Precio */}
              <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* ProductActions skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {/* Quantity selector skeleton */}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-12 h-8 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-8 h-8 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
              
              {/* Botones skeleton */}
              <div className="space-y-3">
                <div className="h-12 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-10 w-full bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Descripción skeleton */}
            <div className="space-y-4 pt-6 border-t border-border">
              {/* Título de descripción */}
              <div className="h-6 w-48 bg-gray-300 rounded animate-pulse"></div>
              
              {/* Párrafos de descripción */}
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-11/12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-10/12 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-4 w-4/5 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
