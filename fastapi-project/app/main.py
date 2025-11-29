from fastapi import FastAPI
from app.api.endpoints import products, users, orders # Agregamos orders

app = FastAPI(
    title="API de Mi Proyecto",
    description="API RESTful creada con FastAPI.",
    version="1.0.0"
)

app.include_router(products.router, prefix="/products", tags=["Productos"])
app.include_router(users.router, prefix="/users", tags=["Usuarios"])
# Nueva ruta de Pedidos
app.include_router(orders.router, prefix="/orders", tags=["Pedidos"])

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido a la API del Backend"}

@app.get("/health")
def health_check():
    return {"status": "ok"}