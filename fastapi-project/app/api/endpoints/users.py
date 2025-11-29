from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.user import User, UserCreate

router = APIRouter()

# Simulación de base de datos de usuarios
fake_users_db = []

@router.get("/", response_model=List[User])
def read_users():
    """Obtener lista de usuarios"""
    return fake_users_db

@router.post("/", response_model=User)
def create_user(user: UserCreate):
    """Registrar un nuevo usuario"""
    # Verificar si el email ya existe (simulación)
    for existing_user in fake_users_db:
        if existing_user["email"] == user.email:
            raise HTTPException(status_code=400, detail="El email ya está registrado")

    new_id = len(fake_users_db) + 1
    
    # Convertimos el modelo a diccionario
    user_dict = user.dict()
    
    # En un caso real, aquí hashearíamos la contraseña antes de guardarla
    # user_dict["hashed_password"] = fake_hash(user.password)
    # del user_dict["password"] 
    
    user_dict["id"] = new_id
    fake_users_db.append(user_dict)
    
    return user_dict

@router.get("/{user_id}", response_model=User)
def read_user(user_id: int):
    """Obtener un usuario por ID"""
    user = next((u for u in fake_users_db if u["id"] == user_id), None)
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return user