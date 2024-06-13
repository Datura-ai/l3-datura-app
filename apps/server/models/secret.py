from models.base_model import BaseModel
from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    ForeignKey,
    or_,
    String,
    DateTime
)
from sqlalchemy.orm import Session, relationship
import uuid
from datetime import datetime
from typings.secret import SecretInput
from exceptions import SecretNotFoundException


class SecretModel(BaseModel):

    __tablename__ = "secret"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    secret_description = Column(String, nullable=True)
    secret_name = Column(String, nullable=False)
    secret_value = Column(String, nullable=False)
    last_retrieved_on = Column(
        DateTime(timezone=True),
        default=datetime.utcnow,
        nullable=False
    )

    is_deleted = Column(Boolean, default=False, index=True)
    account_id = Column(
        UUID, ForeignKey("account.id", ondelete="CASCADE"), nullable=True
    )
    created_by = Column(
        UUID,
        ForeignKey("user.id", name="fk_created_by", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    modified_by = Column(
        UUID,
        ForeignKey("user.id", name="fk_modified_by", ondelete="CASCADE"),
        nullable=True,
        index=True,
    )
    creator = relationship(
        "UserModel",
        foreign_keys=[created_by],
        lazy="select"
    )
    account = relationship(
        "AccountModel",
        foreign_keys=[account_id],
        lazy="select"
    )

    @classmethod
    def update_model_from_input(
        cls,
        secret_model: "SecretModel",
        secret_input: SecretInput
    ):
        for field in SecretInput.__annotations__.keys():
            if hasattr(secret_model, field):
                setattr(secret_model, field, getattr(
                    secret_input,
                    field
                ))

    @classmethod
    def create_secret(
        cls,
        db: Session,
        secret: SecretInput,
        user,
        account
    ):
        """
        Creates a secret in the database based on the provided input parameters.

        Args:
            db: The database session.
            secret: The input data for the secret.
            user: The user creating the secret.
            account: The account associated with the secret.

        Returns:
            The created secret model object.
        """

        db_secret = SecretModel(
            created_by=user.id,
            account_id=account.id
        )

        cls.update_model_from_input(
            db_secret,
            secret
        )

        db.session.add(db_secret)
        db.session.flush()
        db.session.commit()

        return db_secret

    @classmethod
    def get_secrets(cls, db, account):
        """
        Retrieves a list of secrets associated with a given account.

        Args:
            db (Session): The database session object.
            account (AccountModel): The account for which to retrieve the secrets.

        Returns:
            List[SecretModel]: A list of SecretModel objects representing the secrets associated with the account.
        """

        secrets = (
            db.session.query(SecretModel)
            .filter(
                SecretModel.account_id == account.id,
                or_(
                    or_(
                        SecretModel.is_deleted.is_(False),
                        SecretModel.is_deleted is None,
                    ),
                    SecretModel.is_deleted is None,
                ),
            )
            .order_by(SecretModel.created_on.desc())
            .all()
        )

        return secrets

    @classmethod
    def secret_by_id(cls, db, secret_id: str, account):
        """
        Retrieves a secret based on the provided secret_id and account.

        Args:
            db: The database session object.
            secret_id: The unique identifier of the secret.
            account: The account object associated with the secret.

        Returns:
            The SecretModel object representing the retrieved secret.
        """

        secret = (
            db.session.query(SecretModel)
            .filter(
                SecretModel.id == secret_id,
                SecretModel.account_id == account.id,
                or_(
                    or_(
                        SecretModel.is_deleted.is_(False),
                        SecretModel.is_deleted is None,
                    ),
                    SecretModel.is_deleted is None,
                ),
            )
            .first()
        )

        return secret

    @classmethod
    def delete_secret_by_id(
        cls,
        db,
        secret_id: str,
        account
    ):
        """
        Deletes a secret by its ID and account.

        Args:
            db (Session): The database session object.
            secret_id (str): The ID of the secret to delete.
            account: The account associated with the secret.

        Raises:
            SecretNotFoundException: If the secret is not found or is already deleted.

        Returns:
            None
        """

        secret = (
            db.session.query(SecretModel)
            .filter(
                SecretModel.id == secret_id,
                SecretModel.account_id == account.id
            )
            .first()
        )

        if not secret or secret.is_deleted:
            raise SecretNotFoundException("secret not found")

        secret.is_deleted = True
        db.session.commit()
