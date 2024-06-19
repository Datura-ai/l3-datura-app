import LinearProgress from '@mui/material/LinearProgress'
import TypographySecondary from 'components/Typography/Secondary'
import styled, { css } from 'styled-components'

const ProgressBar = ({
  value,
  label,
  large,
  showPercentage,
}: {
  value: number
  label?: string
  large?: boolean
  showPercentage?: boolean
}) => {
  return (
    <StyledWrapper>
      {label && (
        <StyledTextWrapper>
          <TypographySecondary value={label} size='small' />
        </StyledTextWrapper>
      )}

      <StyledBarWrapper hasLabel={label ? true : false}>
        <LinearProgress
          style={{
            width: '100%',
            height: large ? '10px' : '6px',
            borderRadius: '10px',
          }}
          variant='determinate'
          value={value}
        />
        {showPercentage && (
          <StyledPercentageWrapper>
            <TypographySecondary value={`${value}%`} size='small' />
          </StyledPercentageWrapper>
        )}
      </StyledBarWrapper>
    </StyledWrapper>
  )
}

export default ProgressBar

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 5px;
`
const StyledTextWrapper = styled.div`
  margin-right: auto;
`
const StyledBarWrapper = styled.div<{ hasLabel?: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;

  width: 100%;

  ${props =>
    props.hasLabel &&
    css`
      width: 85%;
    `}
`
const StyledPercentageWrapper = styled.div`
  width: 40px;
`
