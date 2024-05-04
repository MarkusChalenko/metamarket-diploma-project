from typing import Annotated, Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status

from db.db import db_dependency
from schemas.token import Tokens
from schemas.user import UserRead, UserLogin, UserLoginResponse, UserRegistration
from services.auth import authenticate_user, create_access_token, user_dependency, create_refresh_token, \
    save_refresh_token, login_user, refresh_token_dependency, reg_user

auth_router = APIRouter(
    prefix="/auth",
    tags=['auth']
)


@auth_router.post("/reg")
async def reg(body: UserRegistration, db: db_dependency):
    return await reg_user(body=body,db=db)


@auth_router.post("/login", response_model=UserLoginResponse)
async def login(body: UserLogin, db: db_dependency):
    return await login_user(body=body,db=db)


@auth_router.post("/token", response_model=Tokens)
async def token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                db: db_dependency):
    user: Optional[UserRead] = await authenticate_user(email=form_data.username,
                                                       password=form_data.password,
                                                       db=db)

    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Could not validate user.")
    access_token: str = create_access_token(user)
    refresh_token: str = create_refresh_token(user)
    await save_refresh_token(db=db, refresh_token=refresh_token, user_id=user.id)
    return {'access_token': access_token,
            'refresh_token': refresh_token,
            'type': 'bearer'}


@auth_router.post('/refresh_token')
async def refresh(token_response: refresh_token_dependency):
    if isinstance(token_response, Exception):
        raise token_response
    return token_response


# @auth_router.get("/user")
# def get_user():
#     if user is None:
#         raise HTTPException(status_code=401, detail="Not Authenticated")
#     return {"user": user}
