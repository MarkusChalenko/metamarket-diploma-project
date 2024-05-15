from typing import Optional

from pydantic import EmailStr, BaseModel

from schemas.role import Role


class UserBase(BaseModel):
    full_name: str
    email: EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str


class UserRead(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    role_id: Optional[int]
    role: Optional[Role]


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[EmailStr] = None


class UserRegistration(UserCreate):
    pass


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserLoginResponse(UserRead):
    access_token: str
    refresh_token: str
    type: str = 'bearer'
