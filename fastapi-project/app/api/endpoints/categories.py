from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.schemas.category import Category, CategoryCreate, CategoryUpdate
from app.services.category_service import category_service
from app.core.auth import require_admin

router = APIRouter()

@router.get("/", response_model=List[dict])
def read_categories():
    """
    Obtener todas las categorías desde Firebase Firestore.
    """
    try:
        categories = category_service.get_all_categories()
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener categorías: {str(e)}")

@router.get("/{category_id}", response_model=dict)
def read_category(category_id: str):
    """
    Obtener una categoría por su ID desde Firebase Firestore
    """
    try:
        category = category_service.get_category_by_id(category_id)
        if category is None:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")
        return category
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al obtener categoría: {str(e)}")

@router.post("/", response_model=dict, status_code=201)
def create_category(category: CategoryCreate, admin_user: dict = Depends(require_admin)):
    """
    Crear una nueva categoría en Firebase Firestore
    """
    try:
        new_category = category_service.create_category(category)
        return new_category
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al crear categoría: {str(e)}")

@router.put("/{category_id}", response_model=dict)
def update_category(category_id: str, category: CategoryUpdate):
    """
    Actualizar una categoría existente en Firebase Firestore
    """
    try:
        category_data = category.model_dump(exclude_unset=True)
        updated_category = category_service.update_category(category_id, category_data)
        
        if updated_category is None:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")
        
        return updated_category
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al actualizar categoría: {str(e)}")

@router.delete("/{category_id}", status_code=204)
def delete_category(category_id: str):
    """
    Eliminar una categoría de Firebase Firestore
    """
    try:
        success = category_service.delete_category(category_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Categoría no encontrada")
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error al eliminar categoría: {str(e)}")
