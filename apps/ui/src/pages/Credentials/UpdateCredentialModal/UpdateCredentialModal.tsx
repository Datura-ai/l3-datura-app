import { FormikProvider } from 'formik'
import withRenderModal from "hocs/withRenderModal"
import styled from "styled-components"
import Modal from 'share-ui/components/Modal/Modal'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'
import Box from '@mui/material/Box';
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'
import Typography from '@mui/material/Typography'
import FormikTextField from 'components/TextFieldFormik'
import useUpdateCredential, { ModalProps } from './useUpdateCredential'


interface UpdateCredentialModalProps {
    data: ModalProps
}

const UpdateCredentialModal = ({ data: { refetch, credential } }: UpdateCredentialModalProps ) => {
    const { closeModal, formik, update_credential_loading } = useUpdateCredential({ refetch, credential })
    
    return (
        <FormikProvider value={formik}>
            <StyledModal
                onClose={() => closeModal('update-credential-modal')}
                show
                backgroundColor='light'
                hideCloseButton
            >
                <StyledModalBody>
                    <Box display={'flex'} flexDirection={'column'}>
                        <Typography>Edit Registry Credential</Typography>

                        <Box mt={2}>
                            <FormikTextField name='credential_name' placeholder={'Type Credential Name...'} label={'Credential Name'} disabled />
                            <FormikTextField name='user_name' placeholder={'Type User Name...'} label={'User Name'} />
                            <FormikTextField name='password' placeholder={'Type Password...'} label={'Password'} type="password" />
                        </Box>

                    </Box>

                    <StyledButtonWrapper>
                        <IconButton
                        size={IconButton.sizes?.XS}
                        icon={() => <Close />}
                        kind={IconButton.kinds?.TERTIARY}
                        onClick={() => closeModal('update-credential-modal')}
                        />
                    </StyledButtonWrapper>
                    <Box alignSelf={'flex-end'} display={'flex'} width={'170px'} justifyContent={'space-between'}>
                        <ButtonPrimary
                            onClick={() => closeModal('update-credential-modal')}
                            size={Button.sizes?.MEDIUM}
                        >
                            Cancel
                        </ButtonPrimary>
                        <ButtonPrimary
                            onClick={formik.handleSubmit}
                            size={Button.sizes?.MEDIUM}
                            loading={update_credential_loading}
                        >
                            Save
                        </ButtonPrimary>
                    </Box>
                </StyledModalBody>
            </StyledModal>
        </FormikProvider>
    )
}

export default withRenderModal('update-credential-modal')(UpdateCredentialModal)

const StyledModal = styled(Modal)`
  .components-Modal-Modal-module__overlay--OO00T {
    backdrop-filter: unset;
  }

  display: flex;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  color: ${({ theme }) => theme.body.textColorPrimary} !important;
  min-width: 600px;
  min-height: 330px;
  max-height: 90vh;
`

const StyledModalBody = styled.div`
  max-width: 600px;
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
