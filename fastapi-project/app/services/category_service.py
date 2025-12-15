from typing import List, Optional
from app.core.firebase import get_db
from app.schemas.category import CategoryCreate, CategoryUpdate

class CategoryService:
    """
    Servicio para manejar operaciones CRUD de categorías con Firebase Firestore
    """
    
    def __init__(self):
        self.collection_name = "categories"
    
    def get_all_categories(self) -> List[dict]:
        """
        Obtiene todas las categorías de Firestore.
        """
        try:
            db = get_db()
            categories_ref = db.collection(self.collection_name)
            docs = categories_ref.stream()
            
            categories = []
            for doc in docs:
                category_data = doc.to_dict()
                category_data['id'] = doc.id
                categories.append(category_data)
            
            return categories
        except Exception as e:
            print(f"Error al obtener categorías: {e}")
            raise
    
    def get_category_by_id(self, category_id: str) -> Optional[dict]:
        """
        Obtiene una categoría específica por su ID.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(category_id)
            doc = doc_ref.get()
            
            if doc.exists:
                category_data = doc.to_dict()
                category_data['id'] = doc.id
                return category_data
            return None
        except Exception as e:
            print(f"Error al obtener categoría {category_id}: {e}")
            raise
    
    def create_category(self, category: CategoryCreate) -> dict:
        """
        Crea una nueva categoría en Firestore.
        """
        try:
            db = get_db()
            category_dict = category.model_dump()
            
            # Crear el documento y obtener la referencia
            doc_ref = db.collection(self.collection_name).document()
            doc_ref.set(category_dict)
            
            # Retornar la categoría con su ID
            category_dict['id'] = doc_ref.id
            return category_dict
        except Exception as e:
            print(f"Error al crear categoría: {e}")
            raise
    
    def update_category(self, category_id: str, category: CategoryUpdate) -> Optional[dict]:
        """
        Actualiza una categoría existente.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(category_id)
            
            # Verificar si el documento existe
            if not doc_ref.get().exists:
                return None
            
            # Actualizar solo los campos que no son None
            update_data = category.model_dump(exclude_unset=True)
            doc_ref.update(update_data)
            
            # Obtener y retornar la categoría actualizada
            updated_doc = doc_ref.get()
            category_data = updated_doc.to_dict()
            category_data['id'] = updated_doc.id
            return category_data
        except Exception as e:
            print(f"Error al actualizar categoría {category_id}: {e}")
            raise
    
    def delete_category(self, category_id: str) -> bool:
        """
        Elimina una categoría de Firestore.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(category_id)
            
            # Verificar si el documento existe
            if not doc_ref.get().exists:
                return False
            
            doc_ref.delete()
            return True
        except Exception as e:
            print(f"Error al eliminar categoría {category_id}: {e}")
            raise

# Instancia única del servicio
category_service = CategoryService()
