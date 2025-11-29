from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.order import Order, OrderCreate
# Importamos la "base de datos" de productos para consultar precios
from app.api.endpoints.products import fake_products_db 
# Importamos la "base de datos" de usuarios para validar que exista
from app.api.endpoints.users import fake_users_db

router = APIRouter()

fake_orders_db = []

@router.post("/", response_model=Order)
def create_order(order: OrderCreate):
    """
    Crear un pedido.
    Lógica de negocio:
    1. Valida que el usuario exista.
    2. Valida que los productos existan.
    3. Calcula el precio total automáticamente.
    """
    
    # 1. Validar Usuario
    user = next((u for u in fake_users_db if u["id"] == order.user_id), None)
    if not user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    total_price = 0.0
    
    # 2. Recorrer items para calcular total y validar productos
    for item in order.items:
        product = next((p for p in fake_products_db if p["id"] == item.product_id), None)
        
        if not product:
            raise HTTPException(status_code=404, detail=f"Producto con ID {item.product_id} no encontrado")
        
        # Lógica simple de stock (opcional)
        if product["stock"] < item.quantity:
             raise HTTPException(status_code=400, detail=f"Stock insuficiente para el producto {product['name']}")

        # Sumar al total
        total_price += product["price"] * item.quantity

    # 3. Crear el objeto pedido
    new_id = len(fake_orders_db) + 1
    new_order = {
        "id": new_id,
        "user_id": order.user_id,
        "items": [item.dict() for item in order.items],
        "total_price": total_price,
        "status": "completed"
    }
    
    fake_orders_db.append(new_order)
    return new_order

@router.get("/", response_model=List[Order])
def read_orders():
    return fake_orders_db