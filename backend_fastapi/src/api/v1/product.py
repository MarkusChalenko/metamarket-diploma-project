from typing import List

from fastapi import APIRouter, HTTPException

from db.db import db_dependency
from services.product import create_product, get_product, update_product, delete_product, get_user_products, \
    get_products_in_category
from schemas.product import Product, ProductCreate, ProductUpdate, UserProducts

product_router = APIRouter(prefix="/products", tags=["products"])


@product_router.post("/", response_model=Product)
async def product_create(product: ProductCreate, db: db_dependency):
    return await create_product(product, db)


@product_router.get("/{product_id}", response_model=Product)
async def product_read(product_id: int, db: db_dependency):
    product = await get_product(product_id, db)
    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@product_router.put("/{product_id}", response_model=Product)
async def product_update(product_id: int, product: ProductUpdate, db: db_dependency):
    updated_product = await update_product(product_id, product, db)
    if updated_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated_product


@product_router.delete("/{product_id}", response_model=Product)
async def product_delete(product_id: int, db: db_dependency):
    deleted_product = await delete_product(product_id, db)
    if deleted_product is None:
        raise HTTPException(status_code=404, detail="Product not found")
    return deleted_product


@product_router.get("/{user_id}/products", response_model=UserProducts)
async def get_all_user_products(user_id: int, db: db_dependency):
    user_products = await get_user_products(user_id, db)
    if user_products is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user_products


@product_router.get("/category/{category_id}", response_model=List[Product])
async def get_products_by_category(db: db_dependency, category_id: int):
    products: List[Product] = await get_products_in_category(db, category_id)
    if not products:
        raise HTTPException(status_code=404, detail="Products not found")
    return products
