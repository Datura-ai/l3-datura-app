import {
  StyledHeaderGroup,
  StyledSectionTitle,
  StyledSectionWrapper,
} from 'pages/Home/homeStyle.css'
import Box from '@mui/material/Box'
import BackButton from 'components/BackButton'

import Typography from '@mui/material/Typography'
import CopyButton from 'components/CopyButton'
import useSecretDetails from './useSecretDetails'
import IconButton from 'share-ui/components/IconButton/IconButton'
// eslint-disable-next-line import/no-extraneous-dependencies
import SettingsIcon from '@mui/icons-material/Settings'
import MenuButton from 'share-ui/components/MenuButton/MenuButton'
import { StyledMenuButtonsWrapper } from 'pages/Agents/AgentView/components/AgentViewDetailBox'
import { ButtonTertiary } from 'components/Button/Button'
import EditSecretModal from '../EditModal/EditSecretModal'
import TextField from 'share-ui/components/TextField/TextField'
import Textarea from 'share-ui/components/Textarea/Textarea'

import { StyledAppContainer } from 'components/Layout/LayoutStyle'
import { StyledChatWrapper, StyledContainer, StyledMainWrapper } from 'routes/ChatRouteLayout'
import { StyledFormWrapper } from '../CreateSecret/CreateSecret'
import CardWrapper from 'components/wrappers/CardWrapper'

const labelColor = 'rgba(34, 51, 84, 0.7)'

interface SecretModalProps {
  handleChangeInput: (field: string, e: string) => void
  field: string
  value: string
}

export const editSecretValue = ({ handleChangeInput, field, value }: SecretModalProps) => {
  return (
    <Box>
      <Typography fontSize={17} fontWeight={600}>
        Edit Secret Value
      </Typography>
      <Typography fontSize={12} mt={1}>
        WARNING: Changing this secret value can have unintended side effects. It may disrupt
        services or applications that depend on this secret. If a new value is required, consider
        creating a new secret and updating your services accordingly to prevent any downtime or
        configuration issues.
      </Typography>

      <Box mt={2}>
        <TextField value={value} onChange={e => handleChangeInput(field, e)} />
      </Box>
    </Box>
  )
}

export const editDescription = ({ handleChangeInput, field, value }: SecretModalProps) => {
  return (
    <Box>
      <Typography fontSize={17} fontWeight={600}>
        Edit Secret Description
      </Typography>
      <Typography fontSize={12} mt={1}>
        Tip: Try to create a description that accurately reflects the purpose and usage of the
        secret to maintain clarity for all users.
      </Typography>

      <Box mt={2}>
        <Textarea value={value} onChange={e => handleChangeInput(field, e)} />
      </Box>
    </Box>
  )
}

const SecretDetails = () => {
  const { secret, fetch_secret_loading, handleCopyText, formatDate, actions } = useSecretDetails()

  return (
    <StyledSectionWrapper>
      <StyledAppContainer>
        <StyledContainer>
          <StyledMainWrapper>
            <StyledChatWrapper>
              <StyledHeaderGroup className='header_group'>
                <StyledSectionTitle>Secret Details</StyledSectionTitle>
                <Box display={'flex'} alignItems={'center'}>
                  <BackButton />
                </Box>
              </StyledHeaderGroup>

              <StyledFormWrapper>
                <CardWrapper>
                  {fetch_secret_loading && <Typography>Loading...</Typography>}
                  <Box display={'flex'} flexDirection={'column'}>
                    <Box alignSelf={'flex-end'}>
                      <MenuButton
                        component={() => <SettingsIcon fontSize='large' />}
                        closeDialogOnContentClick
                        ariaLabel={`Settings`}
                      >
                        <StyledMenuButtonsWrapper>
                          {actions.map(
                            (item: { label: string; function: () => void }, index: number) => {
                              return (
                                <ButtonTertiary
                                  key={index}
                                  onClick={item.function}
                                  size={IconButton.sizes?.SMALL}
                                >
                                  {item.label}
                                </ButtonTertiary>
                              )
                            },
                          )}
                        </StyledMenuButtonsWrapper>
                      </MenuButton>
                    </Box>
                    <Box display={'flex'}>
                      <Box display={'flex'} flexDirection={'column'} width={'30%'}>
                        <Box>
                          <Typography color={labelColor} fontSize={15}>
                            Secret Name
                          </Typography>
                          <Typography display={'flex'} alignItems={'center'}>
                            <CopyButton onCopyClick={() => handleCopyText(secret.secret_name)} />
                            {secret.secret_name}
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography color={labelColor} fontSize={15}>
                            Secret ID
                          </Typography>
                          <Typography display={'flex'} alignItems={'center'}>
                            <CopyButton onCopyClick={() => handleCopyText(secret.id)} />
                            {secret.id}
                          </Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography color={labelColor} fontSize={15}>
                            Last Retrieved
                          </Typography>
                          <Typography>{formatDate(secret.last_retrieved_on)}</Typography>
                        </Box>
                      </Box>

                      <Box>
                        <Box>
                          <Typography color={labelColor} fontSize={15}>
                            Description
                          </Typography>
                          <Typography>{secret.secret_description}</Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography color={labelColor} fontSize={15}>
                            Created
                          </Typography>
                          <Typography>{formatDate(secret.created_on)}</Typography>
                        </Box>
                        <Box mt={2}>
                          <Typography color={labelColor} fontSize={15}>
                            Last Updated
                          </Typography>
                          <Typography>{formatDate(secret?.updated_on)}</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardWrapper>
              </StyledFormWrapper>
            </StyledChatWrapper>
          </StyledMainWrapper>
        </StyledContainer>
      </StyledAppContainer>

      <EditSecretModal />
    </StyledSectionWrapper>
  )
}

export default SecretDetails
