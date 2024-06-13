import Table from 'components/Table'
import useSharedAccess from './useSharedAccess'
import { StyledSectionWrapper } from 'pages/Home/homeStyle.css'
import { StyledTableWrapper } from 'pages/Billing/panels/Transactions'

const SharedAccess = () => {
  const { columns, data, fetch_data_loading } = useSharedAccess()
  return (
    <StyledSectionWrapper>
      <StyledTableWrapper>
        <Table columns={columns} data={data} isLoading={fetch_data_loading} />
      </StyledTableWrapper>
    </StyledSectionWrapper>
  )
}

export default SharedAccess
