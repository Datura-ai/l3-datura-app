import TypographyQuaternary from 'components/Typography/Quaternary'

import { Download, PlayOutline, ReloadOutline } from 'share-ui/components/Icon/Icons'
import IconButton from 'share-ui/components/IconButton/IconButton'
import styled from 'styled-components'
import { StyledFormInputWrapper } from 'styles/formStyles.css'
import { StyledPanelWrapper } from 'styles/panelStyles.css'

const Logs = () => {
  const logs = TEMP_LOGS_DATA.trim().split('\n')

  return (
    <StyledPanelWrapper>
      <StyledFormInputWrapper>
        <StyledLogsContainer>
          <StyledLogsHeader>
            <TypographyQuaternary value='System Logs' bold size='medium' />

            <IconButton
              onClick={() => {}}
              icon={() => <ReloadOutline size={30} />}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='Refresh logs'
            />
            <IconButton
              onClick={() => {}}
              icon={() => <PlayOutline size={30} />}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='Tail logs'
            />
            <IconButton
              onClick={() => {}}
              icon={() => <Download size={50} />}
              size={IconButton.sizes?.SMALL}
              kind={IconButton.kinds?.TERTIARY}
              ariaLabel='Download logs'
            />
          </StyledLogsHeader>

          {logs.map((log, index) => (
            <LogLine key={index}>
              <LineNumber>{index + 1}</LineNumber>
              <LogText>{log}</LogText>
            </LogLine>
          ))}
        </StyledLogsContainer>
      </StyledFormInputWrapper>
    </StyledPanelWrapper>
  )
}

export default Logs

const TEMP_LOGS_DATA = `
2024-06-13T10:19:59Z stop container
2024-06-13T10:20:01Z remove container
2024-06-13T10:20:01Z remove network
2024-06-18T06:25:28Z create pod network
2024-06-18T06:25:28Z create container runpod/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
2024-06-18T06:25:29Z 2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04 Pulling from runpod/pytorch
2024-06-18T06:25:29Z Digest: sha256:b92b57c08bc4f8d5a0bb069018c3f49d20c7209c40dbeb44ccf8b472155821f3
2024-06-18T06:25:29Z Status: Image is up to date for runpod/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
2024-06-18T06:25:32Z start container
2024-06-18T06:26:01Z stop container
2024-06-18T06:26:02Z remove container
2024-06-18T06:26:02Z remove network
2024-06-18T06:26:42Z create pod network
2024-06-18T06:26:42Z create container runpod/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
2024-06-18T06:26:43Z 2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04 Pulling from runpod/pytorch
2024-06-18T06:26:43Z Digest: sha256:b92b57c08bc4f8d5a0bb069018c3f49d20c7209c40dbeb44ccf8b472155821f3
2024-06-18T06:26:43Z Status: Image is up to date for runpod/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
2024-06-18T06:26:46Z start container
2024-06-18T06:26:55Z stop container
2024-06-18T06:26:57Z remove container
2024-06-18T06:26:57Z remove network
2024-06-18T06:27:31Z create pod network
2024-06-18T06:27:32Z create container runpod/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
2024-06-18T06:27:33Z 2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04 Pulling from runpod/pytorch
2024-06-18T06:27:33Z Digest: sha256:b92b57c08bc4f8d5a0bb069018c3f49d20c7209c40dbeb44ccf8b472155821f3
2024-06-18T06:27:33Z Status: Image is up to date for runpod/pytorch:2.0.1-py3.10-cuda11.8.0-devel-ubuntu22.04
2024-06-18T06:27:35Z start container
2024-06-18T06:27:50Z stop container
2024-06-18T06:27:51Z remove container
2024-06-18T06:27:51Z remove network
`

const StyledLogsContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  font-family: monospace;
  display: flex;
  flex-direction: column;

  background-color: rgb(8, 8, 8);
  color: #d6d6d6;
  font-weight: 400;

  border-radius: 10px;
`

const StyledLogsHeader = styled.header`
  background-color: #333333;

  display: flex;
  align-items: center;
  gap: 4px;

  padding: 2px 14px;
`

const LogLine = styled.div`
  display: flex;
  align-items: start;
  padding: 2px 0;
`

const LineNumber = styled.span`
  width: 50px; // Adjust width as needed
  color: #888;
  text-align: right;
  padding-right: 10px; // Space between line number and log text
`

const LogText = styled.span`
  flex: 1;
  white-space: pre-wrap; // Maintains whitespace formatting of logs
`
