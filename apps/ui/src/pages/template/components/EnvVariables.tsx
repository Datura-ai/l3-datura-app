// eslint-disable-next-line import/no-extraneous-dependencies
import ControlPointIcon from '@mui/icons-material/ControlPoint'
// eslint-disable-next-line import/no-extraneous-dependencies
import ClearIcon from '@mui/icons-material/Clear'
import Box from '@mui/material/Box'
import { ButtonPrimary } from 'components/Button/Button'
import TextField from 'share-ui/components/TextField/TextField'
import { FormikProps } from 'formik';

interface EnvVariable {
  key: string;
  value: string;
}

interface FormValues {
  environment_variables: {
    env:  EnvVariable[]
  };
}

const EnvVariables = ({ formik }: { formik: FormikProps<FormValues> }) => {

    const handleAddRow = () => {
        formik.setFieldValue('environment_variables.env', [...formik.values.environment_variables.env, { key: '', value: '' }])
    }

    const handleDeleteRow = (index: number) => {
        formik.setFieldValue('environment_variables.env', formik.values.environment_variables.env.filter((_: { key: string, value: string }, i: number) => i !== index))
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
                        <TextField
                            name='value' 
                            placeholder={'Value'} 
                            value={formik.values.environment_variables.env[index].value} 
                            onChange={(value) => formik.setFieldValue(`environment_variables.env.${index}.value`, value)}
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
        </Box>
    )    
}

export default EnvVariables