import withRenderModal from "hocs/withRenderModal"
import styled from "styled-components"
import Modal from 'share-ui/components/Modal/Modal'
import { useModal } from "hooks"
import IconButton from 'share-ui/components/IconButton/IconButton'
import Close from 'share-ui/components/Icon/Icons/components/Close'
import Box from '@mui/material/Box';
// import { ButtonPrimary } from 'components/Button/Button'
// import Button from 'share-ui/components/Button/Button'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'
import Table from 'components/Table'
import { Secret } from "types/secret"
import Typography from '@mui/material/Typography'


// interface EditSecretModalProps {
// 	data: {
// 		handleUpdateSecret: (field: string) => void
// 		field: string 
// 		renderComponent: React.ReactNode
// 	}
// }

const baseConfig = ({ handleSelectSecret, index }: { handleSelectSecret: (secret: Secret, index: number) => void, index: number }) => ([
    {
        Header: 'Secret Name',
        accessor: 'secret_name',
        minWidth: 300,
        width: 350,
        Cell: ({ row: { original: data } }: { row: { original: Secret } }) => (
            <Typography 
                onClick={() => handleSelectSecret(data, index)} 
                sx={{ cursor: 'pointer', textDecoration: 'underline', color: '#0062ff' }}
            >
                {data.secret_name}
            </Typography>
        )
    },
    {
        Header: 'Description',
        accessor: 'secret_description',
        minWidth: 300,
        width: 350,
    },
])

const TemplateSecretModal = ({ data: { secrets, handleSelectSecret, index } }: any) => {
    const { closeModal } = useModal()
    return (
        <StyledModal
            onClose={() => closeModal('template-secret-modal')}
            show
            backgroundColor='light'
            hideCloseButton
        >
            <StyledModalBody>
            <StyledTableWrapper>
                <Table 
                    columns={baseConfig({ handleSelectSecret, index })} 
                    data={secrets} 
                    isLoading={false} 
                />
            </StyledTableWrapper>

                <StyledButtonWrapper>
                    <IconButton
                      size={IconButton.sizes?.XS}
                      icon={() => <Close />}
                      kind={IconButton.kinds?.TERTIARY}
                      onClick={() => closeModal('template-secret-modal')}
                    />
                </StyledButtonWrapper>
            </StyledModalBody>
        </StyledModal>
    )
}

export default withRenderModal('template-secret-modal')(TemplateSecretModal)

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
  max-width: 900px;
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
