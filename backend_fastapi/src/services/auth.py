from datetime import timedelta, datetime
from typing import Annotated, Optional
from calendar import timegm

from fastapi import HTTPException, Depends
from sqlalchemy import select

from jose import jwt, JWTError
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload
from starlette import status

from auth.auth import bcrypt_context, oauth2_bearer
from core.config import app_settings
from db.db import db_dependency
from models import User, RefreshToken
from schemas.role import Role
from schemas.token import Tokens
from schemas.user import UserRead, UserLogin, UserLoginResponse, UserRegistration
from services.user import create_new_user, get_user_by_email

error = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                      detail="Could not validate user.")


async def authenticate_user(email: str, password: str, db: db_dependency) -> UserRead | None:
    try:
        user: User = await get_user_by_email(db, email, with_pass=True)
        if not user:
            return None
        if not bcrypt_context.verify(password, user.hashed_password):
            return None
        return user.to_user_read()
    except Exception as ex:
        raise ex


def create_access_token(user: UserRead) -> str:
    exp_access = timedelta(minutes=app_settings.jwt_access_expire_min)
    expires = timegm((datetime.utcnow() + exp_access).utctimetuple())
    encode = {**user.model_dump(),
              'exp': expires,
              'mode': 'access_token'}
    return jwt.encode(encode, app_settings.jwt_secret, algorithm=app_settings.algorithm)


def create_refresh_token(user: UserRead) -> str:
    exp_refresh = timedelta(days=app_settings.jwt_refresh_expire_dys)
    expires = timegm((datetime.utcnow() + exp_refresh).utctimetuple())
    encode = {**user.model_dump(),
              'exp': expires,
              'mode': 'refresh_token'}
    return jwt.encode(encode, app_settings.jwt_secret, algorithm=app_settings.algorithm)


async def save_refresh_token(db: AsyncSession, refresh_token: str, user_id: int) -> None:
    insert_stmt = insert(RefreshToken).values(refresh_token=refresh_token,
                                              user_id=user_id)
    on_duplicate_key_stmt = insert_stmt.on_conflict_do_update(
        index_elements=["user_id"],
        set_={"refresh_token": refresh_token}
    )

    await db.execute(on_duplicate_key_stmt)
    await db.commit()


async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]) -> UserRead:
    try:
        payload: dict = jwt.decode(token, app_settings.jwt_secret,
                                   algorithms=app_settings.algorithm)
        user_name: str = payload.get('full_name')
        user_id: int = payload.get('id')
        if user_name is None or user_id is None:
            raise error
        return UserRead(
            id=payload.get('id'),
            full_name=payload.get('full_name'),
            email=payload.get('email'),
            role_id=payload.get('role_id'),
            role=Role(
                id=payload.get('role').get('id'),
                name=payload.get('role').get('name')
            )
        )
    except JWTError:
        raise error


async def authorize(token: Annotated[str, Depends(oauth2_bearer)], db: db_dependency) -> Tokens | Exception:
    # validate the refresh jwt token
    try:
        data: dict = jwt.decode(token, app_settings.jwt_secret,
                                algorithms=app_settings.algorithm)
        # check if "mode": "refresh_token"
        if 'full_name' not in data and 'mode' not in data:
            raise error
        if data['mode'] != 'refresh_token':
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Passed not a refresh token")
        # check if user exists
        result = await db.execute(
            select(User)
            .options(joinedload(User.refresh_token))
            .filter(User.email == data['email']))

        user: Optional[User] = result.scalars().first()

        # check refresh tokens
        if not user or token != user.refresh_token.refresh_token:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Wrong refresh token")

        # generate new refresh token and save it to database
        refresh_tkn = create_refresh_token(user.to_user_read())
        await save_refresh_token(db, refresh_tkn, user.id)

        # generate new access token
        access_tkn = create_access_token(user.to_user_read())
        return Tokens(
            access_token=access_tkn,
            refresh_token=refresh_tkn,
            type='bearer')
    except Exception as ex:
        raise ex


async def reg_user(body: UserRegistration, db: AsyncSession) -> UserRead:
    try:
        created_user: Optional[UserRead] = await create_new_user(user_data=body,
                                                                 db=db)
        return created_user
    except Exception as ex:
        raise ex


async def login_user(body: UserLogin, db: AsyncSession) -> UserLoginResponse:
    user: User = await get_user_by_email(db,body.email, with_pass=True)

    # check if user exists
    if not user:
        raise error

    # check if password matches
    matches = bcrypt_context.verify(body.password, user.hashed_password)
    if not matches:
        raise error

    access_tkn = create_access_token(user.to_user_read())
    refresh_tkn = create_refresh_token(user.to_user_read())
    await save_refresh_token(db=db,
                             refresh_token=refresh_tkn,
                             user_id=user.id)

    return UserLoginResponse(
        id=user.id,
        full_name=user.full_name,
        email=user.email,
        role_id=user.role_id,
        role=Role(
            id=user.role.id,
            name=user.role.name
        ),
        access_token=access_tkn,
        refresh_token=refresh_tkn,
        type='bearer'
    )


user_dependency = Annotated[UserRead, Depends(get_current_user)]
refresh_token_dependency = Annotated[str, Depends(authorize)]
