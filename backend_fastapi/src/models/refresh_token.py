from sqlalchemy import Integer, String, ForeignKey, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base


class RefreshToken(Base):
    __tablename__ = "refresh_token"
    __table_args__ = (UniqueConstraint("user_id", name="unique_user_id"),)

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True)
    refresh_token: Mapped[str] = mapped_column(String(length=256), nullable=False, unique=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("user.id"), index=True)
    user = relationship("User", back_populates="refresh_token")
