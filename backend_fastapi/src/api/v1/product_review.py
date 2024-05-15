from fastapi import APIRouter, HTTPException
from db.db import db_dependency
from services.product_review import create_review
from schemas.product_review import ProductReview, ProductReviewCreate

product_review_router = APIRouter(prefix="/reviews", tags=["reviews"])


@product_review_router.post("/", response_model=ProductReview)
async def review_create(review: ProductReviewCreate, db: db_dependency):
    return await create_review(review, db)
