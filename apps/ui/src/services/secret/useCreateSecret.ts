import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import createSecretGql from 'gql/secret/createSecret.gql'
import { SecretInput } from 'types/secret'

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
                message: error?.message ?? 'Error creating user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createSecret, loading }
}