import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { formatPrice } from "../utils/format-price";
import NotFoundProduct from "../components/ProductInfoPage/NotFoundProduct";
import ProductActions from "../components/ProductInfoPage/ProductActions";

export default function ProductInfo() {
  const { id } = useParams();

  if (!id) {
    return <NotFoundProduct />;
  }

  const product = products.find((p) => p.id === +id);

  if (!product) {
    return <NotFoundProduct />;
  }

  return (
    <div className="min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                        <img src={product?.image} className="w-full h-full object-cover" alt={product?.title} />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-sm text-muted-foreground">{product?.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{product?.title}</h1>
                        <span className="text-3xl font-bold text-primary">{formatPrice(product?.price)}</span>
                    </div>

                    <div className="space-y-4">
                        <ProductActions />
                    </div>

                    <div className="space-y-4 pt-6 border-t border-border">
                        <h2 className="text-xl font-semibold">Descripción del producto</h2>

                        <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line leading-relaxed">{product?.description}</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
}
