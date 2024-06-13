from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.secret import SecretModel
from typings.secret import SecretOutput, SecretInput

router = APIRouter()


@router.get(
    "",
    response_model=list[SecretOutput],
    status_code=200
)
def get_secrets(auth: UserAccount = Depends(authenticate)):
    """
    Get all secrets associated with the authenticated user account.

    Parameters:
        auth (UserAccount): The authenticated user account.

    Returns:
        List[SecretOutput]: A list of SecretOutput objects representing the secrets.

    Raises:
        HTTPException: If there is an error retrieving the secrets.
    """

    try:
        data = SecretModel.get_secrets(
            db=db,
            account=auth.account
        )

        data_to_list = [SecretOutput.from_orm(secret) for secret in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
