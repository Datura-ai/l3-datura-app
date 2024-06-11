import Integrations from 'share-ui/components/Icon/Icons/components/integrations'

import TypographyPrimary from './Typography/Primary'
import { Arrow, Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { useAppModeContext } from 'context/AppModeContext'
import { Add, Check } from 'share-ui/components/Icon/Icons'
import styled from 'styled-components'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import { useEffect, useState } from 'react'
import Cloud from 'share-ui/components/Icon/Icons/components/Cloud'

const ModeSwitcher = () => {
  const { mode, setMode } = useAppModeContext()

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [showDropdownValue, setShowDropdownValue] = useState(false)

  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setShowDropdownValue(true)
      }, 100) // Delay in milliseconds
      return () => clearTimeout(timer)
    } else {
      setShowDropdownValue(false)
    }
  }, [isDropdownOpen])

  return (
    <StyledRoot isOpen={isDropdownOpen}>
      <StyledDropDownMenuRoot onOpenChange={setDropdownOpen}>
        <StyledSwitcher>
          <StyledDropDownMenuTrigger>
            <Integrations />

            {showDropdownValue && (
              <StyledDropdownValue>
                <TypographyPrimary value={mode} />
              </StyledDropdownValue>
            )}
          </StyledDropDownMenuTrigger>
        </StyledSwitcher>
        {showDropdownValue && (
          <StyledDropdownContent>
            <StyledDropDownMenuItem onClick={() => setMode('Compute')}>
              <Cloud />

              <TypographyPrimary value='Compute' size={'small'} />
              {mode === 'Compute' && <StyledCheck />}
            </StyledDropDownMenuItem>
            <StyledDropDownMenuItem onClick={() => setMode('Subnet API')}>
              <StyledImg src='https://icons.veryicon.com/png/o/application/cloud-supervision-platform-vr10/subnets.png' />

              <TypographyPrimary value='Subnet API' size={'small'} />
              {mode === 'Subnet API' && <StyledCheck />}
            </StyledDropDownMenuItem>
            <StyledDropDownMenuItem onClick={() => {}}>
              <StyledAddIcon size={20} />
              <TypographyPrimary value='Create new application' size={'small'} />
            </StyledDropDownMenuItem>
          </StyledDropdownContent>
        )}
      </StyledDropDownMenuRoot>
    </StyledRoot>
  )
}

export default ModeSwitcher

const expandedStyles = `
  width: 250px;
  height: 50px;
  border-radius: 10px;
  margin-left: 200px; 
  `

const StyledRoot = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.body.cardBgColor};
  border: ${({ theme }) => theme.body.border};

  width: 50px;
  height: 50px;

  z-index: 10203000;

  transition: width 0.1s ease, height 0.1s ease, border-radius 0s ease, margin-left 0.1s ease;
  border-radius: 10px;

  ${({ isOpen }) => isOpen && expandedStyles}
`

const StyledDropdownValue = styled.div``

const StyledCheck = styled(Check)`
  path {
    fill: ${({ theme }) => theme.body.iconColor};
  }

  margin-left: auto;
`
const StyledDropDownMenuRoot = styled(Root)``

const StyledDropdownContent = styled(Content)`
  margin-bottom: 15px;
  min-width: 250px;
  width: 100%;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  z-index: 10203000;
  border-radius: 8px;
  background: ${({ theme }) => theme.body.avatarDropDownColor};
  /* background-color: white; */
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(100px);
  animation: fadeInFromBottom 0.2s ease-out;

  @keyframes fadeInFromBottom {
    from {
      opacity: 0;
      transform: translateY(10px); // Start lower
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const StyledDropDownMenuItem = styled(Item)`
  all: unset;
  font-size: 13px;
  line-height: 1;
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 12px 10px;
  position: relative;
  cursor: pointer;
  user-select: none;
  display: flex;
  gap: 10px;
  color: var(--content-content-primary, #fff);
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
  :hover {
    background: ${({ theme }) => theme.body.humanMessageBgColor};
  }
`

const StyledDropDownMenuTrigger = styled(Trigger)`
  all: unset;
  cursor: pointer;

  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;
`
const StyledSwitcher = styled.div``

const StyledImg = styled.img`
  width: 18px;
  height: 18px;
  /* margin: 0 7px; */
`
