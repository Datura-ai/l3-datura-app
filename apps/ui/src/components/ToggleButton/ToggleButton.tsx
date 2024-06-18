import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const black = '#000000'
const white = 'rgb(255, 255, 255)'

const colors = {
    color: white,
    background: black,
}

const styles = {
    '.css-k9c1x3-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': colors,
    '.css-1ke8krz-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': colors,
    '.css-npkewm-MuiButtonBase-root-MuiToggleButton-root.Mui-selected': colors,
}

interface ToggleButtonProps {
    options: { label: string, value: string | number }[]
    value: string | number | null
    onChange: (value: string | number | null) => void
    icon?: JSX.Element
}

const CustomToggleButton = ({ value, onChange, options, icon }: ToggleButtonProps) => {
    return (
        <ToggleButtonGroup
            color='primary'
            value={value}
            exclusive
            onChange={(_, value) => onChange(value)}
            aria-label='Platform'
            sx={styles}
            >
            {options.map((option: { label: string, value: string | number }, index: number) => (
                <ToggleButton
                    key={index}
                    value={option.value}
                    size='small'
                    sx={{
                        ...(index === 0 && {
                            borderTopLeftRadius: '10px',
                            borderBottomLeftRadius: '10px',
                        }),
                        ...(index === options.length - 1 && {
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                        }),
                        fontWeight: 600,
                    }}
                >
                    {icon && icon}
                    <Typography sx={{ marginLeft: '5px' }} fontSize={14}>
                        {option.label}
                    </Typography>
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}   

export default CustomToggleButton