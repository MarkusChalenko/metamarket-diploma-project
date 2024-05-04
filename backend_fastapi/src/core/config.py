""" Module containing the AppSettings class that represents
the application's configuration settings."""
from pydantic import PostgresDsn
from pydantic_core import MultiHostUrl
from pydantic_settings import BaseSettings

from core.logger import LOGGING
from logging import config as logging_config

logging_config.dictConfig(LOGGING)


class AppSettings(BaseSettings):
    """
    Class representing the application's configuration settings and variables.

    Attributes:
        app_port (int): The port on which the application will run. Default value: 8000.
        app_host (str): The host or IP address of the application. Default value: 'app'.
        postgres_dsn (PostgresDsn): The DSN (Data Source Name) for the Postgres database.
        postgres_echo (bool): Flag indicating whether database queries should be echoed.
        debug (bool): Flag indicating debug application mod.
        jwt_secret (str): jwt-secret string to hash data.
        algorithm (str): hashing algorithm.
    """

    app_port: int = 8000
    app_host: str = 'backend'
    postgres_dsn: PostgresDsn = MultiHostUrl(
        'postgresql+asyncpg://postgres:postgres@database:5432/postgres')
    postgres_echo: bool = True
    debug: bool = True
    jwt_secret: str = 'SECRET'
    algorithm: str = 'HS256'
    jwt_access_expire_min: int = 20
    jwt_refresh_expire_dys: int = 30

    class Config:
        _env_file = ".env"
        _extra = 'allow'


app_settings = AppSettings()
