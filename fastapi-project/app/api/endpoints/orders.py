from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.order import Order, OrderCreate
# Importamos el servicio de productos de Firebase
from app.services.product_service import product_service
# Importamos la "base de datos" de usuarios para validar que exista (temporalmente)
from app.api.endpoints.users import fake_users_db

router = APIRouter()

fake_orders_db = []

@router.post("/", response_model=Order)
def create_order(order: OrderCreate):
    """
    Crear un pedido.
    Lógica de negocio:
    1. Valida que el usuario exista.
    2. Valida que los productos existan (desde Firebase).
    3. Calcula el precio total automáticamente.
    """
    
    try:
        # 1. Validar Usuario
        user = next((u for u in fake_users_db if u["id"] == order.user_id), None)
        if not user:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        total_price = 0.0
        
        # 2. Recorrer items para calcular total y validar productos desde Firebase
        for item in order.items:
            # Obtener producto desde Firebase
            product = product_service.get_product_by_id(str(item.product_id))
            
            if not product:
                raise HTTPException(status_code=404, detail=f"Producto con ID {item.product_id} no encontrado")
            
            # Lógica simple de stock (opcional)
            if product.get("stock", 0) < item.quantity:
                raise HTTPException(status_code=400, detail=f"Stock insuficiente para el producto {product.get('name', 'desconocido')}")

            # Sumar al total
            total_price += product.get("price", 0.0) * item.quantity

        # 3. Crear el objeto pedido
        new_id = len(fake_orders_db) + 1
        new_order = {
            "id": new_id,
            "user_id": order.user_id,
            "items": [item.model_dump() for item in order.items],
            "total_price": total_price,
            "status": "completed"
        }
        
        fake_orders_db.append(new_order)
        return new_order
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear pedido: {str(e)}")

@router.get("/", response_model=List[Order])
def read_orders():
    """Obtener todos los pedidos"""
    return fake_orders_db