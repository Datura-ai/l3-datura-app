import { StyledChatWrapper, StyledContainer, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import styled from 'styled-components'
import { StyledHeaderGroup } from 'pages/Home/homeStyle.css'
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
                        <StyledTabsWrapper>
                            <StyledHeaderGroup className='header_group'>
                                <ButtonPrimary
                                    onClick={handleCreateSecret}
                                    size={Button.sizes?.MEDIUM}
                                >
                                    Create Secret
                                </ButtonPrimary>
                            </StyledHeaderGroup>
                        </StyledTabsWrapper>

                        <StyledTableWrapper>
                            <Table 
                                columns={columns} 
                                data={secrets} 
                                isLoading={fetch_secret_loading} 
                            />
                        </StyledTableWrapper>
                    </StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>
        </StyledAppContainer>
    )
}

export default Secrets

const StyledTabsWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`