// eslint-disable-next-line import/no-extraneous-dependencies
import ControlPointIcon from '@mui/icons-material/ControlPoint'
// eslint-disable-next-line import/no-extraneous-dependencies
import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import { ButtonPrimary } from 'components/Button/Button'
import TextField from 'share-ui/components/TextField/TextField'
import { FormikProps } from 'formik';
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import KeyIcon from '@mui/icons-material/Key'
import LockIcon from '@mui/icons-material/Lock'
import ErrorIcon from '@mui/icons-material/Error'
import TemplateSecretModal from './SecretModal'
import { useModal } from 'hooks'
import { useGetSecrets } from 'services/secret/useSecretService'
import { Secret } from 'types/secret'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
interface EnvVariable {
  key: string;
  value: string;
}

interface FormValues {
  environment_variables: {
    env:  EnvVariable[]
  };
}

const renderActions = ({ index, value, handleOpenSecretModal, setFieldValue, secrets }: any) => {
    const prefix = 'DATURA_SECRET_'
    if(!value.includes(prefix)) {
        return (
            <KeyIcon 
                fontSize='medium' 
                cursor={'pointer'} 
                onClick={() => handleOpenSecretModal(index)}
            />
        )
    }

    if(value.includes(prefix)) {
        const trimmedStr = value.replace(/{{\s*|\s*}}/g, '')
        const result = trimmedStr.replace(prefix, '')

        const secret = secrets?.find((secret: Secret) => secret.secret_name === result)

        if(secret) {
            return (
                <Box>

                    <OpenInNewIcon 
                        fontSize='medium'
                        cursor={'pointer'} 
                        onClick={() => window.open(`http://localhost:3000/secrets/${secret.id}`, '_blank')}
                    />

                    <LockIcon 
                        fontSize='medium'
                        cursor={'pointer'} 
                        onClick={() => setFieldValue(`environment_variables.env.${index}.value`, '')}
                    />
                </Box>
            )
        } else {
            return (
                <ErrorIcon 
                    fontSize='medium' 
                    color='error'
                    onClick={() => setFieldValue(`environment_variables.env.${index}.value`, '')}
                />
            )
        }
        
    }
}

const EnvVariables = ({ formik }: { formik: FormikProps<FormValues> }) => {
    const { data: secrets, loading: fetch_secret_loading, refetch } = useGetSecrets()

    const { openModal, closeModal } = useModal()
    const handleAddRow = () => {
        formik.setFieldValue('environment_variables.env', [...formik.values.environment_variables.env, { key: '', value: '' }])
    }

    const handleDeleteRow = (index: number) => {
        formik.setFieldValue('environment_variables.env', formik.values.environment_variables.env.filter((_: { key: string, value: string }, i: number) => i !== index))
    }

    const handleSelectSecret = (secret: Secret, index: number) => {
        formik.setFieldValue(`environment_variables.env.${index}.value`, `{{ DATURA_SECRET_${secret.secret_name} }}`)
        closeModal('template-secret-modal')
    }

    const handleOpenSecretModal = (index: number) => {
        openModal({
            name: 'template-secret-modal',
            data: {
                index,
                secrets,
                handleSelectSecret: handleSelectSecret,
            }
        })
    }

    return (
        <Box mt={2}>
            <Box display={'grid'} gridTemplateColumns={'1fr 1fr 30px'} rowGap={1} columnGap={3} alignItems={'center'}>
                {formik.values.environment_variables.env.map((item: { key: string, value: string }, index: number) => (
                    <>
                        <TextField 
                            name='key' 
                            placeholder={'Key'} 
                            value={formik.values.environment_variables.env[index].key} 
                            onChange={(value) => formik.setFieldValue(`environment_variables.env.${index}.key`, value)}
                        />
                        <OutlinedInput
                            name='value' 
                            disabled={formik.values.environment_variables.env[index].value.includes('{{ DATURA_SECRET_') ? true : false}
                            placeholder={'Value'} 
                            value={formik.values.environment_variables.env[index].value} 
                            onChange={(value) => formik.setFieldValue(`environment_variables.env.${index}.value`, value.target.value)}
                            endAdornment={
                                <InputAdornment position="start">
                                    <Box display={'flex'}>
                                        {renderActions({ 
                                            index, 
                                            handleOpenSecretModal, 
                                            setFieldValue: formik.setFieldValue,
                                            value: formik.values.environment_variables.env[index].value,
                                            secrets,
                                        })}

                                        {/* <KeyIcon 
                                            fontSize='medium' 
                                            cursor={'pointer'} 
                                            onClick={() => handleOpenSecretModal(index)}
                                        /> */}
                                        {/* <LockIcon 
                                            fontSize='medium'
                                            onClick={() => formik.setFieldValue(`environment_variables.env.${index}.value`, '')}
                                        /> */}
                                        
                                    </Box>
                                </InputAdornment>
                            }
                        />
                        <Box sx={{ cursor: 'pointer' }} onClick={() => handleDeleteRow(index)}>
                            <ClearIcon />
                        </Box>
                    </>
                ))}
            </Box>
            <Box mt={1}>
                <ButtonPrimary
                    onClick={handleAddRow}
                    size='small'
                >
                    <ControlPointIcon fontSize='small' />
                    Add Environment Variable
                </ButtonPrimary>
            </Box>

            <TemplateSecretModal />
        </Box>
    )    
}

export default EnvVariables