from pydantic import BaseModel, validator
from typing import Optional
from uuid import UUID
from datetime import datetime
import re


class SecretInput(BaseModel):
    secret_name: str
    secret_description: Optional[str]
    secret_value: str

    @validator('secret_name')
    def validate_secret_name(cls, value):
        pattern = r'^[A-Za-z_][A-Za-z0-9._-]*$'
        if not re.match(pattern, value):
            raise ValueError('Secret Name must start with a letter or underscore, followed by any combination of alphanumeric characters, dots, dashes, or underscores')
        return value


class SecretOutput(SecretInput):
    id: UUID
    secret_name: str
    last_retrieved_At: datetime
    secret_description: Optional[str]
    account_id: UUID
    created_by: UUID
    modified_by: Optional[UUID]
    created_on: datetime

    class Config:
        orm_mode = True
