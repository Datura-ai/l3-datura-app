
import moment from 'moment'
import styled from 'styled-components'
import Typography from '@mui/material/Typography'
import CopyButton from 'components/CopyButton'
import IconButton from 'share-ui/components/IconButton/IconButton'
import Loader from 'share-ui/components/Loader/Loader'
import {
    StyledDeleteIcon,
    StyledEditIcon
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { Credential } from 'types/credential'
// eslint-disable-next-line react/prop-types
const DateRenderer: React.FC<{ value: Date }> = ({ value }) => {
    const formattedDate = moment(value).format('DD/MM/YYYY HH:mm')
    return <span>{formattedDate}</span>
}

interface ColumnRowProps {
    id: string
    credential_name: string
    created_on: Date
} 

interface RenderColumnsProps {
    handleDeleteCredential: (id: string) => void
    handleOpenUpdateCredentialModal: (credential: Credential) => void
}

export const renderColumns = ({ handleDeleteCredential, handleOpenUpdateCredentialModal }: RenderColumnsProps) => {
    return [
        {
            Header: 'Credential Name',
            accessor: 'credential_name',
            minWidth: 300,
            width: 350,
        },
        {
            Header: 'Credential ID',
            accessor: 'id',
            minWidth: 300,
            width: 150,
            Cell: ({ row: { original: data } }: { row: { original: Pick<ColumnRowProps, 'id'> } }) => (
                <Typography 
                    fontSize={14} 
                    onClick={() => navigator.clipboard.writeText(data.id)}
                    sx={{ cursor: 'pointer', textDecoration: 'underline', display: 'flex' }}
                >
                    {data.id}
                    <CopyButton onCopyClick={() => navigator.clipboard.writeText(data.id)} />
                </Typography>
            )
        },
        {
            Header: 'Created',
            accessor: 'created_on',
            minWidth: 300,
            width: 350,
            Cell: DateRenderer
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            minWidth: 100,
            width: 130,
        
            Cell: ({ row: { original: data } }: { row: { original: Credential } }) => (
                <StyledActionWrapper>
                    <IconButton
                      onClick={() => handleOpenUpdateCredentialModal(data)}
                      icon={() => <StyledEditIcon />}
                      size={IconButton.sizes?.SMALL}
                      kind={IconButton.kinds?.TERTIARY}
                      ariaLabel='Edit'
                    />
                  <IconButton
                    onClick={() => handleDeleteCredential(data.id)}
                    icon={() => <StyledDeleteIcon />}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    ariaLabel='Delete'
                  />
                </StyledActionWrapper>
            ),
        },
    ]
}

const StyledActionWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -6px;

  .components-IconButton-IconButton-module__iconButtonContainer--ttuRB {
    &:hover {
      background: ${({ theme }) => theme.body.humanMessageBgColor};
      border-radius: 50%;
    }
  }
`