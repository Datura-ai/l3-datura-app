import styled from 'styled-components'

export const StyledFormWrapper = styled.div`
  width: 100%;

  height: calc(100vh - 210px);

  max-height: 1500px;
`
export const StyledFormRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
`
export const StyledFormInputWrapper = styled.div<{ noPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 100%;
  padding: ${props => (props.noPadding ? '0' : '0 20px')};
`
export const StyledHeaderTextWrapper = styled.div`
  width: 100%;
`
export const StyledAbsoluteLoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
