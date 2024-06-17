from fastapi_sqlalchemy import db
from fastapi import APIRouter, Depends, HTTPException, status
from utils.auth import authenticate
from typings.auth import UserAccount
from models.template import TemplateModel
from typings.template import (
    TemplateOutput,
    TemplateInput,
    CreateTemplateOutput
)
from exceptions import TemplateNotFoundException

router = APIRouter()


@router.get(
    "",
    response_model=list[TemplateOutput],
    status_code=200
)
def get_templates(auth: UserAccount = Depends(authenticate)):
    """
    Retrieves a list of templates associated with the authenticated user's account.

    Parameters:
        auth (UserAccount): The authenticated user's account.

    Returns:
        list[TemplateOutput]: A list of TemplateOutput objects representing the templates.

    Raises:
        HTTPException: If an error occurs while retrieving the templates, with a status code of 500 and the error message as the detail.
    """
    try:
        data = TemplateModel.get_templates(
            db=db,
            account=auth.account
        )

        data_to_list = [TemplateOutput.from_orm(template) for template in data]

        return data_to_list
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.post(
    "",
    response_model=CreateTemplateOutput,
    status_code=201
)
def create_template(
        input: TemplateInput,
        auth: UserAccount = Depends(authenticate)):
    """
    Create a new template in the database.

    Args:
        input (TemplateInput): The input data for creating the template.
        auth (UserAccount, optional): The authenticated user account. Defaults to the result of the `authenticate` function.

    Returns:
        CreateTemplateOutput: The response indicating the success or failure of the template creation.

    Raises:
        HTTPException: If the template creation fails.
    """
    try:
        pod = TemplateModel.create_template(
            db=db,
            template=input,
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
                "message": "Template created successfully",
                "id": pod.id
            }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.delete(
    "/{template_id}",
    response_model=CreateTemplateOutput,
    status_code=201
)
def delete_template(
    template_id: str,
    auth: UserAccount = Depends(authenticate)
):
    """
    A function to delete a template by its ID with authentication.
    
    Args:
        template_id (str): The ID of the template to delete.
        auth (UserAccount): User account object obtained from authentication.

    Returns:
        dict: A dictionary indicating the success or failure of the deletion.
    """
    try:

        TemplateModel.delete_template_by_id(
            db=db,
            template_id=template_id,
            account=auth.account
        )

        return {"success": True, "message": "Template successfully deleted"}

    except TemplateNotFoundException:
        raise HTTPException(status_code=404, detail="Template not found")

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get(
    "/{template_id}",
    response_model=TemplateOutput,
    status_code=200
)
def get_template_by_id(
    template_id: str,
    auth: UserAccount = Depends(authenticate)
):
    """
    A function to get a template by its ID with authentication.

    Args:
        template_id (str): The ID of the template to retrieve.
        auth (UserAccount): User account object obtained from authentication.

    Returns:
        TemplateOutput: The template object.
    """
    try:
        template = TemplateModel.get_template_by_id(
            db=db,
            template_id=template_id,
            account=auth.account
        )

        return TemplateOutput.from_orm(template)

    except TemplateNotFoundException:
        raise HTTPException(status_code=404, detail="Template not found")
    
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.put(
    "/{template_id}",
    response_model=CreateTemplateOutput,
    status_code=200
)
def update_template(
    template_id: str,
    input: TemplateInput,
    auth: UserAccount = Depends(authenticate)
):
    """
    A function to update a template by its ID with authentication.

    Args:
        template_id (str): The ID of the template to update.
        input (TemplateInput): The input data for updating the template.
        auth (UserAccount): User account object obtained from authentication.

    Returns:
        TemplateOutput: The updated template object.
    """
    try:
        TemplateModel.update_template(
            db=db,
            template_id=template_id,
            input=input,
            user=auth.user,
            account=auth.account
        )

        return {
                'success': True,
                'message': 'Template successfully updated'
            }

    except TemplateNotFoundException:
        raise HTTPException(status_code=404, detail="Template not found")

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
