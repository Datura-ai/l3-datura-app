import TypographyPrimary from 'components/Typography/Primary'
import TypographySecondary from 'components/Typography/Secondary'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  //   CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import styled from 'styled-components'

const UsageChart = () => {
  return (
    <StyledChartWrapper>
      <StyledChartHeader>
        <StyledColumn>
          <TypographySecondary value='Rolling Average' size='xs-small' />
          <TypographyPrimary value='$32.90/day' size='medium' semiBold />
        </StyledColumn>

        <StyledColumn>
          <TypographySecondary value='Current Spend Rate' size='xs-small' />
          <TypographyPrimary value='$1.40/hr' size='medium' semiBold />
        </StyledColumn>
      </StyledChartHeader>

      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={TEMP_DATA} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
          {/* <CartesianGrid /> */}
          <XAxis dataKey='date' tick={{ fontSize: 11 }} stroke='#868686' />
          <YAxis
            tickFormatter={value => `$${value.toFixed(2)}`}
            tick={{ fontSize: 11 }}
            stroke='#868686'
          />
          <Tooltip
            formatter={value => `$${Number(value).toFixed(2)}`}
            wrapperStyle={{
              outline: 'none',
              border: 'none',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          />
          <Legend />
          <Bar dataKey='expenses.storage' stackId='a' fill='#17C568' name='Storage' />
          <Bar dataKey='expenses.pods' stackId='a' fill='#1B9DFE' name='Pods' />
          <Bar dataKey='expenses.runPod' stackId='a' fill='#EEA03C' name='RunPod Endpoints' />
          <Bar dataKey='expenses.serverless' stackId='a' fill='#8251CC' name='Serverless' />
        </BarChart>
      </ResponsiveContainer>
    </StyledChartWrapper>
  )
}

export default UsageChart

const StyledChartWrapper = styled.div`
  width: 100%;
  height: 100%;

  padding: 0 100px;

  /* scale: 0.9; */

  display: flex;
  flex-direction: column;

  gap: 30px;
`
const StyledChartHeader = styled.div`
  display: flex;
  align-items: center;

  gap: 50px;

  margin-left: 20px;
`
const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const TEMP_DATA = [
  {
    expenses: {
      storage: 2.1,
      pods: 15,
      runPod: 3,
      serverless: 5,
    },
    date: 'May 13, 2024',
    total: 25.1,
  },
  {
    expenses: {
      storage: 1.8,
      pods: 12,
      runPod: 4,
      serverless: 6,
    },
    date: 'May 14, 2024',
    total: 23.8,
  },
  {
    expenses: {
      storage: 2.5,
      pods: 18,
      runPod: 2,
      serverless: 4,
    },
    date: 'May 15, 2024',
    total: 26.5,
  },
  {
    expenses: {
      storage: 1.2,
      pods: 10,
      runPod: 5,
      serverless: 3,
    },
    date: 'May 16, 2024',
    total: 19.2,
  },
  {
    expenses: {
      storage: 3.0,
      pods: 20,
      runPod: 1,
      serverless: 7,
    },
    date: 'May 17, 2024',
    total: 31.0,
  },
  {
    expenses: {
      storage: 2.3,
      pods: 14,
      runPod: 6,
      serverless: 8,
    },
    date: 'May 18, 2024',
    total: 30.3,
  },
  {
    expenses: {
      storage: 1.7,
      pods: 16,
      runPod: 3,
      serverless: 5,
    },
    date: 'May 19, 2024',
    total: 25.7,
  },
  {
    expenses: {
      storage: 2.8,
      pods: 19,
      runPod: 4,
      serverless: 6,
    },
    date: 'May 20, 2024',
    total: 31.8,
  },
  {
    expenses: {
      storage: 1.9,
      pods: 13,
      runPod: 5,
      serverless: 7,
    },
    date: 'May 21, 2024',
    total: 26.9,
  },
  {
    expenses: {
      storage: 2.4,
      pods: 17,
      runPod: 2,
      serverless: 4,
    },
    date: 'May 22, 2024',
    total: 25.4,
  },
  {
    expenses: {
      storage: 1.5,
      pods: 11,
      runPod: 6,
      serverless: 3,
    },
    date: 'May 23, 2024',
    total: 21.5,
  },
  {
    expenses: {
      storage: 3.2,
      pods: 21,
      runPod: 1,
      serverless: 8,
    },
    date: 'May 24, 2024',
    total: 33.2,
  },
  {
    expenses: {
      storage: 2.6,
      pods: 15,
      runPod: 7,
      serverless: 9,
    },
    date: 'May 25, 2024',
    total: 33.6,
  },
  {
    expenses: {
      storage: 1.4,
      pods: 12,
      runPod: 8,
      serverless: 2,
    },
    date: 'May 26, 2024',
    total: 23.4,
  },
  {
    expenses: {
      storage: 2.9,
      pods: 22,
      runPod: 0,
      serverless: 10,
    },
    date: 'May 27, 2024',
    total: 34.9,
  },
  {
    expenses: {
      storage: 1.6,
      pods: 14,
      runPod: 9,
      serverless: 1,
    },
    date: 'May 28, 2024',
    total: 25.6,
  },
  {
    expenses: {
      storage: 3.1,
      pods: 23,
      runPod: 2,
      serverless: 11,
    },
    date: 'May 29, 2024',
    total: 39.1,
  },
  {
    expenses: {
      storage: 1.3,
      pods: 9,
      runPod: 10,
      serverless: 0,
    },
    date: 'May 30, 2024',
    total: 20.3,
  },
  {
    expenses: {
      storage: 2.7,
      pods: 18,
      runPod: 3,
      serverless: 12,
    },
    date: 'May 31, 2024',
    total: 35.7,
  },
  {
    expenses: {
      storage: 2.0,
      pods: 16,
      runPod: 4,
      serverless: 13,
    },
    date: 'June 1, 2024',
    total: 35.0,
  },
  {
    expenses: {
      storage: 1.1,
      pods: 8,
      runPod: 11,
      serverless: 1,
    },
    date: 'June 2, 2024',
    total: 21.1,
  },
  {
    expenses: {
      storage: 3.4,
      pods: 24,
      runPod: 0,
      serverless: 14,
    },
    date: 'June 3, 2024',
    total: 41.4,
  },
  {
    expenses: {
      storage: 1.0,
      pods: 7,
      runPod: 12,
      serverless: 0,
    },
    date: 'June 4, 2024',
    total: 20.0,
  },
]
