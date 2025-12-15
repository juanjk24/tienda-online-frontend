import firebase_admin
from firebase_admin import credentials, firestore
from app.core.config import settings
import os

# Variable global para el cliente de Firestore
db = None

def initialize_firebase():
    """
    Inicializa Firebase Admin SDK con credenciales del proyecto
    """
    global db
    
    if not firebase_admin._apps:
        try:
            # Intenta usar la service account key si existe
            service_account_path = os.path.join(os.path.dirname(__file__), '..', '..', 'firebase-credentials.json')
            
            if os.path.exists(service_account_path):
                # Producción o desarrollo con service account
                cred = credentials.Certificate(service_account_path)
                firebase_admin.initialize_app(cred)
                print("✅ Firebase inicializado con Service Account Key")
            else:
                # Desarrollo con Application Default Credentials
                cred = credentials.ApplicationDefault()
                firebase_admin.initialize_app(cred, {
                    'projectId': settings.firebase_project_id,
                })
                print("✅ Firebase inicializado con Application Default Credentials")
            
            db = firestore.client()
            print(f"✅ Conectado a Firestore - Proyecto: {settings.firebase_project_id}")
            
        except Exception as e:
            print(f"❌ Error al inicializar Firebase: {e}")
            raise
    else:
        db = firestore.client()
    
    return db

def get_db():
    """
    Obtiene la instancia del cliente de Firestore
    """
    if db is None:
        return initialize_firebase()
    return db
