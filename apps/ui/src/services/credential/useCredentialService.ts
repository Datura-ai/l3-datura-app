import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'

import createCredentialGql from 'gql/credential/createCredential.gql'
import getCredentialsGql from 'gql/credential/getCredentials.gql'
import { CredentialInput } from 'types/credential'


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