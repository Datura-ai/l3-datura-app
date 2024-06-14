

export interface CredentialInput {
    credential_name: string
    user_name: string
    password: string
}

export interface Credential {
    id: string
    credential_name: string
    user_name: string
    password: string
    created_by: string
    account_id: string
    created_on: Date
}