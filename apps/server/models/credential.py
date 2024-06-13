from models.base_model import BaseModel
from sqlalchemy import (
    UUID,
    Boolean,
    Column,
    ForeignKey,
    or_,
    String,
)
from sqlalchemy.orm import Session, relationship
import uuid
import hashlib
import binascii
import os
from typings.credential import CredentialInput
from exceptions import CredentialNotFoundException


class CredentialModel(BaseModel):

    __tablename__ = "credential"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    secret_name = Column(String, nullable=False)
    user_name = Column(String, nullable=False)
    password = Column(String, nullable=False)

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
    def hash_password(cls, password):
        """Hash a password for storing."""
        salt = hashlib.sha256(os.urandom(60)).hexdigest().encode("ascii")
        pwdhash = hashlib.pbkdf2_hmac("sha512", password.encode("utf-8"), salt, 100000)
        pwdhash = binascii.hexlify(pwdhash)
        return (salt + pwdhash).decode("ascii")

    @classmethod
    def update_model_from_input(
        cls,
        credential_model: "CredentialModel",
        credential_input: CredentialInput
    ):
        for field in CredentialInput.__annotations__.keys():
            if hasattr(credential_model, field):
                setattr(credential_model, field, getattr(
                    credential_input,
                    field
                ))

    @classmethod
    def create_credential(
        cls,
        db: Session,
        credential: CredentialInput,
        user,
        account
    ):
        """
        Creates a new credential in the database based on the provided input parameters.

        Args:
            db (Session): The database session object.
            credential (CredentialInput): The input data for the credential.
            user (User): The user creating the credential.
            account (Account): The account associated with the credential.

        Returns:
            CredentialModel: The newly created credential.
        """

        db_credential = CredentialModel(
            created_by=user.id,
            account_id=account.id
        )

        credential.password = cls.hash_password(credential.password)

        cls.update_model_from_input(
            db_credential,
            credential
        )

        db.session.add(db_credential)
        db.session.flush()
        db.session.commit()

        return db_credential

    @classmethod
    def credential_by_id(cls, db, credential_id: str, account):
        """
        Retrieves a secret based on the provided secret_id and account.

        Args:
            db: The database session object.
            secret_id: The unique identifier of the secret.
            account: The account object associated with the secret.

        Returns:
            The SecretModel object representing the retrieved secret.
        """

        credential = (
            db.session.query(CredentialModel)
            .filter(
                CredentialModel.id == credential_id,
                CredentialModel.account_id == account.id,
                or_(
                    or_(
                        CredentialModel.is_deleted.is_(False),
                        CredentialModel.is_deleted is None,
                    ),
                    CredentialModel.is_deleted is None,
                ),
            )
            .first()
        )

        return credential

    @classmethod
    def update_credential(
        cls, db, credential_id, input: CredentialInput, user, account
    ):
        """
        Updates a credential in the database with the provided input parameters.

        Args:
            db: The database session object.
            credential_id: The ID of the credential to be updated.
            input: The new data for the credential.
            user: The user updating the credential.
            account: The account associated with the credential.

        Returns:
            The updated CredentialModel object.
        """

        old_credential = cls.credential_by_id(
            db=db,
            credential_id=credential_id,
            account=account
        )

        if not old_credential:
            raise CredentialNotFoundException("Credential not found")

        for field in CredentialInput.__annotations__.keys():
            if hasattr(input, field):
                setattr(old_credential, field, getattr(input, field))

        old_credential.modified_by = user.id
        old_credential.password = cls.hash_password(input.password)

        db.session.add(old_credential)
        db.session.commit()

        return old_credential

    @classmethod
    def delete_credential(
        cls,
        db,
        credential_id: str,
        account
    ):
        """
        Deletes a credential by its ID and account.

        Args:
            db (Session): The database session object.
            credential_id (str): The ID of the credential to be deleted.
            account: The account associated with the credential.

        Raises:
            CredentialNotFoundException: If the credential is not found or is already deleted.

        Returns:
            None
        """

        credential = (
            db.session.query(CredentialModel)
            .filter(
                CredentialModel.id == credential_id,
                CredentialModel.account_id == account.id
            )
            .first()
        )

        if not credential or credential.is_deleted:
            raise CredentialNotFoundException("Credential not found")

        credential.is_deleted = True
        db.session.commit()

    @classmethod
    def get_credentials(cls, db, account):
        """
        Retrieves all credentials associated with a given account.

        Args:
            db (Session): The database session object.
            account (AccountModel): The account for which to retrieve the credentials.

        Returns:
            List[CredentialModel]: A list of CredentialModel objects representing the credentials associated with the account.
        """

        credentials = (
            db.session.query(CredentialModel)
            .filter(
                CredentialModel.account_id == account.id,
                or_(
                    or_(
                        CredentialModel.is_deleted.is_(False),
                        CredentialModel.is_deleted is None,
                    ),
                    CredentialModel.is_deleted is None,
                ),
            )
            .order_by(CredentialModel.created_on.desc())
            .all()
        )

        return credentials
