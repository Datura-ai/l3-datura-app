import { useQuery, useMutation } from '@apollo/client'
import { ToastContext } from 'contexts'
import { useContext } from 'react'
import getTemplatesGql from 'gql/template/getTemplates.gql'
import createTemplateGql from 'gql/template/createTemplate.gql'
import deleteTemplateGql from 'gql/template/deleteTemplate.gql'
import templateByIdGql from 'gql/template/templateById.gql'
import updateTemplateGql from 'gql/template/updateTemplate.gql'
import { Template, TemplateInput } from 'types/template'


export const useGetTemplates = () => {
    const { data, error, loading, refetch } = useQuery(getTemplatesGql)

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
        data: data?.getTemplates || [],
        error,
        loading,
        refetch,
    }
}

export const useCreateTemplateService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(createTemplateGql)

    const createTemplate = async (input: TemplateInput) => {
        try {
            const {
                data: { createTemplate },
            } = await mutation({
                variables: {
                    input: input,
                },
            })

            return createTemplate
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { createTemplate, loading }
}

export const useDeleteTemplateService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(deleteTemplateGql)

    const deleteTemplate = async (template_id: string) => {
        try {
            const {
                data: { deleteTemplate },
            } = await mutation({
                variables: {
                    template_id
                },
            })

            return deleteTemplate
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error deleting user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { deleteTemplate, loading }
}


export const useTemplateById = (template_id: string | undefined) => {
    const { data, error, loading, refetch } = useQuery(templateByIdGql, {
        variables: { template_id },
    })

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
        data: data?.templateById || [],
        error,
        loading,
        refetch,
    }
}

export const useUpdateTemplateService = () => {
    const { setToast } = useContext(ToastContext)
    const [mutation, { loading }] = useMutation(updateTemplateGql)

    const updateTemplate = async (template_id: string | undefined, input: TemplateInput) => {
        try {
            const {
                data: { updateTemplate },
            } = await mutation({
                variables: {
                    template_id,
                    input: input,
                },
            })

            return updateTemplate
        } catch (error) {
            setToast({
                message: error?.message ?? 'Error creating user access',
                type: 'negative',
                open: true,
            })
            throw error; // Rethrow the error to propagate it to the caller
        }
    }

    return { updateTemplate, loading }
}