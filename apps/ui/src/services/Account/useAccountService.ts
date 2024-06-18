import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import createAccountGql from 'gql/account/CreateAccount.gql'
import getAccountsGql from 'gql/account/getAccounts.gql'

export const useCreateAccountService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createAccountGql)

    const createAccount = async (input: any) => {
        try {
            const {
                data: { createAccount },
            } = await mutation({
                variables: {
                    input: input,
                },
            })

            return createAccount
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating Account',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createAccount, loading }
}

export const useGetAccounts = () => {
    const { data, error, loading, refetch } = useQuery(getAccountsGql)

    try {
        if (error) {
            // Handle error here
            console.error("Error fetching user access:", error)
        }
    } catch (error) {
        // Handle any unexpected errors
        console.error("An unexpected error occurred:", error)
    }

    return {
        data: data?.accounts || [],
        error,
        loading,
        refetch,
    }
}