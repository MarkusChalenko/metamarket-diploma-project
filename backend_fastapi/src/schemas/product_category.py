from pydantic import BaseModel
from typing import Optional


class ProductCategoryBase(BaseModel):
    name: str
    description: Optional[str]


class ProductCategoryCreate(ProductCategoryBase):
    pass


class ProductCategory(ProductCategoryBase):
    id: int
