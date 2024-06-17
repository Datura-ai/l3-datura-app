import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { TemplateInput } from 'types/template'
import * as yup from 'yup'
import { useTemplateById, useUpdateTemplateService } from 'services/template/useTemplateService'
import { useGetCredentials } from 'services/credential/useCredentialService'
import { Credential } from 'types/credential'

const validationSchema = yup.object().shape({
  container_image: yup.string().required('Please enter container image'),
  volume_disk: yup.number().nullable(),
  container_disk: yup.number().nullable(),
})

const useEditTemplate = () => {
  const { setToast } = useContext(ToastContext)
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, loading: template_loading } = useTemplateById(id)
  const { updateTemplate, loading: update_template_loading } = useUpdateTemplateService()
  const { data: credentials } = useGetCredentials()

  const templateIsLoading = data?.length === 0 && template_loading

  const initialValues: TemplateInput = {
    name: data?.name || '',
    description: data?.description || '',
    template_visibility: data?.template_visibility || 'private',
    template_type: data?.template_type || 'pod',
    compute_type: data?.compute_type || 'nvidia gpu',
    container_start_command: data?.container_start_command || '',
    container_image: data?.container_image || '',
    container_disk: data?.container_disk || 5,
    volume_disk: data?.volume_disk || '',
    volume_mount_path: data?.volume_mount_path || '',
    expose_http_ports: data?.expose_http_ports || '',
    expose_tcp_ports: data?.expose_tcp_ports || '',
    credential: data?.credential || '',
    environment_variables: {
      env: data?.environment_variables || [],
    },
  }

  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: values => handleSubmit(values),
  })

  async function handleSubmit(values: TemplateInput) {
    const data = {
      ...values,
      environment_variables: {
        env: values.environment_variables.env.filter(i => i.key && i.value),
      },
    }
    const result = await updateTemplate(id, data)

    if (result) {
      setToast({
        message: result.message,
        type: result.success ? 'positive' : 'warning',
        open: true,
      })

      if (result.success) {
        navigate(`/templates`)
      }
    }
  }

  const credentialsList = credentials.map((item: Credential) => ({
    label: item.credential_name,
    value: item.id,
  }))

  return {
    formik,
    update_template_loading,
    credentials: credentialsList,
    templateIsLoading,
  }
}

export default useEditTemplate
