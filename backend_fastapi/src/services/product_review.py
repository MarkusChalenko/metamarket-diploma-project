from sqlalchemy.ext.asyncio import AsyncSession

from models import ProductReview
from schemas.product_review import ProductReviewCreate


async def create_review(review: ProductReviewCreate, db: AsyncSession) -> ProductReview:
    db_review = ProductReview(**review.dict())
    db.add(db_review)
    await db.commit()
    return db_review
