import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'

export default function ActionAreaCard({ item, selected, selectCard }: any) {
  const color = 'rgba(34, 51, 84, 0.7)'
  const isSelected = selected && selected === item.id

  return (
    <Card
      sx={{
        width: '100%',
        border: 'none',
        boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
        background: '#FFF',
        borderRadius: '10px',
      }}
      onClick={() => selectCard(item.id)}
    >
      <CardActionArea
        sx={{
          boxShadow: 'none',
          borderRadius: '10px',
          ...(isSelected ? { backgroundColor: 'rgba(50, 50, 50, 0.1)' } : {}),
          ...(isSelected ? { border: '1px solid #000' } : { border: '1px solid transparent' }),
        }}
      >
        <CardContent
          sx={{
            border: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography gutterBottom component='div' fontSize={16}>
                {item.name}
              </Typography>
              <Typography gutterBottom component='div' fontSize={14}>
                {item.price}
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
              mt={2}
            >
              <Typography gutterBottom component='div' fontSize={13} color={color}>
                {item.ram}
              </Typography>
              <Typography gutterBottom component='div' fontSize={11} color={color}>
                8 max
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography gutterBottom component='div' fontSize={13} color={color}>
                {item.vram} * {item.cram}
              </Typography>
              <Typography gutterBottom component='div' fontSize={11} color={'#17C568'}>
                High
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}