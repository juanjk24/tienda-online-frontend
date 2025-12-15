from typing import List, Optional
from app.core.firebase import get_db
from app.schemas.product import ProductCreate, ProductUpdate
from google.cloud.firestore_v1.base_query import FieldFilter

class ProductService:
    """
    Servicio para manejar operaciones CRUD de productos con Firebase Firestore
    """
    
    def __init__(self):
        self.collection_name = "products"
    
    def get_all_products(self, category: Optional[str] = None) -> List[dict]:
        """
        Obtiene todos los productos de Firestore.
        Opcionalmente filtra por categoría.
        """
        try:
            db = get_db()
            products_ref = db.collection(self.collection_name)
            
            # Filtrar por categoría si se proporciona
            if category:
                query = products_ref.where(filter=FieldFilter("category", "==", category))
                docs = query.stream()
            else:
                docs = products_ref.stream()
            
            products = []
            for doc in docs:
                product_data = doc.to_dict()
                product_data['id'] = doc.id
                products.append(product_data)
            
            return products
        except Exception as e:
            print(f"Error al obtener productos: {e}")
            raise
    
    def get_product_by_id(self, product_id: str) -> Optional[dict]:
        """
        Obtiene un producto específico por su ID.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(product_id)
            doc = doc_ref.get()
            
            if doc.exists:
                product_data = doc.to_dict()
                product_data['id'] = doc.id
                return product_data
            return None
        except Exception as e:
            print(f"Error al obtener producto {product_id}: {e}")
            raise
    
    def create_product(self, product: ProductCreate) -> dict:
        """
        Crea un nuevo producto en Firestore.
        """
        try:
            db = get_db()
            product_dict = product.model_dump()
            
            # Crear el documento y obtener la referencia
            doc_ref = db.collection(self.collection_name).document()
            doc_ref.set(product_dict)
            
            # Retornar el producto con su ID
            product_dict['id'] = doc_ref.id
            return product_dict
        except Exception as e:
            print(f"Error al crear producto: {e}")
            raise
    
    def update_product(self, product_id: str, product: ProductUpdate) -> Optional[dict]:
        """
        Actualiza un producto existente.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(product_id)
            
            # Verificar si el documento existe
            if not doc_ref.get().exists:
                return None
            
            # Actualizar solo los campos que no son None
            update_data = product.model_dump(exclude_unset=True)
            doc_ref.update(update_data)
            
            # Obtener y retornar el producto actualizado
            updated_doc = doc_ref.get()
            product_data = updated_doc.to_dict()
            product_data['id'] = updated_doc.id
            return product_data
        except Exception as e:
            print(f"Error al actualizar producto {product_id}: {e}")
            raise
    
    def delete_product(self, product_id: str) -> bool:
        """
        Elimina un producto de Firestore.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(product_id)
            
            # Verificar si el documento existe
            if not doc_ref.get().exists:
                return False
            
            doc_ref.delete()
            return True
        except Exception as e:
            print(f"Error al eliminar producto {product_id}: {e}")
            raise

# Instancia única del servicio
product_service = ProductService()
