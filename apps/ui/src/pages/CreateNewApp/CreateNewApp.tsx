import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledChatWrapper, StyledContainer, StyledMainWrapper } from 'routes/ChatRouteLayout'

const CreateNewApp = () => {
  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledChatWrapper>CREATE NEW APP</StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default CreateNewApp
