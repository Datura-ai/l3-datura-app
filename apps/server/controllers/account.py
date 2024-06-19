from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.account import AccountModel
from typings.account import AccountInput, AccountOutput, AccountActionOutput
from models.user_account_access import UserAccountAccessModel
from typings.user_account_access import UserAccountAccessDbInput
from models.user_account import UserAccountModel
from typings.user_account import UserAccountInput

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

        db_access = UserAccountAccessDbInput(
            assigned_user_id=auth.user.id,
            assigned_account_id=account.id
        )

        UserAccountAccessModel.create_user_account_access(
            db=db,
            user_account_access=db_access,
            user=auth.user,
            account_id=account.id
        )

        user_account_input = UserAccountInput(
            user_id=auth.user.id,
            account_id=account.id
        )
        UserAccountModel.create_user_account(
            db=db, user_account=user_account_input
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
