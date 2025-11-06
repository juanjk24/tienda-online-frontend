import { Trash2 } from "lucide-react"
import type { CartItem } from "../../store/cart"
import Button from "../Button"
import Card from "../Card"
import useCartStore from "../../store/cart"
import ProductQuantity from "./ProductQuantity"
import { formatPrice } from "../../utils/format-price"

export default function ItemCard({ item }: { item: CartItem}) {
    const { product } = item
    const removeItem = useCartStore((state) => state.removeItem)
    const getItemPrice = useCartStore((state) => state.getItemPrice)

    const handleDeleteItem = () => {
        removeItem(product.id)
    }

    return (
        <Card>
            <div className="p-3 sm:p-4 md:p-6 overflow-hidden">
                <div className="flex gap-3 sm:gap-4 w-full">
                    <div 
                        className="flex relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-md overflow-hidden bg-muted shrink-0"
                    >
                        <img className="object-cover" src={product.image} alt={product.title} />
                    </div>

                    <div className="flex-1 space-y-2 min-w-0 max-w-full overflow-hidden">
                        <div className="flex justify-between gap-2 items-start">
                            <div className="min-w-0 flex-1 overflow-hidden">
                                <h3 
                                    className="font-semibold text-sm sm:text-base leading-tight wrap-break-words line-clamp-2">{product.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-muted-foreground truncate">{product.category}</p>
                            </div>

                            <Button onClick={handleDeleteItem} outline>
                                <Trash2 className="size-4" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                            <ProductQuantity productId={product.id} />
                            <span className="font-bold text-sm sm:text-base md:text-lg truncate">
                                {formatPrice(getItemPrice(product.id))}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}