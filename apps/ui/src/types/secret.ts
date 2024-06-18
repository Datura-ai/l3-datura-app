

export interface SecretInput {
    secret_name: string
    secret_value: string
    secret_description: string
}

export interface Secret {
    id: string
    secret_name: string
    secret_description: string
}