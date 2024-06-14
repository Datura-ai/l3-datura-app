// EditApiKeyForm.js
import React from 'react'
import { FormikProvider } from 'formik'
import BackButton from 'components/BackButton'
import Button from 'share-ui/components/Button/Button'
import Loader from 'share-ui/components/Loader/Loader'
import { ButtonPrimary } from 'components/Button/Button'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
} from 'pages/Home/homeStyle.css'

import ApiKeysForm from '../CreateApiKey/ApiKeysForm'
import useEditApiKey from './useEditApiKey'

import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledFormWrapper } from 'pages/Secrets/CreateSecret/CreateSecret'
import { StyledHeaderTextWrapper } from 'styles/formStyles.css'

function EditApiKeyForm() {
  const { formik, isLoading } = useEditApiKey()
  // console.log('formik', formik)

  return (
    <FormikProvider value={formik}>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledChatWrapper>
              <StyledHeaderGroup className='header_group'>
                <StyledHeaderTextWrapper>
                  <StyledSectionTitle>Edit API Key</StyledSectionTitle>
                  <StyledSectionDescription>Edit your API Key details.</StyledSectionDescription>
                </StyledHeaderTextWrapper>

                <StyledButtonWrapper>
                  <BackButton />
                  <ButtonPrimary onClick={formik?.handleSubmit} disabled={isLoading}>
                    {isLoading ? <Loader size={32} /> : 'Save'}
                  </ButtonPrimary>
                </StyledButtonWrapper>
              </StyledHeaderGroup>

              <StyledHorizontalDivider />

              <StyledFormWrapper>
                <ApiKeysForm formik={formik} />
              </StyledFormWrapper>
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>
    </FormikProvider>
  )
}

export default EditApiKeyForm
