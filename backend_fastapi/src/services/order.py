from typing import List, Dict

from sqlalchemy import delete
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload, joinedload, load_only

from db.db import db_dependency
from models import CartItem, Product, OrderProductAssociation
from models.order import Order
from schemas.order import OrderCreate, UserOrdersResponse, OrderResponse


async def make_order(user_id, db: db_dependency) -> Order:
    order = Order(user_id=user_id)

    db.add(order)
    await db.commit()

    return order


async def create_order(db: db_dependency, user_id: int) -> OrderResponse:
    order: Order = await make_order(user_id, db)

    cart_items = await db.execute(select(CartItem).filter_by(user_id=user_id))
    products_in_cart = cart_items.scalars().all()

    order_products: [OrderProductAssociation] = []
    order_products_response: List[Dict] = []

    total_amount = 0

    for cart_item in products_in_cart:
        # Получаем товар из корзины
        product: Product = await db.get(Product, cart_item.product_id)

        if product:
            total_amount += product.price * cart_item.quantity
            order_products_response.append(
                {**product.to_dict(),
                 "quantity": cart_item.quantity}
            )
            order_products.append(
                OrderProductAssociation(
                    order_id=order.id,
                    product_id=product.id,
                    count=cart_item.quantity,
                    unit_price=product.price
                )
            )

    order = await db.scalar(
        select(Order)
        .where(Order.id == order.id)
        .options(
            selectinload(Order.products_details).joinedload(
                OrderProductAssociation.product
            ),
        ),
    )

    order.products_details.extend(order_products)
    await db.execute(delete(CartItem).where(CartItem.user_id == user_id))
    await db.commit()

    a = OrderResponse(id=order.id,
                      total_amount=total_amount,
                      status=order.status,
                      products=order_products_response)

    return a


async def get_order(db: db_dependency, order_id: int) -> Order:
    order = await db.get(Order, order_id)
    return order


async def update_order_status(db: db_dependency, order_id: int, status: str) -> bool:
    order = await db.get(Order, order_id)
    if order:
        order.status = status
        await db.commit()
        return True
    return False


async def delete_order(db: db_dependency, order_id: int) -> bool:
    order = await db.get(Order, order_id)
    if order:
        await db.delete(order)
        await db.commit()
        return True
    return False


async def get_user_orders(db: db_dependency, user_id: int) -> List[Order]:
    stmt = (
        select(Order)
        .options(
            selectinload(Order.products_details).joinedload(
                OrderProductAssociation.product
            )
        )
        .filter_by(user_id=user_id)
        .order_by(Order.id)
    )
    orders = await db.execute(stmt)
    orders = orders.scalars().all()

    return orders

