from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.resource import ResourceModel
from typings.resource import ResourceOutput, ResourceInput, ResourceFilterInput
from typing import Optional

router = APIRouter()


@router.get(
    "/{filters}",
    response_model=list[ResourceOutput],
    status_code=200
)
def get_resources(filters: str):
    """_summary_

    Raises:
        HTTPException: _description_

    Returns:
        _type_: _description_
    """
    try:
        print('filters', filters)
        data = ResourceModel.get_resources(db=db, filters={})

        data_to_list = [ResourceOutput.from_orm(resource) for resource in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post(
    "",
    # response_model=list[PodOutput],
    status_code=201
)
def create_resource(input: ResourceInput):
    """_summary_

    Args:
        input (ResourceInput): _description_

    Raises:
        HTTPException: _description_
        HTTPException: _description_

    Returns:
        _type_: _description_
    """
    try:
        resource = ResourceModel.create_resource(
            db=db,
            resource=input,
        )

        if not resource:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Pod not created"
            )

        return {
                "success": True,
                "message": "Resource created successfully"
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
