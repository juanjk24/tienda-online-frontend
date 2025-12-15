from typing import List, Optional, Dict, Any
from app.core.firebase import get_firestore_db
from app.schemas.product import Product, ProductCreate
from google.cloud.firestore_v1 import FieldFilter

class ProductService:
    """
    Servicio para manejar operaciones CRUD de productos con Firebase Firestore
    """
    
    def __init__(self):
        self.db = get_firestore_db()
        self.collection_name = "products"
    
    def get_all_products(self) -> List[Dict[str, Any]]:
        """
        Obtiene todos los productos de la colección
        """
        products_ref = self.db.collection(self.collection_name)
        docs = products_ref.stream()
        
        products = []
        for doc in docs:
            product_data = doc.to_dict()
            product_data['id'] = doc.id
            products.append(product_data)
        
        return products
    
    def get_product_by_id(self, product_id: str) -> Optional[Dict[str, Any]]:
        """
        Obtiene un producto por su ID
        """
        doc_ref = self.db.collection(self.collection_name).document(product_id)
        doc = doc_ref.get()
        
        if doc.exists:
            product_data = doc.to_dict()
            product_data['id'] = doc.id
            return product_data
        
        return None
    
    def create_product(self, product_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Crea un nuevo producto en Firestore
        """
        # Agregar timestamp de creación si lo deseas
        products_ref = self.db.collection(self.collection_name)
        
        # Si quieres generar un ID automático
        doc_ref = products_ref.document()
        doc_ref.set(product_data)
        
        # Retornar el producto con su ID
        product_data['id'] = doc_ref.id
        return product_data
    
    def update_product(self, product_id: str, product_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Actualiza un producto existente
        """
        doc_ref = self.db.collection(self.collection_name).document(product_id)
        
        # Verificar si existe
        if not doc_ref.get().exists:
            return None
        
        # Actualizar
        doc_ref.update(product_data)
        
        # Retornar el producto actualizado
        product_data['id'] = product_id
        return product_data
    
    def delete_product(self, product_id: str) -> bool:
        """
        Elimina un producto
        """
        doc_ref = self.db.collection(self.collection_name).document(product_id)
        
        # Verificar si existe
        if not doc_ref.get().exists:
            return False
        
        doc_ref.delete()
        return True
    
    def get_products_by_category(self, category: str) -> List[Dict[str, Any]]:
        """
        Obtiene productos filtrados por categoría
        """
        products_ref = self.db.collection(self.collection_name)
        query = products_ref.where(filter=FieldFilter("category", "==", category))
        docs = query.stream()
        
        products = []
        for doc in docs:
            product_data = doc.to_dict()
            product_data['id'] = doc.id
            products.append(product_data)
        
        return products

# Instancia singleton del servicio
product_service = ProductService()
