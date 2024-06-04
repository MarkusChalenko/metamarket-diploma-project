from sqlalchemy import ForeignKey, UniqueConstraint
from sqlalchemy.orm import mapped_column, Mapped, relationship

from .base import Base


class OrderProductAssociation(Base):
    __tablename__ = "order_product_association"
    __table_args__ = (
        UniqueConstraint(
            "order_id",
            "product_id",
            name="idx_unique_order_product",
        ),
    )

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True, index=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("order.id"))
    product_id: Mapped[int] = mapped_column(ForeignKey("product.id"))
    count: Mapped[int] = mapped_column(default=1, server_default="1")
    unit_price: Mapped[int] = mapped_column(default=0, server_default="0")

    # association between Assocation -> Order
    order: Mapped["Order"] = relationship(
        back_populates="products_details",
    )
    # association between Assocation -> Product
    product: Mapped["Product"] = relationship(
        back_populates="orders_details",
    )

