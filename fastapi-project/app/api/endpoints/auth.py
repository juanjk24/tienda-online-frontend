"""
Endpoints para autenticación y gestión de usuarios
"""
from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from app.core.auth import get_current_user, require_admin, set_user_role, get_user_role

router = APIRouter(prefix="/auth", tags=["Authentication"])


class SetRoleRequest(BaseModel):
    uid: str
    role: str  # 'admin' o 'user'


class UserResponse(BaseModel):
    uid: str
    email: str
    role: str


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """
    Obtiene la información del usuario autenticado
    """
    return UserResponse(
        uid=current_user["uid"],
        email=current_user["email"],
        role=current_user["role"]
    )


@router.post("/set-role", status_code=status.HTTP_200_OK)
async def set_role(
    request: SetRoleRequest,
    admin_user: dict = Depends(require_admin)
):
    """
    Asigna un rol a un usuario (solo administradores)
    """
    if request.role not in ["admin", "user"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El rol debe ser 'admin' o 'user'"
        )
    
    try:
        set_user_role(request.uid, request.role)
        return {
            "message": f"Rol '{request.role}' asignado al usuario {request.uid}",
            "uid": request.uid,
            "role": request.role
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error al asignar rol: {str(e)}"
        )


@router.get("/user-role/{uid}")
async def get_role(
    uid: str,
    admin_user: dict = Depends(require_admin)
):
    """
    Obtiene el rol de un usuario (solo administradores)
    """
    role = get_user_role(uid)
    if role is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuario no encontrado"
        )
    
    return {
        "uid": uid,
        "role": role
    }
