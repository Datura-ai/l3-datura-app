import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateTemplateService } from 'services/template/useTemplateService'
import { TemplateInput } from 'types/template'

const validationSchema = yup.object().shape({
    container_image: yup.string().required('Please enter container image'),
    volume_disk: yup.number().nullable(),
    container_disk: yup.number().nullable(),
})


const useCreateTemplate = () => {
    const { setToast } = useContext(ToastContext)
    const navigate = useNavigate()

    const { createTemplate, loading: create_template_loading } = useCreateTemplateService()

    const formik = useFormik({
        initialValues: { 
            name: '',
            description: '',
            template_visibility: 'private',
            template_type: 'pod',
            compute_type: 'nvidia gpu',
            container_start_command: '',
            container_image: '',
            container_disk: 5,
            volume_disk: '',
            volume_mount_path: '',
            expose_http_ports: '',
            expose_tcp_ports: '',
            environment_variables: {
                env: []
            },
        },
        validationSchema: validationSchema,
        onSubmit: values => handleSubmit(values),
      })

    async function handleSubmit(values: TemplateInput) {
        const data = {
            ...values,
            environment_variables: {
                env: values.environment_variables.env.filter(i => i.key && i.value)
            }
        }
        const result = await createTemplate(data)

        if(result) {
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })

            if(result.success) {
                navigate(`/templates`)
            }
        }
    }

    return {
        formik,
        create_template_loading,
    }
}

export default useCreateTemplate