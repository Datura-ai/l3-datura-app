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

import ApiKeysForm from './ApiKeysForm'
import { useCreateApiKey } from './useCreateApiKey'

import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledFormWrapper } from 'pages/Secrets/CreateSecret/CreateSecret'

function CreateApiKeyForm() {
  const { formik, isLoading } = useCreateApiKey()

  return (
    <>
      <FormikProvider value={formik}>
        <StyledAppContainer>
          <StyledContainer>
            <StyledMainWrapper>
              <StyledChatWrapper>
                <StyledHeaderGroup className='header_group'>
                  <div style={{ width: '100%' }}>
                    <StyledSectionTitle>Add API Key</StyledSectionTitle>
                    <StyledSectionDescription>
                      {`Add new API keys to enable and manage access to your application's features.`}
                    </StyledSectionDescription>
                  </div>

                  <StyledButtonWrapper>
                    <BackButton />
                    <ButtonPrimary
                      onClick={formik?.handleSubmit}
                      size={Button.sizes?.MEDIUM}
                      disabled={isLoading}
                    >
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
    </>
  )
}

export default CreateApiKeyForm
