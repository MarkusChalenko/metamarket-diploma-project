"""001_role_seeds

Revision ID: 6f351e7ddf79
Revises: 496ea733cbdd
Create Date: 2024-04-30 14:51:05.288566

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '6f351e7ddf79'
down_revision: Union[str, None] = '496ea733cbdd'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    connection = op.get_bind()
    insert_stmt = sa.sql.text(
        "INSERT INTO role (name) VALUES ('Customer'),('Seller'),('Admin')"
    )
    connection.execute(insert_stmt)


def downgrade() -> None:
    connection = op.get_bind()
    delete_stmt = sa.sql.text(
        "DELETE FROM users WHERE name in ('Customer', 'Seller', 'Admin')"
    )
    connection.execute(delete_stmt)
