from typing import List

from fastapi import APIRouter, HTTPException
from db.db import db_dependency
from services.product_category import create_category, get_category, delete_category, get_all_categories
from schemas.product_category import ProductCategoryCreate, ProductCategory

product_category_router = APIRouter(prefix="/categories", tags=["categories"])


@product_category_router.get("/", response_model=List[ProductCategory])
async def get_all(db: db_dependency):
    return await get_all_categories(db)


@product_category_router.post("/", response_model=ProductCategory)
async def category_create(category: ProductCategoryCreate, db: db_dependency):
    return await create_category(category, db)


@product_category_router.get("/{category_id}", response_model=ProductCategory)
async def category_read(category_id: int, db: db_dependency):
    category = await get_category(category_id, db)
    if category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return category


@product_category_router.delete("/{category_id}", response_model=ProductCategory)
async def category_delete(category_id: int, db: db_dependency):
    deleted_category = await delete_category(category_id, db)
    if deleted_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return deleted_category
