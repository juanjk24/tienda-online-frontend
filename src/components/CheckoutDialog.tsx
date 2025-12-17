import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { departamentos, getCiudadesByDepartamento } from "../lib/colombian-data"
import useCartStore, { type CartItem } from "../store/cart"
import { formatPrice } from "../utils/format-price"
import { toast } from "sonner"
import { validateEmail, validateCCNumber, validatePhoneNumber } from "@/utils/validations"
import type { CheckoutFormData } from "../types/checkout"
import { createOrder } from "../services/orders"

const initialFormData: CheckoutFormData = {
  nombres: "",
  apellidos: "",
  email: "",
  cedula: "",
  celular: "",
  departamento: "",
  ciudad: "",
  direccion: "",
  barrio: "",
  metodoPago: ""
}

export function CheckoutDialog({ 
  children, 
  total = 0 
}: { 
  children: React.ReactNode
  total?: number 
}) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData)
  const [loading, setLoading] = useState(false)
  const [ciudades, setCiudades] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const items = useCartStore((state) => state.items);

  // Cargar productos del carrito cuando se abre el dialog
  useEffect(() => {
    if (open) {
      setCartItems(items)
    }
  }, [open])

  const handleInputChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    // Si cambia el departamento, actualizar las ciudades
    if (field === "departamento") {
      const nuevasCiudades = getCiudadesByDepartamento(value)
      setCiudades(nuevasCiudades)
      setFormData(prev => ({
        ...prev,
        ciudad: ""
      }))
    }
  }

  const validateForm = (): boolean => {
    if (cartItems.length === 0) {
      toast.error("No hay productos en el carrito")
      return false
    }

    const requiredFields: (keyof CheckoutFormData)[] = [
      "nombres", "apellidos", "email", "cedula", "celular",
      "departamento", "ciudad", "direccion", "barrio", "metodoPago"
    ]

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        toast.error(`El campo ${field} es obligatorio`)
        return false
      }
    }

    if (!validateEmail(formData.email)) return false
    if (!validateCCNumber(formData.cedula)) return false
    if (!validatePhoneNumber(formData.celular)) return false
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    
    try {
      const productosCompra = cartItems.map(item => ({
        id: item.product.id,
        titulo: item.product.title,
        cantidad: item.quantity,
        precio: item.product.price,
        subtotal: item.product.price * item.quantity
      }))

      const datosCompletos = {
        ...formData,
        productos: productosCompra,
        total,
        fecha: new Date().toISOString(),
        resumen: {
          totalProductos: cartItems.reduce((sum, item) => sum + item.quantity, 0),
          subtotal: total
        }
      }
      
      // enviar la orden al backend
      await createOrder({
        ...datosCompletos,
        estado: "pendiente"
      });

      const totalProductos = cartItems.reduce((sum, item) => sum + item.quantity, 0)
      toast.success(`¡Pedido enviado correctamente! ${totalProductos} productos por ${formatPrice(total)}. Revisa tu email para la confirmación.`)
      setOpen(false)
      setFormData(initialFormData)
      setCiudades([])
      setCartItems([])
      
    } catch (error) {
      console.error("Error al enviar pedido:", error)
      toast.error("Error al enviar el pedido. Inténtalo de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Finalizar Pedido</DialogTitle>
          <DialogDescription>
            Completa la información para procesar tu pedido de {formatPrice(total)}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Información del Cliente
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombres">Nombres *</Label>
                <Input
                  id="nombres"
                  type="text"
                  value={formData.nombres}
                  onChange={(e) => handleInputChange("nombres", e.target.value)}
                  placeholder="Ingresa tus nombres"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="apellidos">Apellidos *</Label>
                <Input
                  id="apellidos"
                  type="text"
                  value={formData.apellidos}
                  onChange={(e) => handleInputChange("apellidos", e.target.value)}
                  placeholder="Ingresa tus apellidos"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cedula">Número de Cédula *</Label>
                <Input
                  id="cedula"
                  type="text"
                  value={formData.cedula}
                  onChange={(e) => handleInputChange("cedula", e.target.value)}
                  placeholder="123456789"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="celular">Número de Celular *</Label>
                <Input
                  id="celular"
                  type="text"
                  value={formData.celular}
                  onChange={(e) => handleInputChange("celular", e.target.value)}
                  placeholder="3001234567"
                  required
                />
              </div>
            </div>
          </div>

          {/* Información de Entrega */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Información de Entrega
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departamento">Departamento *</Label>
                <Select
                  value={formData.departamento}
                  onValueChange={(value) => handleInputChange("departamento", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona departamento" />
                  </SelectTrigger>
                  <SelectContent>
                    {departamentos.map((departamento) => (
                      <SelectItem key={departamento} value={departamento}>
                        {departamento}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ciudad">Ciudad *</Label>
                <Select
                  value={formData.ciudad}
                  onValueChange={(value) => handleInputChange("ciudad", value)}
                  disabled={!formData.departamento}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona ciudad" />
                  </SelectTrigger>
                  <SelectContent>
                    {ciudades.map((ciudad) => (
                      <SelectItem key={ciudad} value={ciudad}>
                        {ciudad}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="direccion">Dirección Completa *</Label>
              <Input
                id="direccion"
                type="text"
                value={formData.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                placeholder="Calle 123 # 45-67, Apto 101"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="barrio">Barrio o Punto de Referencia *</Label>
              <Input
                id="barrio"
                type="text"
                value={formData.barrio}
                onChange={(e) => handleInputChange("barrio", e.target.value)}
                placeholder="Nombre del barrio o punto de referencia"
                required
              />
            </div>
          </div>

          {/* Método de Pago */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Método de Pago
            </h3>
            
            <RadioGroup
              value={formData.metodoPago}
              onValueChange={(value) => handleInputChange("metodoPago", value)}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="contraentrega" id="contraentrega" />
                <Label htmlFor="contraentrega" className="flex-1 cursor-pointer">
                  <div className="font-medium">Pago Contraentrega</div>
                  <div className="text-sm text-gray-500">
                    Paga cuando recibas tu pedido en efectivo
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="tarjeta" id="tarjeta" />
                <Label htmlFor="tarjeta" className="flex-1 cursor-pointer">
                  <div className="font-medium">Pago con Tarjeta</div>
                  <div className="text-sm text-gray-500">
                    Débito o crédito (se procesará después de confirmar)
                  </div>
                </Label>
              </div>
              
              <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value="nequi" id="nequi" />
                <Label htmlFor="nequi" className="flex-1 cursor-pointer">
                  <div className="font-medium">Transferencia Nequi</div>
                  <div className="text-sm text-gray-500">
                    Te enviaremos los datos para la transferencia
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Productos del Pedido */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Productos del Pedido
            </h3>
            
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.product.title}</h4>
                    <p className="text-xs text-gray-500">{item.product.category}</p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold">
                      {item.quantity} x {formatPrice(item.product.price)}
                    </p>
                    <p className="text-xs text-gray-600">
                      = {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center text-sm text-gray-600 mb-1">
                <span>Total productos: {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                {/* <span>Envío: Gratis</span> */}
              </div>
            </div>
          </div>

          {/* Resumen del Pedido */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total a pagar:</span>
              <span className="text-green-600">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Procesando..." : "Confirmar Pedido"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}