import { StyledChatWrapper, StyledContainer, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import styled from 'styled-components'
import { StyledHeaderGroup } from 'pages/Home/homeStyle.css'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Table from 'components/Table'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

import CreateCredentialModal from './CreateCredentialModal/CreateCredentialModal'
import UpdateCredentialModal from './UpdateCredentialModal/UpdateCredentialModal'

import useCredentials from './useCredentials'

const Credentials = () => {
    const { 
        handleOpenCreateCredentialModal, 
        columns, 
        credentials, 
        fetch_credentials_loading, 
    } = useCredentials()

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                    <StyledChatWrapper>
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Typography fontSize={20}>Credentials</Typography>
                            <StyledHeaderGroup className='header_group'>
                                <ButtonPrimary
                                    onClick={handleOpenCreateCredentialModal}
                                    size={Button.sizes?.MEDIUM}
                                >
                                    Create Credential
                                </ButtonPrimary>
                            </StyledHeaderGroup>
                        </Box>

                        <StyledTableWrapper>
                            <Table 
                                columns={columns} 
                                data={credentials} 
                                isLoading={fetch_credentials_loading} 
                            />
                        </StyledTableWrapper>
                    </StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>
            <CreateCredentialModal />
            <UpdateCredentialModal />
        </StyledAppContainer>
    )
}

export default Credentials
