import Table from 'components/Table'
import styled from 'styled-components'

const Transactions = () => {
  return (
    <StyledTableWrapper>
      <Table columns={base} data={data} />
    </StyledTableWrapper>
  )
}
export default Transactions

export const StyledTableWrapper = styled.div`
  height: 100%;
  width: 100%;

  padding: 30px;
  padding-left: 0;
`

const base = [
  {
    Header: 'Time',
    accessor: 'time',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Platform',
    accessor: 'platform',
  },
  {
    Header: 'Amount',
    accessor: 'amount',
  },
  {
    Header: 'Invoice',
    accessor: 'invoice',
  },
]

const data = [
  { time: '3 Jun 2024 08:37', type: 'RELOAD', platform: 'STRIPE', amount: '$300', invoice: '' },
  { time: '4 Jun 2024 09:15', type: 'RELOAD', platform: 'STRIPE', amount: '$150', invoice: '' },
  { time: '5 Jun 2024 10:43', type: 'RELOAD', platform: 'STRIPE', amount: '$450', invoice: '' },
  { time: '6 Jun 2024 11:20', type: 'RELOAD', platform: 'STRIPE', amount: '$200', invoice: '' },
  { time: '7 Jun 2024 12:05', type: 'RELOAD', platform: 'STRIPE', amount: '$350', invoice: '' },
  { time: '8 Jun 2024 13:30', type: 'RELOAD', platform: 'STRIPE', amount: '$400', invoice: '' },
  { time: '9 Jun 2024 14:25', type: 'RELOAD', platform: 'STRIPE', amount: '$250', invoice: '' },
  { time: '10 Jun 2024 15:45', type: 'RELOAD', platform: 'STRIPE', amount: '$300', invoice: '' },
  { time: '11 Jun 2024 16:50', type: 'RELOAD', platform: 'STRIPE', amount: '$500', invoice: '' },
  { time: '12 Jun 2024 17:35', type: 'RELOAD', platform: 'STRIPE', amount: '$100', invoice: '' },
]
