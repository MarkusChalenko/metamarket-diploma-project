from sqlalchemy import Integer, String, Text
from sqlalchemy.orm import mapped_column, Mapped, relationship

from .base import Base


class ProductCategory(Base):
    __tablename__ = "product_category"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    description: Mapped[str] = mapped_column(Text)
    products: Mapped["Product"] = relationship("Product", back_populates="category")
