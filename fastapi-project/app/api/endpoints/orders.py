from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from app.schemas.order import Order, OrderCreate, OrderUpdate
from app.services.order_service import order_service

router = APIRouter()

@router.get("/", response_model=List[dict])
def read_orders(
    email: Optional[str] = Query(None, description="Filtrar por email"),
    limit: Optional[int] = Query(None, description="Limitar número de órdenes", ge=1)
):
    """
    Obtener todas las órdenes desde Firebase Firestore.
    Opcionalmente filtrar por email y limitar resultados.
    """
    try:
        if email:
            orders = order_service.get_orders_by_email(email=email)
        else:
            orders = order_service.get_all_orders(limit=limit)
        return orders
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener órdenes: {str(e)}")

@router.get("/{order_id}", response_model=dict)
def read_order(order_id: str):
    """
    Obtener una orden por su ID desde Firebase Firestore
    """
    try:
        order = order_service.get_order_by_id(order_id)
        if order is None:
            raise HTTPException(status_code=404, detail="Orden no encontrada")
        return order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener orden: {str(e)}")

@router.post("/", response_model=dict, status_code=201)
def create_order(order: OrderCreate):
    """
    Crear una nueva orden en Firebase Firestore
    """
    try:
        new_order = order_service.create_order(order)
        return new_order
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear orden: {str(e)}")

@router.patch("/{order_id}/status", response_model=dict)
def update_order_status(order_id: str, order: OrderUpdate):
    """
    Actualizar el estado de una orden existente en Firebase Firestore
    """
    try:
        updated_order = order_service.update_order_status(order_id, order)
        
        if updated_order is None:
            raise HTTPException(status_code=404, detail="Orden no encontrada")
        
        return updated_order
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar orden: {str(e)}")
