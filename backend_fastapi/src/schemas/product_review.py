from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProductReviewBase(BaseModel):
    product_id: int
    user_id: int
    rating: int
    review_text: Optional[str]


class ProductReviewCreate(ProductReviewBase):
    pass


class ProductReview(ProductReviewBase):
    id: int
    created_at: datetime
