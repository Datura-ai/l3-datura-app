import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'

import createCredentialGql from 'gql/credential/createCredential.gql'
import getCredentialsGql from 'gql/credential/getCredentials.gql'
import deleteCredentialGql from 'gql/credential/deleteCredential.gql'
import { CredentialInput } from 'types/credential'


/**
 * A hook that provides a function to create a credential.
 *
 * @param {CredentialInput} input - The input data for creating the credential.
 * @return {Promise<any>} The created credential data.
 */
export const useCreateCredentialService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createCredentialGql)

    const createCredential = async (input: CredentialInput) => {
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
 * A hook that provides a function to delete a credential.
 *
 * @return {{ deleteCredential: (secret_id: string | undefined) => Promise<any>, loading: boolean }} An object with two properties:
 *   - deleteCredential: A function that takes a secret_id and returns a Promise that resolves to the deleted credential.
 *   - loading: A boolean indicating whether the mutation is currently loading.
 *
 * @throws {Error} If there is an error deleting the credential.
 */
export const useDeleteCredentialService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(deleteCredentialGql)

    const deleteCredential = async (secret_id: string | undefined) => {
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