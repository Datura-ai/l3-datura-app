import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

import columnConfig from './columnConfig'

import Button from 'share-ui/components/Button/Button'
import Table from 'components/Table'

import Heading from 'share-ui/components/Heading/Heading'

import { useNavigate } from 'react-router-dom'

import useApiKeys from './useApiKeys'
import ShowApiKeyModal from '../ApiKeys/ShowApiKey/ShowApiKeyModal'
import TypographyTertiary from 'components/Typography/Tertiary'
import { ButtonPrimary, ButtonTertiary } from 'components/Button/Button'
import {
  StyledHeaderGroup,
  StyledSectionDescription,
  StyledSectionTitle,
} from 'pages/Home/homeStyle.css'

import { openLinkTab } from 'components/HeaderButtons/HeaderButtons'

import { StyledChatWrapper, StyledContainer, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'

const ApiKeys = () => {
  const { t } = useTranslation()
  const { apiKeys } = useApiKeys()

  const navigate = useNavigate()

  return (
    <StyledAppContainer>
      <StyledContainer>
        <StyledMainWrapper>
          <StyledChatWrapper>
            <StyledHeaderGroup className='header_group'>
              <div>
                <StyledSectionTitle>API Keys</StyledSectionTitle>
                <StyledSectionDescription>
                  <StyledTypography>
                    {t('api-keys-authenticate')}
                    <StyledTypographyWrapper>
                      <ButtonTertiary
                        onClick={() => openLinkTab(import.meta.env.REACT_APP_API_KEYS_LINK)}
                        size={Button.sizes?.SMALL}
                      >
                        <TypographyTertiary value={t('learn-more')} size={'small'} />
                      </ButtonTertiary>
                    </StyledTypographyWrapper>
                  </StyledTypography>
                </StyledSectionDescription>
              </div>

              <ButtonPrimary
                onClick={() => navigate('/api-key/create-api-key')}
                size={Button.sizes?.MEDIUM}
              >
                {t('create-api-key')}
              </ButtonPrimary>
            </StyledHeaderGroup>
            <StyledTableWrapper>
              <Table columns={columnConfig} data={apiKeys || []} />
            </StyledTableWrapper>

            <ShowApiKeyModal />
          </StyledChatWrapper>
        </StyledMainWrapper>
      </StyledContainer>
    </StyledAppContainer>
  )
}

export default ApiKeys

export const StyledRightSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  float: right;
`
export const StyledRightSideButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ffffff;
  width: 305px;
  height: 20px;
  float: right;
  top: 42px;
  right: 90px;

  margin-left: auto;
  margin-top: auto;
  display: flex;
  position: relative;
  top: 35px;
  right: 70px;
  width: fit-content;
`
export const StyledRightSideIconButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 6px;
  height: 12px;
  float: right;
  top: 46px;
  right: 53px;
  transform: rotate(90deg);
`
export const StyledLeftSideHeadingWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 36px;
  // top: 40px;
  // left: 24px;
  @media (max-width: 809px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    bottom: 40px;
  }
`
export const StyledLeftSideHeading = styled(Heading)`
  line-height: 36px !important;
  font-size: 28px !important;
  color: #ffffff;
`

export const StyledTypography = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  height: 28px;
  // color: rgba(255, 255, 255, 0.6);
  @media (max-width: 1209px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    top: 60px;
  }
`
export const StyledTypographyWrapper = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.body.textColorPrimary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  min-width: 30px;
  height: 20px;
  margin-left: 10px;
  // color: #ffffff;
  @media (max-width: 320px) {
    margin-left: auto;
    margin-top: auto;
    display: flex;
    position: relative;
    right: 65px;
    top: 40px;
    width: fit-content;
  }
`
export const StyledButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  -webkit-box-pack: end;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: fit-content;
  height: 56px;
`
export const StyledGridWrapper = styled.div`
  display: flex;
  position: relative;
  margin-top: 40px;
  width: 100%;
  height: 900px;
`
