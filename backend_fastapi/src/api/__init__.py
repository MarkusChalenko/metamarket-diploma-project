from fastapi import APIRouter

from api.v1.auth import auth_router
from api.v1.cart_item import cart_item_router
from api.v1.order import order_router
from api.v1.product import product_router
from api.v1.product_category import product_category_router
from api.v1.product_review import product_review_router
from api.v1.user import user_router

api_router = APIRouter()

api_router.include_router(auth_router)
api_router.include_router(user_router)
api_router.include_router(product_router)
api_router.include_router(product_review_router)
api_router.include_router(product_category_router)
api_router.include_router(cart_item_router)
api_router.include_router(order_router)