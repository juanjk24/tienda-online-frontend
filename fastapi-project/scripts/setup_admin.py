import os
import sys

# Agregar el directorio raíz al path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.firebase import initialize_firebase
from app.core.auth import set_user_role

# UID del usuario al cual se quire hacer administrador
ADMIN_UID = "NcBeMtIQZFg81LOVxazmFLYLEpn2"

def setup_admin():
    initialize_firebase()
    
    # Asignar rol de admin
    try:
        set_user_role(ADMIN_UID, "admin")
        print(f"Usuario {ADMIN_UID} configurado como administrador exitosamente")
    except Exception as e:
        print(f"Error al configurar administrador: {e}")
        sys.exit(1)

if __name__ == "__main__":
    setup_admin()
