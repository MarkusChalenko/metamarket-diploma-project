from sqlalchemy import Integer, String
from sqlalchemy.orm import mapped_column, Mapped

from .base import Base


class Role(Base):
    __tablename__ = "role"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
