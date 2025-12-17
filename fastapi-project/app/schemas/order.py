from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from enum import Enum

class EstadoOrden(str, Enum):
    """Estados posibles de una orden"""
    PENDIENTE = "pendiente"
    PAGADO = "pagado"
    ENVIADO = "enviado"
    ENTREGADO = "entregado"

class ProductoOrden(BaseModel):
    """Producto dentro de una orden"""
    id: str
    cantidad: int = Field(ge=1)
    precio: float = Field(ge=0)
    subtotal: float = Field(ge=0)
    titulo: str

class ResumenOrden(BaseModel):
    """Resumen de la orden"""
    subtotal: float = Field(ge=0)
    totalProductos: int = Field(ge=0)

class OrderBase(BaseModel):
    """Schema base para órdenes"""
    apellidos: str
    cedula: str
    celular: str
    ciudad: str
    departamento: str
    direccion: str
    email: EmailStr
    estado: EstadoOrden
    fecha: str
    metodoPago: str
    nombres: str
    total: float = Field(ge=0)
    productos: List[ProductoOrden]
    resumen: ResumenOrden

class OrderCreate(OrderBase):
    """Schema para crear una orden"""
    pass

class OrderUpdate(BaseModel):
    """Schema para actualizar una orden (solo el estado)"""
    estado: EstadoOrden

class Order(OrderBase):
    """Schema completo de orden con ID"""
    id: str

    class Config:
        from_attributes = True
