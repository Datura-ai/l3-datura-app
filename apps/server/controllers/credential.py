from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.credential import CredentialModel
from typings.credential import (
    CredentialOutput,
    CredentialInput,
    CredentialActionOutput
)

router = APIRouter()


@router.get("", response_model=CredentialOutput, status_code=200)
def get_credentials(auth: UserAccount = Depends(authenticate)):
    """
    Get all credentials associated with the authenticated user account.

    Parameters:
        auth (UserAccount): The authenticated user account.

    Returns:
        CredentialOutput: A list of CredentialOutput objects representing the credentials.

    Raises:
        HTTPException: If there is an error retrieving the credentials.
    """

    try:
        data = CredentialModel.get_credentials(db=db, account=auth.account)

        data_to_list = [CredentialOutput.from_orm(credential) for credential in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("", response_model=CredentialActionOutput, status_code=201)
def create_credential(
    input: CredentialInput,
    auth: UserAccount = Depends(authenticate)
):
    """
    Create a new credential for the authenticated user account.

    Parameters:
        input (CredentialInput): The input data for creating the credential.
        auth (UserAccount): The authenticated user account.

    Returns:
        dict: A dictionary with the following keys:
            - success (bool): Indicates if the credential was created successfully.
            - message (str): A message indicating the result of the operation.

    Raises:
        HTTPException: If there is an error creating the credential.
    """
    try:
        credential = CredentialModel.create_credential(
            db=db,
            credential=input,
            account=auth.account
        )

        if not credential:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Credential not created"
            )

        return {
            "success": True,
            "message": "Credential created successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete(
    "/{credential_id}",
    response_model=CredentialActionOutput,
    status_code=201
)
def delete_credential(
    credential_id: str,
    auth: UserAccount = Depends(authenticate)
):
    """
    A function to delete a credential based on the given credential ID.

    Parameters:
        credential_id (str): The ID of the credential to be deleted.
        auth (UserAccount, optional): The authenticated user account. Defaults to the result of the authenticate function.

    Returns:
        dict: A dictionary with keys:
            - success (bool): Indicates if the credential was deleted successfully.
            - message (str): A message indicating the result of the deletion.

    Raises:
        HTTPException: If there is an error during the deletion process.
    """
    try:
        CredentialModel.delete_credential(
            db=db,
            credential_id=credential_id,
            account=auth.account
        )

        return {
            "success": True,
            "message": "Credential deleted successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.put(
    "/{credential_id}",
    response_model=CredentialActionOutput,
    status_code=201
)
def update_credential(
    credential_id: str,
    input: CredentialInput,
    auth: UserAccount = Depends(authenticate)
):
    """
    Update a credential with the given ID.

    Parameters:
        credential_id (str): The ID of the credential to update.
        input (CredentialInput): The updated credential data.
        auth (UserAccount, optional): The authenticated user account. Defaults to the result of the authenticate function.

    Returns:
        CredentialActionOutput: A dictionary with keys:
            - success (bool): Indicates if the credential was updated successfully.
            - message (str): A message indicating the result of the update.

    Raises:
        HTTPException: If there is an error during the update process.
    """
    try:
        CredentialModel.update_credential(
            db=db,
            credential_id=credential_id,
            input=input,
            user=auth.user,
            account=auth.account
        )

        return {
            "success": True,
            "message": "Credential updated successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
