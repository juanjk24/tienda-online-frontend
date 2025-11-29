from pydantic import BaseModel
from typing import List

# Esquema para un item dentro del pedido
class OrderItem(BaseModel):
    product_id: int
    quantity: int

# Lo que recibimos para crear un pedido
class OrderCreate(BaseModel):
    user_id: int
    items: List[OrderItem]

# Lo que devolvemos (incluye ID, total y estado)
class Order(OrderCreate):
    id: int
    total_price: float
    status: str = "pending"

    class Config:
        from_attributes = True