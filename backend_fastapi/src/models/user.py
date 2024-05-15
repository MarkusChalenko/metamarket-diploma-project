from datetime import datetime
from typing import List

from sqlalchemy import Integer, String, TIMESTAMP, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column

from schemas.role import Role
from schemas.user import UserRead
from .base import Base


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String, nullable=False, unique=False)
    email: Mapped[str] = mapped_column(String(length=256), unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(length=256), nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey("role.id"), default=1)
    role: Mapped["Role"] = relationship("Role", uselist=False)
    registered_at = mapped_column(TIMESTAMP, default=datetime.utcnow)

    products: Mapped[List["Product"]] = relationship("Product", back_populates="user")
    reviews: Mapped["ProductReview"] = relationship("ProductReview", back_populates="reviewer")

    # refresh_token: Mapped["RefreshToken"] = relationship("RefreshToken", backref="user")
    refresh_token = relationship("RefreshToken", uselist=False, back_populates="user")

    def to_user_read(self) -> UserRead:
        return UserRead(
            id=self.id,
            full_name=self.full_name,
            email=self.email,
            role_id=self.role_id,
            role=Role(
                id=self.role.id,
                name=self.role.name
            ),
            registered_at=self.registered_at,
        )
