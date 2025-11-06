import { Minus, Plus } from 'lucide-react'
import Button from "../Button";
import useCartStore from '../../store/cart';

interface ProductQuantityProps {
    productId: string;
}

export default function ProductQuantity({ productId }: ProductQuantityProps) {
    const getItemQuantity = useCartStore((state) => state.getItemQuantity)
    const increaseQuantity = useCartStore((state) => state.increaseQuantity)
    const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

    return (
        <div className="flex items-center border border-border rounded-md">
            <Button size='sm' className='py-2 ml-1 border-none' outline onClick={() => {decreaseQuantity(productId)}}>
                <Minus className='size-3' />
            </Button>
            <span className='px-4 py-2 min-w-12 text-center'>{getItemQuantity(productId)}</span>
            <Button size='sm' className='py-2 mr-1 border-none' outline onClick={() => {increaseQuantity(productId)}}>
                <Plus className='size-3' />
            </Button>
        </div>
    )
}