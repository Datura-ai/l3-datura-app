import withRenderModal from 'hocs/withRenderModal'
import styled from 'styled-components'
import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from 'hooks'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'
import Box from '@mui/material/Box'
import { ButtonPrimary, ButtonSecondary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

interface EditSecretModalProps {
  data: {
    handleUpdateSecret: (field: string) => void
    field: string
    renderComponent: React.ReactNode
  }
}

const EditSecretModal = ({
  data: { handleUpdateSecret, field, renderComponent },
}: EditSecretModalProps) => {
  const { closeModal } = useModal()
  return (
    <StyledModal
      onClose={() => closeModal('edit-secret-modal')}
      show
      backgroundColor='light'
      hideCloseButton
    >
      <StyledModalBody>
        {renderComponent}

        <StyledButtonWrapper>
          <IconButton
            size={IconButton.sizes?.XS}
            icon={() => <Close />}
            kind={IconButton.kinds?.TERTIARY}
            onClick={() => closeModal('edit-secret-modal')}
          />
        </StyledButtonWrapper>
        <Box
          alignSelf={'flex-end'}
          display={'flex'}
          width={'170px'}
          justifyContent={'space-between'}
        >
          <ButtonSecondary
            onClick={() => closeModal('edit-secret-modal')}
            size={Button.sizes?.MEDIUM}
          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary onClick={() => handleUpdateSecret(field)} size={Button.sizes?.MEDIUM}>
            Save
          </ButtonPrimary>
        </Box>
      </StyledModalBody>
    </StyledModal>
  )
}

export default withRenderModal('edit-secret-modal')(EditSecretModal)

const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }

  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
  min-width: 400px;
  min-height: 330px;
  max-height: 90vh;
`

const StyledModalBody = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  display: flex;
  flex-direction: column;
  min-height: 330px;
  justify-content: space-between;
`
export const StyledButtonWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
`
