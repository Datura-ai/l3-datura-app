from pydantic import BaseModel
from uuid import UUID
from datetime import datetime


class CredentialInput(BaseModel):
    credential_name: str
    user_name: str
    password: str


class CredentialOutput(BaseModel):
    id: UUID
    credential_name: str
    created_on: datetime
    account_id: UUID
    created_by: UUID

    class Config:
        orm_mode = True


class CredentialActionOutput(BaseModel):
    success: bool
    message: str
