
import moment from 'moment'
import Typography from '@mui/material/Typography'

// eslint-disable-next-line react/prop-types
const DateRenderer: React.FC<{ value: Date }> = ({ value }) => {
    const formattedDate = moment(value).fromNow()
    return <span>{formattedDate}</span>
}

interface ColumnRowProps {
    id: string
    secret_name: string
    secret_description: string
    created_on: Date
    last_retrieved_on: Date
} 

const baseConfig = [
    {
        Header: 'Description',
        accessor: 'secret_description',
        minWidth: 300,
        width: 350,
    },
    {
        Header: 'Created',
        accessor: 'created_on',
        minWidth: 250,
        width: 300,
        Cell: DateRenderer,
    },
    {
        Header: 'Last Retrieved',
        accessor: 'last_retrieved_on',
        minWidth: 100,
        width: 140,
        Cell: DateRenderer,
    },
]

interface RenderColumnsProps {
    handleOpenSecret: (id: string) => void
}

export const renderColumns = ({ handleOpenSecret }: RenderColumnsProps) => {
    return [
        {
            Header: 'Secret Name',
            accessor: 'secret_name',
            minWidth: 100,
            width: 150,
            Cell: ({ row: { original: data } }: { row: { original: Pick<ColumnRowProps, 'secret_name' | 'id'> } }) => (
                <Typography 
                    color={'#005bff'} 
                    fontSize={14} 
                    onClick={() => handleOpenSecret(data.id)}
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                    {data.secret_name}
                </Typography>
            )
        },
        ...baseConfig
    ]
}

export const settingsActions = ({ handleActionClick }: { handleActionClick: (action: string) => void }) => {
    return [
        {
            label: 'Edit Secret Value',
            function: () => handleActionClick('secret-value'),
        },
        {
            label: 'Edit Secret Description',
            function: () => handleActionClick('secret-description'),
        },
        {
            label: 'Delete Secret',
            function: () => handleActionClick('delete'),
        },
    ]
}