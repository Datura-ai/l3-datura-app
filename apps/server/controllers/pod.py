from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.pod import PodModel
from typings.pod import PodOutput, PodInput, CreatePodOutput
from exceptions import PodNotFoundException

router = APIRouter()


@router.get(
    "",
    response_model=list[PodOutput],
    status_code=200
)
def get_pods(auth: UserAccount = Depends(authenticate)):
    try:
        data = PodModel.get_pods(
            db=db,
            account=auth.account
        )

        data_to_list = [PodOutput.from_orm(pod) for pod in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post(
    "",
    response_model=CreatePodOutput,
    status_code=201
)
def create_pod(input: PodInput, auth: UserAccount = Depends(authenticate)):
    try:
        pod = PodModel.create_pod(
            db=db,
            pod=input,
            user=auth.user,
            account=auth.account
        )

        if not pod:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Pod not created"
            )

        return {
                "success": True,
                "message": "Pod created successfully"
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get(
    "/{pod_id}",
    response_model=PodOutput,
    status_code=200
)
def get_by_id(
    pod_id: str,
    auth: UserAccount = Depends(authenticate)
):
    try:
        pod = PodModel.pod_by_id(
            db=db,
            pod_id=pod_id,
            account=auth.account
        )

        return PodOutput.from_orm(pod)

    except PodNotFoundException:
        raise HTTPException(status_code=404, detail="Pod not found")

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete(
    "/{pod_id}",
    response_model=CreatePodOutput,
    status_code=201
)
def delete_pod(
    pod_id: str,
    auth: UserAccount = Depends(authenticate)
):
    """
    Deletes a pod based on the provided pod_id and authenticated user account.

    Parameters:
        - pod_id (str): The ID of the pod to be deleted.
        - auth (UserAccount, optional): The authenticated user account. Defaults to the result of the authenticate function.

    Returns:
        dict: A dictionary indicating the success of the deletion with keys:
            - success (bool): Indicates if the deletion was successful.
            - message (str): A message indicating the result of the deletion.
    """
    try:
        PodModel.delete_pod(
            db=db,
            pod_id=pod_id,
            account=auth.account
        )

        return {
                "success": True,
                "message": "Pod deleted successfully"
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
