from pydantic import BaseModel
from typing import Optional

# Esquema base con atributos comunes
class ProductBase(BaseModel):
    title: str
    description: Optional[str] = None
    price: float
    category: Optional[str] = None
    image: Optional[str] = None

# Esquema para crear un producto (lo que recibimos del cliente)
class ProductCreate(ProductBase):
    pass

# Esquema para actualizar un producto (campos opcionales)
class ProductUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    image: Optional[str] = None

# Esquema para leer un producto (lo que devolvemos, incluye el ID)
class Product(ProductBase):
    id: str

    class Config:
        from_attributes = True