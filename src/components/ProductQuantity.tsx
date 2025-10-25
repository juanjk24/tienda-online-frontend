import { useState } from 'react';
import { Minus, Plus } from 'lucide-react'
import Button from "./Button";

export default function ProductQuantity() {
    const [quantity, setQuantity] = useState(1);

    const increment = () => setQuantity((prev) => prev + 1);
    const decrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

    return (
        <div className="flex items-center border border-border rounded-md">
            <Button size='sm' className='py-2 ml-1 border-none' outline onClick={decrement}>
                <Minus className='size-3' />
            </Button>
            <span className='px-4 py-2 min-w-12 text-center'>{quantity}</span>
            <Button size='sm' className='py-2 mr-1 border-none' outline onClick={increment}>
                <Plus className='size-3' />
            </Button>
        </div>
    )
}