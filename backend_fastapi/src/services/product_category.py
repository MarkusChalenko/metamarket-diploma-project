from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models import ProductCategory
from schemas.product_category import ProductCategoryCreate


async def get_category(category_id: int, db: AsyncSession) -> ProductCategory:
    result = await db.execute(select(ProductCategory).filter(ProductCategory.id == category_id))
    return result.scalars().first()


async def create_category(category: ProductCategoryCreate, db: AsyncSession) -> ProductCategory:
    db_category = ProductCategory(**category.dict())
    db.add(db_category)
    await db.commit()
    return db_category


async def delete_category(category_id: int, db: AsyncSession) -> ProductCategory:
    db_category = await get_category(category_id, db)
    if db_category:
        await db.delete(db_category)
        await db.commit()
        return db_category

