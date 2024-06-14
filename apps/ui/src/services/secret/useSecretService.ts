import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import { SecretInput } from 'types/secret'
import createSecretGql from 'gql/secret/createSecret.gql'
import getSecretsGql from 'gql/secret/getSecrets.gql'
import secretByIdGql from 'gql/secret/secretById.gql'
import deleteSecretGql from 'gql/secret/deleteSecret.gql'

export const useCreateSecretService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createSecretGql)

    const createSecret = async (input: SecretInput) => {
        try {
            const {
                data: { createSecret },
            } = await mutation({
                variables: {
                    input: input,
                },
            })

            return createSecret
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating Secret',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createSecret, loading }
}

export const useGetSecrets = () => {
    const { data, error, loading, refetch } = useQuery(getSecretsGql, {
        fetchPolicy: 'cache-first',
    })

    return {
        data: data?.getSecrets || [],
        error,
        loading,
        refetch,
    }
}

export const useGetSecretById = (id: string | undefined) => {
    const { data, error, loading, refetch } = useQuery(secretByIdGql, {
        fetchPolicy: 'cache-first',
        variables: { secret_id: id },
    })

    return {
        data: data?.secretById || [],
        error,
        loading,
        refetch,
    }
}

export const useDeleteSecretService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(deleteSecretGql)

    const deleteSecret = async (secret_id: string | undefined) => {
        try {
            const {
                data: { deleteSecret },
            } = await mutation({
                variables: {
                    secret_id
                },
            })

            return deleteSecret
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error deleting Secret',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { deleteSecret, loading }
}