from fastapi import APIRouter, HTTPException, Query, Depends
from typing import List, Optional
from app.schemas.product import Product, ProductCreate, ProductUpdate
from app.services.product_service import product_service
from app.core.auth import require_admin

router = APIRouter()

@router.get("/", response_model=List[dict])
def read_products(
    category: Optional[str] = Query(None, description="Filtrar por categoría"),
    limit: Optional[int] = Query(None, description="Limitar número de productos", ge=1)
):
    """
    Obtener todos los productos desde Firebase Firestore.
    Opcionalmente filtrar por categoría y limitar resultados.
    """
    try:
        products = product_service.get_all_products(category=category, limit=limit)
        return products
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener productos: {str(e)}")

@router.get("/{product_id}", response_model=dict)
def read_product(product_id: str):
    """
    Obtener un producto por su ID desde Firebase Firestore
    """
    try:
        product = product_service.get_product_by_id(product_id)
        if product is None:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        return product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener producto: {str(e)}")

@router.post("/", response_model=dict, status_code=201)
def create_product(
    product: ProductCreate,
    admin_user: dict = Depends(require_admin)
):
    """
    Crear un nuevo producto en Firebase Firestore (solo administradores)
    """
    try:
        new_product = product_service.create_product(product)
        return new_product
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear producto: {str(e)}")

@router.put("/{product_id}", response_model=dict)
def update_product(product_id: str, product: ProductUpdate):
    """
    Actualizar un producto existente en Firebase Firestore
    """
    try:
        product_data = product.model_dump(exclude_unset=True)
        updated_product = product_service.update_product(product_id, product_data)
        
        if updated_product is None:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        
        return updated_product
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar producto: {str(e)}")

@router.delete("/{product_id}", status_code=204)
def delete_product(product_id: str):
    """
    Eliminar un producto de Firebase Firestore
    """
    try:
        success = product_service.delete_product(product_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Producto no encontrado")
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar producto: {str(e)}")