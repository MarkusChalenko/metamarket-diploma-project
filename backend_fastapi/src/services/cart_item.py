from typing import List

from sqlalchemy.future import select

from db.db import db_dependency
from models.cart_item import CartItem
from schemas.cart_item import CartItemCreate


async def add_to_cart(db: db_dependency, cart_item_data: CartItemCreate) -> CartItem:
    cart_item = CartItem(**cart_item_data.dict())
    db.add(cart_item)
    await db.commit()
    return cart_item


async def remove_from_cart(db: db_dependency, cart_item_id: int) -> bool:
    cart_item = await db.get(CartItem, cart_item_id)
    if cart_item:
        await db.delete(cart_item)
        await db.commit()
        return True
    return False


async def update_cart_item_quantity(db: db_dependency, cart_item_id: int, quantity: int) -> bool:
    cart_item = await db.get(CartItem, cart_item_id)
    if cart_item:
        cart_item.quantity = quantity
        await db.commit()
        return True
    return False


async def get_user_cart(db: db_dependency, user_id: int) -> List[CartItem]:
    cart_items = await db.execute(select(CartItem).filter_by(user_id=user_id))
    return cart_items.scalars().all()

