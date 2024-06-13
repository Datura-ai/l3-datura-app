import styled from 'styled-components'
import { buttonStyles } from 'pages/Pods/styles'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'


const Template = () => {
  const navigate = useNavigate()

    return (
        <StyledContainer>
            <Button 
                onClick={() => navigate('/templates/create-template')}
                variant="contained"
                sx={{
                    ...buttonStyles,
                    width: '400px',
                    height: '150px'
                }}
                size='small'
            >
                Add new template
            </Button>
        </StyledContainer>
    )
}

export default Template

const StyledContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`