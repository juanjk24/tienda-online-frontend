from pydantic import BaseModel
from typing import Optional

# Esquema base con atributos comunes
class ProductBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    stock: int = 0

# Esquema para crear un producto (lo que recibimos del cliente)
class ProductCreate(ProductBase):
    pass

# Esquema para leer un producto (lo que devolvemos, incluye el ID)
class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True