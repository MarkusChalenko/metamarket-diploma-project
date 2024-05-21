from sqlalchemy import Integer, ForeignKey
from sqlalchemy.orm import relationship, mapped_column, Mapped

from .base import Base


class CartItem(Base):
    __tablename__ = "cart_item"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="cart")
    product_id: Mapped[int] = mapped_column(Integer, ForeignKey("product.id"), nullable=False)
    product: Mapped["Product"] = relationship("Product", back_populates="cart_items")
    quantity: Mapped[int] = mapped_column(Integer, default=1)
