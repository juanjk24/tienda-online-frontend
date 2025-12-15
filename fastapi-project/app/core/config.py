from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    app_name: str = "FastAPI Project"
    admin_email: str = "juanjkuellar24@gmail.com"
    items_per_page: int = 10
    
    # Firebase Configuration
    firebase_api_key: Optional[str] = None
    firebase_auth_domain: Optional[str] = None
    firebase_project_id: Optional[str] = None
    firebase_storage_bucket: Optional[str] = None
    firebase_messaging_sender_id: Optional[str] = None
    firebase_app_id: Optional[str] = None

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()