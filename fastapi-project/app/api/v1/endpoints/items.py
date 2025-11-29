from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.item import Item, ItemCreate, ItemUpdate
from app.crud.crud_item import create_item, get_item, get_items, update_item, delete_item

router = APIRouter()

@router.post("/", response_model=Item)
def create_item_endpoint(item: ItemCreate):
    db_item = create_item(item)
    return db_item

@router.get("/", response_model=List[Item])
def read_items(skip: int = 0, limit: int = 10):
    items = get_items(skip=skip, limit=limit)
    return items

@router.get("/{item_id}", response_model=Item)
def read_item(item_id: int):
    db_item = get_item(item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.put("/{item_id}", response_model=Item)
def update_item_endpoint(item_id: int, item: ItemUpdate):
    db_item = update_item(item_id, item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@router.delete("/{item_id}", response_model=Item)
def delete_item_endpoint(item_id: int):
    db_item = delete_item(item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item