import { StyledChatWrapper, StyledContainer, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'

import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
} from 'pages/Home/homeStyle.css'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Table from 'components/Table'
import useSecret from './useSecret'

const Secrets = () => {
  const { columns, handleCreateSecret, fetch_secret_loading, secrets } = useSecret()

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledChatWrapper>
            <StyledHeaderGroup className='header_group'>
              <div>
                <StyledSectionTitle>Secrets</StyledSectionTitle>
                <StyledSectionDescription>
                  Manage and configure secrets used across your applications securely.
                </StyledSectionDescription>
              </div>

              <ButtonPrimary onClick={handleCreateSecret} size={Button.sizes?.MEDIUM}>
                Create Secret
              </ButtonPrimary>
            </StyledHeaderGroup>

            <StyledTableWrapper>
              <Table columns={columns} data={secrets} isLoading={fetch_secret_loading} />
            </StyledTableWrapper>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default Secrets
