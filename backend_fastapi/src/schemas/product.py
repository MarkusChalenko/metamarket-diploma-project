from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal
from datetime import datetime
from enum import Enum


class ProductStatus(str, Enum):
    available = "available"
    pending = "pending"
    sold = "sold"
    inactive = "inactive"


class ProductBase(BaseModel):
    title: str
    description: Optional[str]
    price: Decimal
    currency: str
    status: Optional[ProductStatus] = ProductStatus.available
    image_url: Optional[str]


class ProductCreate(ProductBase):
    user_id: int
    category_id: Optional[int]


class ProductUpdate(ProductBase):
    pass


class Product(ProductBase):
    id: int
    user_id: int
    category_id: Optional[int]
    created_at: datetime
    updated_at: datetime


class UserProducts(BaseModel):
    user_id: int
    products: List[Product]
