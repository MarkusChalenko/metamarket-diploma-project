from fastapi import APIRouter, HTTPException

from db.db import db_dependency
from schemas.cart_item import CartItemResponse, CartItemCreate, UserCartResponse
from services.cart_item import add_to_cart, remove_from_cart, update_cart_item_quantity, get_user_cart

cart_item_router = APIRouter(prefix="/cart", tags=["cart"])


@cart_item_router.post("/add", response_model=CartItemResponse)
async def add_to_cart_endpoint(cart_item_data: CartItemCreate, db: db_dependency):
    try:
        cart_item = await add_to_cart(db, cart_item_data)
        return cart_item
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to add item to cart")


@cart_item_router.delete("/remove/{cart_item_id}", response_model=bool)
async def remove_from_cart_endpoint(cart_item_id: int, db: db_dependency):
    try:
        result = await remove_from_cart(db, cart_item_id)
        if not result:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to remove item from cart")


@cart_item_router.put("/update_quantity/{cart_item_id}", response_model=bool)
async def update_cart_item_quantity_endpoint(cart_item_id: int, quantity: int, db: db_dependency):
    try:
        result = await update_cart_item_quantity(db, cart_item_id, quantity)
        if not result:
            raise HTTPException(status_code=404, detail="Item not found in cart")
        return True
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to update item quantity in cart")


@cart_item_router.get("/user_cart/{user_id}", response_model=UserCartResponse)
async def get_user_cart_endpoint(user_id: int, db: db_dependency):
    try:
        cart_items = await get_user_cart(db, user_id)
        return {"user_id": user_id, "cart_items": cart_items}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to retrieve user cart")
