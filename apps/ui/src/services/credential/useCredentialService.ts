import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import createCredentialGql from 'gql/credential/createCredential.gql'
import getCredentialsGql from 'gql/credential/getCredentials.gql'
import deleteCredentialGql from 'gql/credential/deleteCredential.gql'
import updateCredentialGql from 'gql/credential/updateCredential.gql'
import { CredentialInput } from 'types/credential'


/**
 * Returns an object with a function to create a credential and a boolean indicating if the mutation is currently loading.
 *
 * @param {CredentialInput} input - The input data for creating the credential.
 * @return {Promise<{ message: string; success: boolean }>} An object containing a message string and a boolean indicating the success of the creation.
 */
export const useCreateCredentialService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createCredentialGql)

    const createCredential = async (input: CredentialInput): Promise<{ message: string; success: boolean }> => {
        try {
            const {
                data: { createCredential },
            } = await mutation({
                variables: {
                    input: input,
                },
            })

            return createCredential
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating Credential',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createCredential, loading }
}


/**
 * A hook that provides a function to fetch credentials.
 *
 * @return {Object} An object containing the fetched credentials, any error that occurred, a boolean indicating if the data is still loading, and a function to refetch the data.
 */
export const useGetCredentials = () => {
    const { data, error, loading, refetch } = useQuery(getCredentialsGql, {
        fetchPolicy: 'cache-first',
    })

    return {
        data: data?.getCredentials || [],
        error,
        loading,
        refetch,
    }
}

/**
 * Returns an object with a function to delete a credential and a boolean indicating if the mutation is currently loading.
 *
 * @return {Object} An object containing a function to delete a credential and a boolean indicating if the mutation is currently loading.
 */
export const useDeleteCredentialService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(deleteCredentialGql)

    const deleteCredential = async (secret_id: string | undefined): Promise<{ message: string; success: boolean }> => {
        try {
            const {
                data: { deleteCredential },
            } = await mutation({
                variables: {
                    secret_id
                },
            })

            return deleteCredential
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error deleting Credential',
                type: 'negative',
                open: true,
            })
            throw error;
        }
    }

    return { deleteCredential, loading }
}

/**
 * Returns an object with a function to update a credential and a boolean indicating if the mutation is currently loading.
 *
 * @param {string | undefined} credential_id - The ID of the credential to update.
 * @param {CredentialInput} input - The input data for updating the credential.
 * @return {Promise<{ message: string; success: boolean }>} An object containing a message string and a boolean indicating the success of the update.
 */
export const useUpdateCredentialService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(updateCredentialGql)

    const updateCredential = async (credential_id: string | undefined, input: CredentialInput): Promise<{ message: string; success: boolean }> => {
        try {
            const {
                data: { updateCredential },
            } = await mutation({
                variables: {
                    credential_id,
                    input: input,
                },
            })

            return updateCredential
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error updating Credential',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { updateCredential, loading }
}