from typing import Optional

from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models import User
from models.product import Product
from schemas.product import ProductCreate, ProductUpdate, UserProducts


async def get_product(product_id: int, db: AsyncSession) -> Product:
    result = await db.execute(select(Product).filter(Product.id == product_id))
    return result.scalars().first()


async def create_product(product: ProductCreate, db: AsyncSession) -> Product:
    db_product = Product(**product.dict())
    db.add(db_product)
    await db.commit()
    return db_product


async def update_product(product_id: int, product: ProductUpdate, db: AsyncSession) -> Product:
    db_product = await get_product(product_id)
    if db_product:
        for key, value in product.dict(exclude_unset=True).items():
            setattr(db_product, key, value)
        await db.commit()
    return db_product


async def delete_product(product_id: int, db: AsyncSession) -> Product:
    db_product = await get_product(product_id)
    if db_product:
        await db.delete(db_product)
        await db.commit()
    return db_product


async def get_user_products(user_id: int, db: AsyncSession) -> Optional[UserProducts]:
    user = await db.get(User, user_id)
    if not user:
        return None
    products = [product for product in user.products]
    return UserProducts(user_id=user.id, products=products)
