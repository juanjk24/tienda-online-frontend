interface CheckoutFormData {
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
