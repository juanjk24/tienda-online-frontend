from pydantic import BaseModel, EmailStr
from typing import Optional

# Datos base compartidos
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    is_active: bool = True

# Datos para crear un usuario (incluye password)
class UserCreate(UserBase):
    password: str

# Datos para devolver al cliente (SIN password, CON id)
class User(UserBase):
    id: int

    class Config:
        from_attributes = True