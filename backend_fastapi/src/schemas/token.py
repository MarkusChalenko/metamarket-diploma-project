from pydantic import BaseModel


class Tokens(BaseModel):
    access_token: str
    refresh_token: str
    type: str

