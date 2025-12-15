import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings

# Variable global para el cliente de Firestore
db = None

def initialize_firebase():
    """
    Inicializa Firebase Admin SDK con credenciales del proyecto
    """
    global db
    
    if not firebase_admin._apps:
        # Configuración usando el Project ID
        cred = credentials.ApplicationDefault()
        
        firebase_admin.initialize_app(cred, {
            'projectId': settings.firebase_project_id,
        })
    
    # Obtener cliente de Firestore
    db = firestore.client()
    return db

def get_firestore_db():
    """
    Obtiene la instancia del cliente de Firestore
    """
    global db
    if db is None:
        db = initialize_firebase()
    return db
