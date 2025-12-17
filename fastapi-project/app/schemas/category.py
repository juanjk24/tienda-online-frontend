from pydantic import BaseModel
from typing import Optional

# Esquema base con atributos comunes
class CategoryBase(BaseModel):
    name: str
    icon: Optional[str] = None

# Esquema para crear una categoría
class CategoryCreate(CategoryBase):
    pass

# Esquema para actualizar una categoría
class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    icon: Optional[str] = None

# Esquema para leer una categoría
class Category(CategoryBase):
    id: str

    class Config:
        from_attributes = True
