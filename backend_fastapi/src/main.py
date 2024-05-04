"""Project entrypoint"""
import multiprocessing

import uvicorn
from fastapi import FastAPI
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware

from api.v1.auth import auth_router
from api.v1.user import user_router
from services.auth import user_dependency
from core.config import app_settings


# @asynccontextmanager
# async def lifespan(app: FastAPI) -> AsyncContextManager[None]:
#     redis = RedisCacheBackend(
#         f'redis://{app_settings.redis_host}:{app_settings.redis_port}'
#     )
#     caches.set(CACHE_KEY, redis)
#     try:
#         yield
#     finally:
#         await close_caches()


app = FastAPI(
    # lifespan=lifespan,
    title="Marketplace_backend",
    docs_url="/api/openapi",
    openapi_url="/api/openapi.json",
    default_response_class=ORJSONResponse,
    redoc_url=None
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)


app.include_router(auth_router)
app.include_router(user_router)


@app.get("/ping")
def root(user: user_dependency) -> str:
    """root route"""
    return "pong"


if __name__ == '__main__':
    options = {
        "host": f'{app_settings.app_host}',
        "port": app_settings.app_port,
        "workers": multiprocessing.cpu_count(),
        "reload": app_settings.debug,
    }

    print(options)
    uvicorn.run(
        'main:app',
        **options
    )
