from datetime import datetime
from enum import Enum

from sqlalchemy import ForeignKey, Integer, Numeric, DateTime
from sqlalchemy.orm import relationship, mapped_column, Mapped
from sqlalchemy.sql import func

from .base import Base


class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"
    REFUNDED = "refunded"


class Order(Base):
    __tablename__ = "order"

    id: Mapped[int] = mapped_column(Integer, autoincrement=True, primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey("user.id"), nullable=False)
    user: Mapped["User"] = relationship("User", back_populates="orders")
    total_amount: Mapped[float] = mapped_column(Numeric(precision=10, scale=2), default=0)
    status: Mapped[OrderStatus] = mapped_column(default=OrderStatus.PENDING)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=func.now())

    products_details: Mapped[list["OrderProductAssociation"]] = relationship(
        "OrderProductAssociation",
        back_populates="order",
    )
