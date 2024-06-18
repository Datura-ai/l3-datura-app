from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.account import AccountModel
from typings.account import AccountInput, AccountOutput, AccountActionOutput

router = APIRouter()


@router.post("/", status_code=200, response_model=AccountActionOutput)
def create_account(
    input: AccountInput,
    auth: UserAccount = Depends(authenticate)
):
    try:
        account = AccountModel.create_account(
            db=db,
            input=input,
            user=auth.user
        )

        if not account:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Account not created"
            )

        return {
                "success": True,
                "message": "Account created successfully"
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/", status_code=201)
def get_accounts(
    auth: UserAccount = Depends(authenticate)
):
    try:
        data = AccountModel.get_accounts(
            db=db,
            user=auth.user
        )

        data_to_list = [AccountOutput.from_orm(account) for account in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
