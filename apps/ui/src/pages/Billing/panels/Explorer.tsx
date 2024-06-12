import Table from 'components/Table'
import { StyledTableWrapper } from './Transactions'

const Explorer = () => {
  return (
    <StyledTableWrapper>
      <Table columns={base} data={[]} />
    </StyledTableWrapper>
  )
}
export default Explorer

const base = [
  {
    Header: 'Date',
    accessor: 'date',
  },
  {
    Header: 'Total',
    accessor: 'total',
  },
  {
    Header: 'GPU cloud',
    accessor: 'gpu_cloud',
  },
  {
    Header: 'CPU cloud',
    accessor: 'cpu_cloud',
  },
  {
    Header: 'Endpoint',
    accessor: 'endpoint',
  },
  {
    Header: 'Serverless',
    accessor: 'serverless',
  },
  {
    Header: 'Storage',
    accessor: 'storage',
  },
]
