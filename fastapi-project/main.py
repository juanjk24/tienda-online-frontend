from fastapi import FastAPI, Query, HTTPException
from typing import Optional
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


# Cargar variables de entorno desde .env
load_dotenv()

# Inicializar la aplicación FastAPI
app = FastAPI(title=os.getenv("APP_NAME", "FastAPI App"))

# Configuración de CORS (permite conexión desde frontend en localhost:5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Montar la carpeta "public" en la ruta /static
app.mount("/static", StaticFiles(directory="public"), name="static")

# Datos de ejemplo (reemplazar con base de datos real más adelante)
PRODUCTS = [
    {
        "id": 1,
        "name": "Laptop Gamer",
        "price": 3500,
        "category": "Tecnología",
        "image": "http://localhost:8000/static/laptop_gamer.jpg"
    },
    {
        "id": 2,
        "name": "Teléfono Android",
        "price": 1200,
        "category": "Tecnología",
        "image": "http://localhost:8000/static/Telefono_Android.png"
    },
    {
        "id": 3,
        "name": "Camiseta Deportiva",
        "price": 80,
        "category": "Ropa",
        "image": "http://localhost:8000/static/Camiseta_Deportiva.jpg"
    },
    {
        "id": 4,
        "name": "Zapatos Running",
        "price": 200,
        "category": "Ropa",
        "image": "http://localhost:8000/static/Zapatos_Running.jpg"
    },
]

CATEGORIES = [
    {"id": 1, "name": "Tecnología", "icon": "💻"},
    {"id": 2, "name": "Ropa", "icon": "👕"},
    {"id": 3, "name": "Hogar", "icon": "🏠"},
]

# Endpoint raíz para confirmar que el backend está activo
@app.get("/")
def root():
    return {"message": "Backend FastAPI corriendo correctamente"}

# Endpoint: obtener productos
@app.get("/products")
def get_products(limit: Optional[int] = Query(None), category: Optional[str] = Query(None)):
    results = PRODUCTS
    if category:
        results = [p for p in results if p["category"].lower() == category.lower()]
    if limit:
        results = results[:limit]
    return results

# Endpoint: obtener producto por ID
@app.get("/products/{product_id}")
def get_product_by_id(product_id: int):
    product = next((p for p in PRODUCTS if p["id"] == product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Producto no encontrado")
    return product

# Endpoint: obtener categorías
@app.get("/categories")
def get_categories(limit: Optional[int] = Query(None)):
    results = CATEGORIES
    if limit:
        results = results[:limit]
    return results

# Endpoint: obtener categoría por ID
@app.get("/categories/{category_id}")
def get_category_by_id(category_id: int):
    category = next((c for c in CATEGORIES if c["id"] == category_id), None)
    if not category:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return category

# Endpoints de autenticación (simulados)
@app.post("/auth/login")
def login(data: dict):
    # Aquí debe validar email y password con la base de datos
    return {"message": "Login exitoso", "token": "abc123"}

@app.post("/auth/register")
def register(data: dict):
    # Aquí se debe crear el usuario en base de datos
    return {"message": "Registro exitoso"}