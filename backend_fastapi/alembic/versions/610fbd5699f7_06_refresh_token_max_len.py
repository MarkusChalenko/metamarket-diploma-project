"""06_refresh_token_max_len

Revision ID: 610fbd5699f7
Revises: 58870b114124
Create Date: 2024-05-15 11:20:07.250386

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '610fbd5699f7'
down_revision: Union[str, None] = '58870b114124'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('refresh_token', 'refresh_token',
               existing_type=sa.VARCHAR(length=256),
               type_=sa.String(length=1024),
               existing_nullable=False)
    op.drop_index('ix_refresh_token_user_id', table_name='refresh_token')
    op.create_index(op.f('ix_refresh_token_user_id'), 'refresh_token', ['user_id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_refresh_token_user_id'), table_name='refresh_token')
    op.create_index('ix_refresh_token_user_id', 'refresh_token', ['user_id'], unique=True)
    op.alter_column('refresh_token', 'refresh_token',
               existing_type=sa.String(length=1024),
               type_=sa.VARCHAR(length=256),
               existing_nullable=False)
    # ### end Alembic commands ###
