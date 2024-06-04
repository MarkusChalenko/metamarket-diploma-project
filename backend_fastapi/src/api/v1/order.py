from fastapi import APIRouter, HTTPException, Path

from db.db import db_dependency
from schemas.order import OrderCreate, OrderUpdate, OrderResponse, UserOrdersResponse
from services.auth import user_dependency
from services.order import create_order, get_order, update_order_status, get_user_orders, delete_order

order_router = APIRouter(prefix="/order", tags=["order"])


@order_router.post("/create", response_model=OrderResponse)
async def create_order_endpoint(user:user_dependency, db: db_dependency):
    try:
        order = await create_order(db, user.id)
        return order
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to create order")


@order_router.get("/{order_id}", response_model=OrderResponse)
async def get_order_endpoint(db: db_dependency, order_id: int = Path(..., title="The ID of the order")):
    try:
        order = await get_order(db, order_id)
        if not order:
            raise HTTPException(status_code=404, detail="Order not found")
        return order
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve order")


@order_router.put("/{order_id}", response_model=bool)
async def update_order_status_endpoint(status: str, db: db_dependency, order_id: int = Path(..., title="The ID of the order")):
    try:
        result = await update_order_status(db, order_id, status)
        if not result:
            raise HTTPException(status_code=404, detail="Order not found")
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update order status")


@order_router.delete("/{order_id}", response_model=bool)
async def delete_order_endpoint(db: db_dependency, order_id: int = Path(..., title="The ID of the order")):
    try:
        result = await delete_order(db, order_id)
        if not result:
            raise HTTPException(status_code=404, detail="Order not found")
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to delete order")


@order_router.get("/user/", response_model=UserOrdersResponse)
async def get_user_orders_endpoint(db: db_dependency, user: user_dependency):
    try:
        orders = await get_user_orders(db, user.id)
        return {"orders": orders}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve user orders")
