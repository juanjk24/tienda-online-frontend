from typing import List, Optional
from app.core.firebase import get_db
from app.schemas.order import OrderCreate, OrderUpdate
from google.cloud.firestore_v1.base_query import FieldFilter

class OrderService:
    """
    Servicio para manejar operaciones CRUD de órdenes con Firebase Firestore
    """
    
    def __init__(self):
        self.collection_name = "orders"
    
    def get_all_orders(self, limit: Optional[int] = None) -> List[dict]:
        """
        Obtiene todas las órdenes de Firestore.
        Opcionalmente limita resultados.
        """
        try:
            db = get_db()
            orders_ref = db.collection(self.collection_name)
            
            query = orders_ref
            
            # Aplicar límite si se proporciona
            if limit:
                query = query.limit(limit)
            
            docs = query.stream()
            
            orders = []
            for doc in docs:
                order_data = doc.to_dict()
                order_data['id'] = doc.id
                orders.append(order_data)
            
            return orders
        except Exception as e:
            print(f"Error al obtener órdenes: {e}")
            raise
    
    def get_order_by_id(self, order_id: str) -> Optional[dict]:
        """
        Obtiene una orden específica por su ID.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(order_id)
            doc = doc_ref.get()
            
            if doc.exists:
                order_data = doc.to_dict()
                order_data['id'] = doc.id
                return order_data
            return None
        except Exception as e:
            print(f"Error al obtener orden {order_id}: {e}")
            raise
    
    def get_orders_by_email(self, email: str) -> List[dict]:
        """
        Obtiene todas las órdenes de un email específico.
        """
        try:
            db = get_db()
            orders_ref = db.collection(self.collection_name)
            
            # Filtrar por email
            query = orders_ref.where(filter=FieldFilter("email", "==", email))
            
            docs = query.stream()
            
            orders = []
            for doc in docs:
                order_data = doc.to_dict()
                order_data['id'] = doc.id
                orders.append(order_data)
            
            return orders
        except Exception as e:
            print(f"Error al obtener órdenes por email {email}: {e}")
            raise
    
    def create_order(self, order: OrderCreate) -> dict:
        """
        Crea una nueva orden en Firestore.
        """
        try:
            db = get_db()
            order_dict = order.model_dump()
            
            # Crear el documento y obtener la referencia
            doc_ref = db.collection(self.collection_name).document()
            doc_ref.set(order_dict)
            
            # Retornar la orden con su ID
            order_dict['id'] = doc_ref.id
            return order_dict
        except Exception as e:
            print(f"Error al crear orden: {e}")
            raise
    
    def update_order_status(self, order_id: str, order: OrderUpdate) -> Optional[dict]:
        """
        Actualiza el estado de una orden existente.
        """
        try:
            db = get_db()
            doc_ref = db.collection(self.collection_name).document(order_id)
            
            # Verificar si el documento existe
            if not doc_ref.get().exists:
                return None
            
            # Actualizar solo el estado
            update_data = {"estado": order.estado}
            doc_ref.update(update_data)
            
            # Obtener y retornar la orden actualizada
            updated_doc = doc_ref.get()
            order_data = updated_doc.to_dict()
            order_data['id'] = updated_doc.id
            return order_data
        except Exception as e:
            print(f"Error al actualizar orden {order_id}: {e}")
            raise

# Instancia única del servicio
order_service = OrderService()
