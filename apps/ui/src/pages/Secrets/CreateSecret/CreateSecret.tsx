import { FormikProvider } from 'formik'
import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionDescription,
} from 'pages/Home/homeStyle.css'
import BackButton from 'components/BackButton'
import { ButtonPrimary } from 'components/Button/Button'

import FormikTextField from 'components/TextFieldFormik'

import useCreateSecret from './useCreateSecret'
import Box from '@mui/material/Box'
import TextareaFormik from 'components/TextareaFormik'

import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import styled from 'styled-components'

const CreateSecret = () => {
  const { formik, create_secret_loading } = useCreateSecret()
  return (
    <FormikProvider value={formik}>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledChatWrapper>
              <StyledHeaderGroup className='header_group'>
                <div>
                  <StyledSectionTitle>Create Secret</StyledSectionTitle>
                  <StyledSectionDescription>
                    Add new secrets to your application securely.
                  </StyledSectionDescription>
                </div>
                <Box display={'flex'} alignItems={'center'}>
                  <BackButton />
                  <ButtonPrimary
                    onClick={formik.handleSubmit}
                    disabled={create_secret_loading}
                    loading={create_secret_loading}
                  >
                    Save Secret
                  </ButtonPrimary>
                </Box>
              </StyledHeaderGroup>

              <StyledHorizontalDivider />

              <StyledFormWrapper>
                <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                  <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap={3} width={'100%'}>
                    <FormikTextField
                      name='secret_name'
                      placeholder={'Type Secret Name...'}
                      label={'Secret Name'}
                    />
                    <FormikTextField
                      name='secret_value'
                      placeholder={'Type Secret Value...'}
                      label={'Secret Value'}
                    />
                  </Box>
                  <Box width={'100%'}>
                    <TextareaFormik
                      setFieldValue={(field: string, value: string) =>
                        formik.setFieldValue(field, value)
                      }
                      label={'Secret Description'}
                      value={formik.values.secret_description}
                      fieldName={'secret_description'}
                      placeholder={'Type Secret Description...'}
                    />
                  </Box>
                </Box>
              </StyledFormWrapper>
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
    </FormikProvider>
  )
}

export default CreateSecret

const StyledFormWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 20px;
  padding-top: 30px;
`
