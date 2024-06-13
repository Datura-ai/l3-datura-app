import { useState } from 'react'
import styled from 'styled-components'

import TypographyPrimary from 'components/Typography/Primary'
import { Card, CardActionArea } from '@mui/material'
import { ButtonPrimary } from 'components/Button/Button'
import TypographySecondary from 'components/Typography/Secondary'
import { Option, useAppModeContext } from 'context/AppModeContext'

const SelectType = ({ nextStep }: { nextStep: () => void }) => {
  const { options } = useAppModeContext()
  const [pickedRole, setPickedRole] = useState<Option>(options[0])

  return (
    <StyledInnerWrapper>
      <StyledHeader>
        <TypographyPrimary value={`Let's get started`} size='x-large' bold />
        <TypographySecondary
          value={'Choose the type of application you want to create:'}
          size='medium'
        />
      </StyledHeader>

      <StyledCardsWrapper>
        {options.map(data => {
          return (
            <Card
              key={data.type}
              onClick={() => setPickedRole(data)}
              sx={{
                width: '100%',
                border: 'none',
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
                background: '#FFF',
                borderRadius: '10px',
              }}
            >
              <CardActionArea
                sx={{
                  boxShadow: 'none',
                  borderRadius: '10px',
                  ...(pickedRole === data ? { backgroundColor: 'rgba(50, 50, 50, 0.1)' } : {}),
                  ...(pickedRole === data
                    ? { border: '1px solid #000' }
                    : { border: '1px solid transparent' }),
                }}
              >
                <StyledCardInnerWrapper>
                  <StyledImg src={data.icon} />

                  <StyledTextWrapper>
                    <TypographyPrimary value={data.name} semiBold />
                    <TypographySecondary value={'description template'} size='small' />
                  </StyledTextWrapper>
                </StyledCardInnerWrapper>
              </CardActionArea>
            </Card>
          )
        })}
      </StyledCardsWrapper>

      <ButtonPrimary onClick={nextStep}>Continue</ButtonPrimary>
    </StyledInnerWrapper>
  )
}

export default SelectType

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding-top: 100px;

  width: 100%;
  max-width: 600px;
  height: 100%;
`

const StyledCardInnerWrapper = styled.div`
  width: 100%;
  height: 80px;

  display: flex;

  align-items: center;
  gap: 10px;

  padding: 0 20px;
`

const StyledCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const StyledImg = styled.img`
  width: 34px;
  height: 34px;

  object-fit: contain;
`
const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 5px; */
`
