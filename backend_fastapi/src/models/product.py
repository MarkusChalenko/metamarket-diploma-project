from _pydecimal import Decimal

from sqlalchemy import Integer, String, Text, Numeric, DateTime, ForeignKey
from sqlalchemy.orm import relationship, Mapped, mapped_column
from datetime import datetime
from enum import Enum

from .base import Base


class ProductStatus(str, Enum):
    available = "available"
    pending = "pending"
    sold = "sold"
    inactive = "inactive"


class Product(Base):
    __tablename__ = "product"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship('User', back_populates='products')
    title: Mapped[str] = mapped_column(String, nullable=False, index=True)
    description: Mapped[str] = mapped_column(Text)
    price: Mapped[Decimal] = mapped_column(Numeric(precision=10, scale=2), nullable=False)
    currency: Mapped[str] = mapped_column(String(8), nullable=False)
    status: Mapped[ProductStatus] = mapped_column(default=ProductStatus.available)
    image_url: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    category_id: Mapped[int] = mapped_column(Integer, ForeignKey("product_category.id"))
    category: Mapped["ProductCategory"] = relationship("ProductCategory", back_populates="products")

    reviews: Mapped["ProductReview"] = relationship("ProductReview", back_populates="product")

    def __repr__(self) -> str:
        return f"<Product(name='{self.name}', price={self.price}, status='{self.status}')>"
