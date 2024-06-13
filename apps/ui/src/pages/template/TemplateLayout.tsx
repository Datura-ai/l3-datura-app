import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import ListHeader from 'routes/components/ListHeader'

import {
  StyledChatWrapper,
  StyledContainer,
  StyledLeftColumn,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import { useNavigate, useOutlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
// import { usePod } from './usePods'
import Loader from 'share-ui/components/Loader/Loader'

import TemplateList from './TemplateList'

const TemplateLayout = () => {
  const navigate = useNavigate()
  const outlet = useOutlet()

    return (
        <StyledAppContainer>
            <StyledContainer>
                <StyledMainWrapper>
                <StyledLeftColumn customWidth={400}>
                    <Box display={'flex'} flexDirection={'column'} sx={{ paddingRight: 1.5 }} position={'relative'}>
                        <ListHeader title={'Templates'} onAddClick={() => navigate('/templates/create-template')} />

                        <TemplateList />
                    </Box>
                </StyledLeftColumn>

                <StyledChatWrapper>{outlet}</StyledChatWrapper>
                </StyledMainWrapper>
            </StyledContainer>
        </StyledAppContainer>
    )
}

export default TemplateLayout