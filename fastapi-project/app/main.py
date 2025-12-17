from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import products, categories, orders, auth
from app.core.firebase import initialize_firebase

app = FastAPI(
    title="API de Mi Proyecto",
    description="API RESTful creada con FastAPI integrada con Firebase.",
    version="1.0.0"
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especifica los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar Firebase al arrancar la aplicación
@app.on_event("startup")
async def startup_event():
    """
    Inicializa Firebase cuando la aplicación arranca
    """
    try:
        initialize_firebase()
        print("✅ Firebase inicializado correctamente")
    except Exception as e:
        print(f"❌ Error al inicializar Firebase: {e}")

app.include_router(auth.router, prefix="/api", tags=["Autenticación"])
app.include_router(products.router, prefix="/products", tags=["Productos"])
app.include_router(categories.router, prefix="/categories", tags=["Categorías"])
app.include_router(orders.router, prefix="/orders", tags=["Órdenes"])

@app.get("/")
def read_root():
    return {"mensaje": "Bienvenido a la API del Backend con Firebase"}

@app.get("/health")
def health_check():
    return {"status": "ok", "database": "Firebase Firestore"}