import { ShoppingCart, Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import Button from "../Button";
import { useState } from "react";
import useCartStore from "../../store/cart";
import type { Product } from "../../types/product";

export default function ProductActions ({ product }: { product: Product }) {
    const [quantity, setQuantity] = useState<number>(1);
    const addItem = useCartStore((state) => state.addItem);

    const increment = () => {
        setQuantity((prev) => prev + 1);
    }

    const decrement = () => {
        setQuantity((prev) => (Math.max(prev - 1, 1)));
    }

    const addToCart = () => {
        addItem(product, quantity);
        toast.success("Producto agregado al carrito");
    };

    const addToFavorites = () => {
        toast.success("Producto agregado a favoritos");
    };

    return (
        <div className="flex gap-3">
            <div className="flex items-center border border-border rounded-md">
            <Button size='sm' className='py-2 ml-1 border-none' outline onClick={decrement}>
                <Minus className='size-3' />
            </Button>
            <span className='px-4 py-2 min-w-12 text-center'>{quantity}</span>
            <Button size='sm' className='py-2 mr-1 border-none' outline onClick={increment}>
                <Plus className='size-3' />
            </Button>
        </div>

            <Button className="px-4 sm:px-8 md:px-12 lg:px-16" onClick={addToCart}>
                <ShoppingCart className="mr-2 size-4" />
                Agregar al Carrito
            </Button>

            {/* <Button outline onClick={addToFavorites}>
                <Heart className="size-4" />
            </Button> */}
        </div>
    )
}