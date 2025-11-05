import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/product";
import { formatPrice } from "../utils/format-price";
import Button from "./Button";
import { toast } from "sonner";
import useCartStore from "../store/cart";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product)
    toast.success(`${product.title} agregado al carrito!`)
  };
  return (
    <Link to={`/products/${product.id}`}>
      <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border border-border py-6 shadow-sm group overflow-hidden transition-all hover:shadow-lg cursor-pointer h-full">
        <div className="p-0">
          <div className="flex relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="[.border-t]:pt-6 flex flex-col items-start gap-3 p-4">
          <div className="w-full space-y-1">
            <span className="text-xs text-muted-foreground">
              {product.category}
            </span>
            <h3 className="font-semibold leading-tight text-balance mt-2">
              {product.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>

          <div className="flex flex-col w-full gap-4 mt-2">
            <span className="text-xl font-bold">{formatPrice(product.price)}</span>
            <Button onClick={handleAddToCart} size="sm" className="py-1.5 px-3">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Agregar
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
