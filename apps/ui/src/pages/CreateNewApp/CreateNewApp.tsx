import { useState } from 'react'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import {
  StyledChatWrapper,
  StyledContainer,
  StyledHorizontalDivider,
  StyledMainWrapper,
} from 'routes/ChatRouteLayout'
import styled from 'styled-components'
import SelectType from './steps/SelectType'
import SDKs from 'pages/Subnets/SDKs'
import TextField from 'share-ui/components/TextField/TextField'

const CreateNewApp = () => {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectType nextStep={nextStep} />
      case 2:
        return (
          <StyledConfiguration>
            <TextField />
          </StyledConfiguration>
        )
      case 3:
        return <>HERE IS DA BODY</>
      default:
        return <div>Unknown Step</div>
    }
  }

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledChatWrapper>
            <StyledRoot>
              <StyledHeader>
                <StyledButton picked={step === 1} onClick={() => setStep(1)}>
                  Select App type
                </StyledButton>

                <StyledDividerLine />

                <StyledButton picked={step === 2} onClick={() => setStep(2)}>
                  ConFiguration
                </StyledButton>
                <StyledDividerLine />

                <StyledButton picked={step === 3} onClick={() => setStep(3)}>
                  Get Started
                </StyledButton>
              </StyledHeader>

              <StyledHorizontalDivider />

              <StyledBody>{renderStep()}</StyledBody>

              <StyledButtonsWrapper>
                {step > 1 && <button onClick={prevStep}>Back</button>}
                {step < 3 && <button onClick={nextStep}>Next</button>}
                {step === 3 && <button onClick={() => alert('Process completed!')}>Finish</button>}
              </StyledButtonsWrapper>
            </StyledRoot>
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default CreateNewApp

const StyledRoot = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`
const StyledHeader = styled.div`
  width: 100%;
  height: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
`

const StyledBody = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  overflow: auto;
`
const StyledButtonsWrapper = styled.div`
  width: 100%;

  height: 50px;

  display: flex;
  justify-content: center;
  gap: 50px;
`
const StyledButton = styled.button<{ picked: boolean }>`
  opacity: 0.6;

  opacity: ${props => (props.picked ? 1 : 0.6)};
`
const StyledDividerLine = styled.div`
  width: 50px;
  height: 1px;
  background-color: #dbdbdb;
`
const StyledConfiguration = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: red;
  height: 100%;
  width: 100%;
  max-width: 800px;

  padding: 20px;
`
