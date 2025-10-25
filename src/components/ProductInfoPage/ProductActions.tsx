import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import Button from "../Button";
import ProductQuantity from "../ProductQuantity";

export default function ProductActions () {
    const addToCart = () => {
        toast.success("Producto agregado al carrito");
    };

    const addToFavorites = () => {
        toast.success("Producto agregado a favoritos");
    };

    return (
        <div className="flex gap-3">
            <ProductQuantity />

            <Button className="px-4 sm:px-8 md:px-12 lg:px-16" onClick={addToCart}>
                <ShoppingCart className="mr-2 size-4" />
                Agregar al Carrito
            </Button>

            <Button outline onClick={addToFavorites}>
                <Heart className="size-4" />
            </Button>
        </div>
    )
}