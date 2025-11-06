import useCartStore from "../../store/cart";
import { formatPrice } from "../../utils/format-price";
import Button from "../Button";
import Card from "../Card";

export default function OrderSummary () {
    const getTotalPrice = useCartStore  ((state) => state.getTotalPrice);


    return (
        <Card className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm lg:sticky lg:top-20 w-full">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                <h2 className="text-lg sm:text-xl font-bold">Resumen del pedido</h2>

                <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="font-medium">{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Envio</span>
                        <span className="font-medium">Gratis</span>
                    </div>
                    <div className="flex justify-between text-sm"></div>
                    <div className="border-t border-border pt-3">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Total</span>
                            <span className="text-xl sm:text-2xl font-bold">{formatPrice(getTotalPrice())}</span>
                        </div>
                    </div>
                </div>

                <Button className="w-full">Proceder al Pago</Button>
                <Button to="/products" className="w-full" outline>Continuar Comprando</Button>
            </div>
        </Card>
    )
}