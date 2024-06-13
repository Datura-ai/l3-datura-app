import { ToastContext } from "contexts"
import { useFormik } from "formik"
import React, { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { TemplateInput } from "types/template"
import * as yup from 'yup'
import { useTemplateById, useUpdateTemplateService } from 'services/template/useTemplateService'

const validationSchema = yup.object().shape({
    container_image: yup.string().required('Please enter container image'),
    volume_disk: yup.number().nullable(),
    container_disk: yup.number().nullable(),
})

const initialValues: TemplateInput = {
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
}

const useEditTemplate = () => {
    const { setToast } = useContext(ToastContext)
    const navigate = useNavigate()
    const { id } = useParams()

    const { data, loading: template_loading } = useTemplateById(id)
    const { updateTemplate, loading: update_template_loading } = useUpdateTemplateService()

    const formik = useFormik({
        initialValues: { 
            ...initialValues
        },
        validationSchema: validationSchema,
        onSubmit: values => handleSubmit(values),
    })

    React.useEffect(() => {
        if(data && !template_loading) {
            formik.setValues({
                name: data.name,
                description: data.description,
                template_visibility: data.template_visibility,
                template_type: data.template_type,
                compute_type: data.compute_type,
                container_start_command: data.container_start_command,
                container_image: data.container_image,
                container_disk: data.container_disk,
                volume_disk: data.volume_disk,
                volume_mount_path: data.volume_mount_path,
                expose_http_ports: data.expose_http_ports,
                expose_tcp_ports: data.expose_tcp_ports,
                environment_variables: data.environment_variables,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, template_loading])

    async function handleSubmit(values: TemplateInput) {
        const data = {
            ...values,
            environment_variables: {
                env: values.environment_variables.env.filter(i => i.key && i.value)
            }
        }
        const result = await updateTemplate(id, data)

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
        update_template_loading,
    }
}

export default useEditTemplate