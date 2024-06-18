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

import { ButtonPrimary } from 'components/Button/Button'
import Configurations from './steps/Configurations'
import TypographyPrimary from 'components/Typography/Primary'
import useCreateNewApp from './useCreateNewApp'

const CreateNewApp = () => {
  

  const { formik, step, handleSetStep } = useCreateNewApp()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <SelectType 
          nextStep={() => handleSetStep(step + 1)} 
          values={formik.values}
          setFieldValue={formik.setFieldValue}
        />
      case 2:
        return (
          <>
            <Configurations 
              values={formik.values}
              setFieldValue={formik.setFieldValue}
            />
            <StyledButtonsWrapper>
              <ButtonPrimary onClick={() => handleSetStep(step - 1)}>Back</ButtonPrimary>
              <ButtonPrimary onClick={() => handleSetStep(step + 1)}>Next</ButtonPrimary>
            </StyledButtonsWrapper>
          </>
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
                  <TypographyPrimary value='Select App type' bold={step === 1} />
                </StyledButton>

                <StyledDividerLine />

                <StyledButton picked={step === 2} onClick={() => setStep(2)}>
                  <TypographyPrimary value='Configuration' bold={step === 2} />
                </StyledButton>
                <StyledDividerLine />

                <StyledButton picked={step === 3} onClick={() => setStep(3)}>
                  <TypographyPrimary value='Get Started' bold={step === 3} />
                </StyledButton>
              </StyledHeader>

              <StyledHorizontalDivider />

              <StyledBody>{renderStep()}</StyledBody>

              {/* <StyledButtonsWrapper>
                {step > 1 && <button onClick={prevStep}>Back</button>}
                {step < 3 && <button onClick={nextStep}>Next</button>}
                {step === 3 && <button onClick={() => alert('Process completed!')}>Finish</button>}
              </StyledButtonsWrapper> */}
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
  /* gap: 20px; */
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

  display: flex;
  justify-content: center;
  gap: 10px;

  margin-top: auto;

  margin-top: 50px;
  padding: 10px 0;
`
const StyledButton = styled.button<{ picked: boolean }>`
  opacity: 0.6;

  width: 200px;

  padding: 20px;

  opacity: ${props => (props.picked ? 1 : 0.6)};
`
const StyledDividerLine = styled.div`
  width: 50px;
  height: 1px;
  background-color: #dbdbdb;
`
