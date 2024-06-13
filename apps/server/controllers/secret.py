from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.secret import SecretModel
from typings.secret import SecretOutput, SecretInput, SecretActionResponse

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

@router.post(
    "",
    response_model=SecretActionResponse,
    status_code=201
)
def create_secret(input: SecretInput, auth: UserAccount = Depends(authenticate)):
    """
    Create a new secret in the database.

    Parameters:
        input (SecretInput): The input data for creating the secret.
        auth (UserAccount): The authenticated user account.

    Returns:
        SecretOutput: The response indicating the success or failure of the secret creation.

    Raises:
        HTTPException: If the secret creation fails.
    """
    try:
        secret = SecretModel.create_secret(
            db=db,
            secret=input,
            user=auth.user,
            account=auth.account
        )

        if not secret:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Secret not created"
            )

        return {
            "success": True,
            "message": "Template created successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
