import datetime

from pydantic import BaseModel
from typing import List

from schemas.product import Product


class OrderBase(BaseModel):
    user_id: int
    total_amount: float


class OrderCreate(OrderBase):
    pass


class OrderUpdate(BaseModel):
    status: str


class ProductsDetails(BaseModel):
    id: int
    order_id: int
    product_id: int
    count: int
    unit_price: float
    product: Product


class OrderResponse(BaseModel):
    id: int
    status: str
    total_amount: float
    user_id: int
    created_at: datetime.datetime
    products_details: List[ProductsDetails]


class UserOrdersResponse(BaseModel):
    user_id: int
    orders: List[OrderResponse]
