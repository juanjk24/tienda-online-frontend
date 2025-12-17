import { toast } from "sonner"

export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
    toast.error("Por favor ingresa un correo electrónico válido")
      return false
    }
    return true
}

export function validateCCNumber(ccNumber: string): boolean {
    if (!/^\d+$/.test(ccNumber)) {
      toast.error("La cédula debe contener solo números")
      return false
    }
    return true
}

export function validatePhoneNumber(phoneNumber: string): boolean {
    if (!/^\d+$/.test(phoneNumber)) {
      toast.error("El celular debe contener solo números")
      return false
    }
    return true
}