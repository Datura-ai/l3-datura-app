import { FormikProvider } from 'formik'
import {
    StyledHeaderGroup,
    StyledSectionTitle,
    StyledSectionWrapper,
  } from 'pages/Home/homeStyle.css'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'
import ComponentsWrapper from 'components/ComponentsWrapper/ComponentsWrapper'
import { StyledFormWrapper } from 'styles/formStyles.css'
import FormikTextField from 'components/TextFieldFormik'
import Button from 'share-ui/components/Button/Button'
import useCreateSecret from './useCreateSecret'
import Box from '@mui/material/Box'
import TextareaFormik from 'components/TextareaFormik'

const CreateSecret = () => {
    const { formik, create_secret_loading } = useCreateSecret()  
    return (
        <FormikProvider value={formik}>
            <StyledSectionWrapper>
            <StyledHeaderGroup className='header_group'>
                <StyledSectionTitle>Create Secret</StyledSectionTitle>
                <Box display={'flex'} alignItems={'center'}>
                    <BackButton />
                    <ButtonPrimary
                        onClick={formik.handleSubmit}
                        size={Button.sizes?.SMALL}
                        disabled={create_secret_loading}
                        loading={create_secret_loading}
                    >
                        Save Secret
                    </ButtonPrimary>
                </Box>
            </StyledHeaderGroup>

            <ComponentsWrapper noPadding>
                <StyledFormWrapper>
                    <Box display={'flex'} flexDirection={'column'} alignItems={'center'} p={5}>
                        <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3} width={'100%'}>
                            <FormikTextField name='secret_name' placeholder={'Type Secret Name...'} label={'Secret Name'} />
                            <FormikTextField name='secret_value' placeholder={'Type Secret Value...'} label={'Secret Value'} />
                        </Box>
                        <Box width={'100%'}>
                            <TextareaFormik
                                setFieldValue={(field: string, value: string) => formik.setFieldValue(field, value)} 
                                label={'Secret Description'}
                                value={formik.values.secret_description}
                                fieldName={'secret_description'}
                                placeholder={'Type Secret Description...'}
                            />
                        </Box>
                    </Box>
                </StyledFormWrapper>
            </ComponentsWrapper>
            </StyledSectionWrapper>
        </FormikProvider>
    )
}

export default CreateSecret
