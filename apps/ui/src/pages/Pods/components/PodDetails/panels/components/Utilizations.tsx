import TypographyPrimary from 'components/Typography/Primary'
import ProgressBar from 'pages/Pods/ProsgressBar'
import styled from 'styled-components'

const Utilization = () => {
  return (
    <StyledUsageWrapper>
      <StyledColumn>
        <StyledBarSection>
          <TypographyPrimary value='Pod Utilization' semiBold size='medium' />
          <div>
            <ProgressBar value={1} label='CPU' showPercentage />
            <ProgressBar value={2} label='MEM' showPercentage />
          </div>
        </StyledBarSection>
        <StyledBarSection>
          <TypographyPrimary value='Disk Utilization' semiBold size='medium' />

          <div>
            <ProgressBar value={14} label='Container' showPercentage />
            <ProgressBar value={28} label='Volume' showPercentage />
          </div>
        </StyledBarSection>
      </StyledColumn>

      <StyledRow>
        <StyledBarSection>
          <TypographyPrimary value='GPU Utilization' semiBold size='medium' />

          <div>
            <ProgressBar value={0} label='AVG' showPercentage />
            <ProgressBar value={0} label='0' showPercentage />
            <ProgressBar value={0} label='1' showPercentage />
          </div>
        </StyledBarSection>

        <StyledBarSection>
          <TypographyPrimary value='GPU Memory Used' semiBold size='medium' />

          <div>
            <ProgressBar value={0} label='AVG' showPercentage />
            <ProgressBar value={0} label='0' showPercentage />
            <ProgressBar value={0} label='1' showPercentage />
          </div>
        </StyledBarSection>
      </StyledRow>
    </StyledUsageWrapper>
  )
}

export default Utilization

const StyledUsageWrapper = styled.div`
  display: flex;

  width: 100%;

  gap: 20px;

  @media (max-width: 1500px) {
    flex-direction: column;
  }
`
const StyledRow = styled.div`
  display: flex;
  gap: 30px;

  width: 100%;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  width: 100%;
`
const StyledBarSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
