from enum import Enum
from typing import Callable, Any

from fastapi import HTTPException
from starlette import status

from services.auth import user_dependency


class Roles(str, Enum):
    customer = 'Customer',
    seller = 'Seller',
    admin = 'Admin'


def has_role(role: Roles) -> Callable[..., Any]:
    async def check_role(user: user_dependency):
        print(f"user role: {user.role.name}, permisson for: {role}")
        if not user or user.role.name != role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You don't have enough permissions",
            )
    return check_role
