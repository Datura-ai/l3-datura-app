import * as yup from 'yup'
import { useFormik } from 'formik'
import { useUpdateCredentialService } from 'services/credential/useCredentialService'
import { Credential, CredentialInput } from 'types/credential'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useModal } from 'hooks'

const validationSchema = yup.object().shape({
    credential_name: yup
        .string()
        .required('Please enter Credential Name'),
    user_name: yup
        .string()
        .required('Please enter User Name'),
    password: yup
        .string()
        .required('Please enter Password'),
})

export interface ModalProps {
    refetch: () => void
    credential: Pick<Credential, 'credential_name' | 'id'>
}

const useUpdateCredential = ({ refetch, credential }: ModalProps) => {
    const { closeModal } = useModal()
    const { setToast } = useContext(ToastContext)
    const { updateCredential, loading: update_credential_loading } = useUpdateCredentialService()

    const formik = useFormik({
        initialValues: { 
            credential_name: credential.credential_name,
            user_name: '',
            password: '',
        },
        onSubmit: values => handleSubmit(values),
        validationSchema,
    })

    async function handleSubmit(values: CredentialInput) {
        const result = await updateCredential(credential.id, values);

        if(result) {
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })

            if(result.success) {
                refetch()
                closeModal('update-credential-modal')
            }
        }

    }

    return {
        formik,
        update_credential_loading,
        closeModal
    }
}

export default useUpdateCredential