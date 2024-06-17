import { ButtonPrimary, ButtonSecondary } from 'components/Button/Button'
import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import CardWrapper from 'components/wrappers/CardWrapper'
import { useState } from 'react'
import { BurgerMenu, Delete, Pause, Play } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'
import styled from 'styled-components'
import { StyledFormInputWrapper } from 'styles/formStyles.css'
import { StyledButtonsWrapper } from 'styles/globalStyle.css'
import { StyledEditIcon } from './PodsMainCard'

const PodDetails = () => {
  const [play, setPlay] = useState(false)

  return (
    <StyledFormInputWrapper>
      <TypographyPrimary value='Details' bold size={'large'} />

      <CardWrapper>
        <StyledInnerWrapper>
          <StyledHeader>
            <StyledColumn>
              <StyledNameWrapper>
                <TypographyPrimary value='TEST NAME' semiBold size='large' />
                <IconButton
                  onClick={() => {}}
                  icon={() => <StyledEditIcon />}
                  size={IconButton.sizes?.SMALL}
                  kind={IconButton.kinds?.TERTIARY}
                  ariaLabel='Edit Template'
                />
              </StyledNameWrapper>
              <TypographySecondary value='ID: hgf6h5df1sdgffd' size='medium' />
            </StyledColumn>

            <StyledColumn>
              <TypographyPrimary value='1 x RTX A5000' size='medium' />

              <TypographySecondary value='9 vCPU 50 GB RAM' size='medium' />
            </StyledColumn>

            <StyledColumn>
              <TypographyPrimary value='runpod/pytorch:2.0.1' size='medium' />

              <TypographySecondary value='On-Demand - Secure Cloud' size='medium' />
            </StyledColumn>
          </StyledHeader>

          <StyledBody>
            <StyledColumn>
              <TypographySecondary value='150 GB DISK 100 GB Pod Volume' size='medium' />
              <TypographySecondary value='Volume Path: /workspace' size='medium' />
            </StyledColumn>

            <StyledColumn></StyledColumn>
          </StyledBody>
          <StyledFooter>
            <StyledButtonsWrapper>
              <ButtonSecondary size='small'>
                <StyledBurgerMenu />
              </ButtonSecondary>
              <ButtonPrimary size='small' onClick={() => setPlay(!play)}>
                {play ? <Pause /> : <Play />}
              </ButtonPrimary>
              <ButtonSecondary size='small'>
                <StyledDelete />
              </ButtonSecondary>
              <ButtonSecondary size='small'>
                <TypographyPrimary value='Logs' size='small' semiBold />
              </ButtonSecondary>
            </StyledButtonsWrapper>
            <StyledPriceTag>
              <TypographyPrimary value='Start for $0.44/hr' semiBold size='medium' />
            </StyledPriceTag>
          </StyledFooter>
        </StyledInnerWrapper>
      </CardWrapper>
    </StyledFormInputWrapper>
  )
}

export default PodDetails

const StyledInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`
const StyledHeader = styled.header`
  display: flex;
  align-items: center;

  justify-content: space-between;
`
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const StyledBody = styled.div`
  display: flex;
`
const StyledFooter = styled.footer`
  display: flex;
  justify-content: space-between;
`
const StyledBurgerMenu = styled(BurgerMenu)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledDelete = styled(Delete)`
  path {
    stroke: ${({ theme }) => theme.body.iconColor};
  }
`
const StyledPriceTag = styled.div`
  border-radius: 10px;
  border: 1px solid #b6b6b6;
  padding: 4px 8px;
`
const StyledNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
