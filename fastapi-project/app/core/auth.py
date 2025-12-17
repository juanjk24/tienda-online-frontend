"""
Middleware y utilidades para autenticación y autorización con Firebase
"""
from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from firebase_admin import auth
from typing import Optional, List
from functools import wraps

security = HTTPBearer()


async def verify_firebase_token(credentials: HTTPAuthorizationCredentials = Security(security)):
    """
    Verifica el token de Firebase y retorna los datos del usuario
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de autenticación no proporcionado"
        )
    
    try:
        # Verificar el token
        decoded_token = auth.verify_id_token(credentials.credentials)
        return decoded_token
    except auth.InvalidIdTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido o expirado"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Error al verificar token: {str(e)}"
        )


async def get_current_user(token_data: dict = Security(verify_firebase_token)):
    """
    Obtiene los datos del usuario actual desde el token verificado
    """
    return {
        "uid": token_data.get("uid"),
        "email": token_data.get("email"),
        "role": token_data.get("role", "user"),  # Por defecto es 'user'
    }


async def require_admin(current_user: dict = Security(get_current_user)):
    """
    Verifica que el usuario tenga rol de administrador
    """
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="No tienes permisos de administrador para realizar esta acción"
        )
    return current_user


def set_user_role(uid: str, role: str = "user"):
    """
    Asigna un custom claim de rol a un usuario de Firebase
    
    Args:
        uid: UID del usuario en Firebase
        role: Rol a asignar ('admin' o 'user')
    """
    try:
        # Establecer custom claims
        auth.set_custom_user_claims(uid, {'role': role})
        print(f"Rol '{role}' asignado al usuario {uid}")
        return True
    except Exception as e:
        print(f"Error al asignar rol: {e}")
        raise


def get_user_role(uid: str) -> Optional[str]:
    try:
        user = auth.get_user(uid)
        custom_claims = user.custom_claims or {}
        return custom_claims.get('role', 'user')
    except Exception as e:
        print(f"❌ Error al obtener rol: {e}")
        return None
