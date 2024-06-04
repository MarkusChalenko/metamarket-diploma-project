from pydantic import BaseModel

from typing import List


class CartItemCreate(BaseModel):
    product_id: int
    quantity: int = 1


class CartItemUpdate(BaseModel):
    quantity: int


class CartItemResponse(BaseModel):
    id: int
    user_id: int
    product_id: int
    quantity: int


class UserCartResponse(BaseModel):
    user_id: int
    cart_items: List[CartItemResponse]
