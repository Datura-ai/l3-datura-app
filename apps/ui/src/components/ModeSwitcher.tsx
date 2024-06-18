import TypographyPrimary from './Typography/Primary'

import { Content, Item, Root, Trigger } from '@radix-ui/react-dropdown-menu'
import { account_mode_icon, useAppModeContext } from 'context/AppModeContext'
import { Check, Switcher } from 'share-ui/components/Icon/Icons'
import styled from 'styled-components'
import { StyledAddIcon } from 'pages/Navigation/MainNavigation'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ModeSwitcher = () => {
  const navigate = useNavigate()
  const { mode, setMode, accounts } = useAppModeContext()

  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [showDropdownValue, setShowDropdownValue] = useState(false)

  useEffect(() => {
    if (isDropdownOpen) {
      const timer = setTimeout(() => {
        setShowDropdownValue(true)
      }, 100)
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
            <Switcher size={32} />

            {showDropdownValue && (
              <StyledDropdownValue>
                <TypographyPrimary value={mode.name} size={'small'} semiBold />
              </StyledDropdownValue>
            )}
          </StyledDropDownMenuTrigger>
        </StyledSwitcher>
        {showDropdownValue && (
          <StyledDropdownContent>
            {accounts.map(option => {
              return (
                <StyledDropDownMenuItem key={option.type} onClick={() => setMode(option)}>
                  <StyledImg src={account_mode_icon[option.type]} />

                  <TypographyPrimary value={option.name} size={'small'} semiBold />
                  {mode.id === option.id && <StyledCheck />}
                </StyledDropDownMenuItem>
              )
            })}

            <StyledDropDownMenuItem onClick={() => navigate('create-new-app')}>
              <StyledAddIcon size={20} />
              <TypographyPrimary value='Create new application' size={'small'} semiBold />
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
  border-color: #000
  `

const StyledRoot = styled.div<{ isOpen: boolean }>`
  background: ${({ theme }) => theme.body.cardBgColor};
  border: 2px solid transparent;

  width: 50px;
  height: 50px;

  z-index: 10203000;

  transition: width 0.1s ease, height 0.1s ease, border-radius 0s ease, margin-left 0.1s ease;
  border-radius: 100px;

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

  :hover {
    background: ${({ theme }) => theme.body.humanMessageBgColor};
  }
`

const StyledDropDownMenuTrigger = styled(Trigger)`
  all: unset;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 10px;

  width: 100%;
  height: 100%;

  padding-left: 7px;
`
const StyledSwitcher = styled.div`
  width: 100%;
  height: 100%;
`

const StyledImg = styled.img<{ large?: boolean }>`
  width: 22px;
  height: 22px;

  object-fit: contain;

  ${({ large }) =>
    large &&
    `
  width: 34px;
  height: 34px;
  `}
`
