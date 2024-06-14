import React from 'react'
import { StyledFormInputWrapper } from 'styles/formStyles.css'
import AgentDropdown from 'pages/Agents/AgentForm/components/AgentDropdown'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Box from '@mui/material/Box'
import FormikTextField from 'components/TextFieldFormik'
import TextareaFormik from 'components/TextareaFormik'
// eslint-disable-next-line import/no-extraneous-dependencies
import LockIcon from '@mui/icons-material/Lock'
// eslint-disable-next-line import/no-extraneous-dependencies
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
// eslint-disable-next-line import/no-extraneous-dependencies
import LockOpenIcon from '@mui/icons-material/LockOpen'

import EnvVariables from './EnvVariables'

const black = '#000000'
const white = 'rgb(255, 255, 255)'

interface TemplateFormProps {
    formik: any
    label: string
    credentials: {
        label: string
        value: string
    }[]
}

const TemplateForm = ({ formik, label, credentials }: TemplateFormProps) => {
    const [env_is_open, setEnvIsOpen] = React.useState(false)
    return (
        <StyledFormInputWrapper>
            <Typography fontSize={20} fontWeight={600}>
                {label}
            </Typography>
            <Box display={'grid'} gridTemplateColumns={'1fr .3fr .3fr'} gap={3} alignItems={'center'}>
                <FormikTextField name='name' placeholder={'Template name'} label={'Name'} />
                <AgentDropdown
                    label={'Template Type'}
                    fieldName={'template_type'}
                    setFieldValue={formik?.setFieldValue}
                    fieldValue={formik.values.template_type}
                    options={[{ label: 'Pod', value: 'pod' }, { label: 'Serverless', value: 'serverless' }]}
                    optionSize={'small'}
                    size={'small'}
                    labelGap={2}
                />
                <AgentDropdown
                    label={'Compute Type'}
                    fieldName={'compute_type'}
                    setFieldValue={formik?.setFieldValue}
                    fieldValue={formik.values.compute_type}
                    options={[
                        { label: 'Nvidia GPU', value: 'nvidia gpu' }, 
                        { label: 'Amd GPU', value: 'amd gpu' }, 
                        { label: 'CPU', value: 'cpu' }, 
                    ]}
                    optionSize={'small'}
                    size={'small'}
                    labelGap={2}
                />
            </Box>

            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3} alignItems={'center'}>
                <FormikTextField name='container_image' placeholder={'Container Image'} label={'Container Image'} />
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
                    <FormikTextField name='container_disk' placeholder={'Container Disc'} label={'Container Disc'} />
                    {formik.values.compute_type !== 'cpu' && 
                        <FormikTextField name='volume_disk' placeholder={'Volume Disc'} label={'Volume Disc'} />
                    }
                </Box>
                {formik.values.compute_type !== 'cpu' &&
                    <FormikTextField name='volume_mount_path' placeholder={'Volume Mount Path'} label={'Volume Mount Path'} />
                }
            </Box>
            <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3}>
                <FormikTextField name='expose_http_ports' placeholder={'Expose HTTP Ports (Max 10)'} label={'Expose HTTP Ports (Max 10)'} />
                <FormikTextField name='expose_tcp_ports' placeholder={'Expose TCP Ports'} label={'Expose TCP Ports'} />
            </Box>
            <Box display={'flex'} flexDirection={'column'}>
                <Typography>
                    Template Visibility
                </Typography>
                <ToggleButtonGroup
                    color='primary'
                    value={formik.values.template_visibility}
                    exclusive
                    onChange={(e, value) => {
                        if(value){
                            formik.setFieldValue('template_visibility', value)
                        }
                    }}
                    aria-label='Platform'
                    sx={{
                        '.css-k9c1x3-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': {
                            color: white,
                            background: black,
                        },
                        '.css-t22hm5-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': {
                            color: white,
                            background: black,
                        }
                    }}
                    >
                    <ToggleButton
                        value='public'
                        size='small'
                        sx={{
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                            fontWeight: 600,
                        }}
                    >
                        <LockOpenIcon fontSize='small' />
                        <Typography sx={{ marginLeft: '5px' }} fontSize={14}>
                            PUBLIC
                        </Typography>
                    </ToggleButton>

                    <ToggleButton
                        value='private'
                        size='small'
                        sx={{
                            border: '1px solid rgba(0, 0, 0, 0.12)',
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                            fontWeight: 600,
                        }}
                    >
                        <LockIcon fontSize='small' />
                        <Typography sx={{ marginLeft: '5px' }} fontSize={14}>
                            PRIVATE
                        </Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>

            <Box>
                <Box display={'flex'} alignItems={'center'} sx={{ cursor: 'pointer' }} onClick={() => setEnvIsOpen(!env_is_open)}>
                    <Typography sx={{ marginLeft: '5px' }} fontSize={14} pr={1}>
                        Environment Variables
                    </Typography>
                    <KeyboardArrowDownIcon fontSize='small' />
                </Box>
                {env_is_open &&
                    <Box>
                        <EnvVariables formik={formik} />
                    </Box>
                }
            </Box>

        </StyledFormInputWrapper>
    )
}

export default TemplateForm