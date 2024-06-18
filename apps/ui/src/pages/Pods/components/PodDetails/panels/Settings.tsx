import Box from '@mui/material/Box'
import { ButtonPrimary } from 'components/Button/Button'
import FormikTextField from 'components/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
import { FormikProvider } from 'formik'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import useCreateTemplate from 'pages/template/CreateTemplate/useCreateTemplate'
import { StyledFormInputWrapper } from 'styles/formStyles.css'
import { StyledPanelWrapper } from 'styles/panelStyles.css'

const Settings = () => {
  //temporary use of useCreateTemplate hook
  const { formik, credentials } = useCreateTemplate()

  return (
    <FormikProvider value={formik}>
      <StyledPanelWrapper>
        <StyledFormInputWrapper>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3} alignItems={'center'}>
            <FormikTextField
              name='container_image'
              placeholder={'Container Image'}
              label={'Container Image'}
            />
            <AgentDropdown
              label={'Container Registry Credentials'}
              fieldName={'credential'}
              setFieldValue={formik?.setFieldValue}
              fieldValue={formik.values.credential}
              options={credentials}
              optionSize={'small'}
              size={'small'}
              labelGap={2}
            />
          </Box>

          <Box>
            <TextareaFormik
              setFieldValue={(field: string, value: string) => formik.setFieldValue(field, value)}
              label={'Container Start Command'}
              value={formik.values.container_start_command}
              fieldName={'container_start_command'}
            />
          </Box>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
              <FormikTextField
                name='container_disk'
                placeholder={'Container Disc'}
                label={'Container Disc'}
              />
              {formik.values.compute_type !== 'cpu' && (
                <FormikTextField
                  name='volume_disk'
                  placeholder={'Volume Disc'}
                  label={'Volume Disc'}
                />
              )}
            </Box>
            {formik.values.compute_type !== 'cpu' && (
              <FormikTextField
                name='volume_mount_path'
                placeholder={'Volume Mount Path'}
                label={'Volume Mount Path'}
              />
            )}
          </Box>
          <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
            <FormikTextField
              name='expose_http_ports'
              placeholder={'Expose HTTP Ports (Max 10)'}
              label={'Expose HTTP Ports (Max 10)'}
            />
            <FormikTextField
              name='expose_tcp_ports'
              placeholder={'Expose TCP Ports'}
              label={'Expose TCP Ports'}
            />
          </Box>
        </StyledFormInputWrapper>
      </StyledPanelWrapper>
    </FormikProvider>
  )
}

export default Settings
