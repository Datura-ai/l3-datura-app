import * as yup from 'yup'
import { useFormik } from 'formik'
import { useCreateSecretService } from 'services/secret/useSecretService'
import { SecretInput } from 'types/secret'
import { useContext } from 'react'
import { ToastContext } from 'contexts'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
    secret_name: yup
        .string()
        .required('Please enter Secret Name')
        .matches(
            /^[a-zA-Z_][a-zA-Z0-9._-]*$/, 
            'Secret Name must start with a letter or underscore, followed by any combination of alphanumeric characters, dots, dashes, or underscores'
        ),
    secret_value: yup
        .string()
        .required('Please enter Secret value'),
    secret_description: yup
        .string()
})

const useCreateSecret = () => {
    const { setToast } = useContext(ToastContext)
    const navigate = useNavigate()

    const { createSecret, loading: create_secret_loading } = useCreateSecretService()

    const formik = useFormik({
        initialValues: { 
            secret_name: '',
            secret_value: '',
            secret_description: '',
        },
        onSubmit: values => handleSubmit(values),
        validationSchema,
    })

    async function handleSubmit(values: SecretInput) {
        const result = await createSecret(values);

        if(result) {
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })

            if(result.success) {
                navigate(`/secrets`)
            }
        }

    }

    return { 
        formik,
        create_secret_loading
    }
}

export default useCreateSecret