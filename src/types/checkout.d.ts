export interface CheckoutFormData {
  // Información personal
  nombres: string
  apellidos: string
  email: string
  cedula: string
  celular: string
  
  // Información de entrega
  departamento: string
  ciudad: string
  direccion: string
  barrio: string
  
  // Método de pago
  metodoPago: string
}

export interface Order extends CheckoutFormData {
  id: string
  productos: Array<{
    id: string
    titulo: string
    subtotal: number
    cantidad: number
    precio: number
  }>
  resumen: {
    subtotal: number
    totalProductos: number
  }
  fecha: string
  estado: string
  total: number
}
