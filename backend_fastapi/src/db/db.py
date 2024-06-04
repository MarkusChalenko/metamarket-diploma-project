from typing import Union, Callable, Annotated

from fastapi import Depends
from sqlalchemy.ext.asyncio import (async_sessionmaker,
                                    create_async_engine,
                                    AsyncSession, AsyncEngine, AsyncConnection)

from core.config import app_settings


async def get_async_session() -> AsyncSession:
    async with async_session() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise


def create_sessionmaker(
        bind_engine: Union[AsyncEngine, AsyncConnection]
) -> Callable[..., async_sessionmaker]:
    """
        Creates and returns an asynchronous session maker.

        :param bind_engine: Union[AsyncEngine, AsyncConnection]
        :return: Callable[..., async_sessionmaker]
    """
    return async_sessionmaker(
        bind=bind_engine,
        expire_on_commit=False,
        future=True,
        class_=AsyncSession,
        autoflush=False
    )


engine = create_async_engine(app_settings.postgres_dsn.unicode_string(),
                             echo=False)
async_session = create_sessionmaker(engine)
db_dependency = Annotated[AsyncSession, Depends(get_async_session)]
