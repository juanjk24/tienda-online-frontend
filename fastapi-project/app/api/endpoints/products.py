from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.product import Product, ProductCreate

router = APIRouter()

# Simulación de base de datos en memoria
fake_products_db = [
    {"id": 1, "name": "Laptop", "description": "Laptop potente", "price": 1500.0, "stock": 5},
    {"id": 2, "name": "Mouse", "description": "Mouse inalámbrico", "price": 25.50, "stock": 20},
]

@router.get("/", response_model=List[Product])
def read_products():
    """Obtener todos los productos"""
    return fake_products_db

@router.get("/{product_id}", response_model=Product)
def read_product(product_id: int):
    """Obtener un producto por su ID"""
    # Buscamos el producto en la lista
    product = next((item for item in fake_products_db if item["id"] == product_id), None)
    if product is None:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product

@router.post("/", response_model=Product)
def create_product(product: ProductCreate):
    """Crear un nuevo producto"""
    new_id = len(fake_products_db) + 1
    new_product = product.dict()
    new_product["id"] = new_id
    fake_products_db.append(new_product)
    return new_product