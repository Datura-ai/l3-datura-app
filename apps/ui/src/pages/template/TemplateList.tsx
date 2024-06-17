import Box from '@mui/material/Box'
import Loader from 'share-ui/components/Loader/Loader'
import Typography from '@mui/material/Typography'

import useTemplate from './useTemplate'
import strCutter from 'utils/strCutter'

import IconButton from 'share-ui/components/IconButton/IconButton'
import {
  StyledDeleteIcon,
  StyledEditIcon,
} from 'pages/TeamOfAgents/TeamOfAgentsCard/TeamOfAgentsCard'
import { Template } from 'types/template'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const TemplateList = () => {
  const {
    templates,
    template_loading,
    handleDeleteTemplate,
    delete_template_loading,
    handleEditTemplate,
    navigate,
  } = useTemplate()

  const params = useParams()

  useEffect(() => {
    if (templates?.length > 0) {
      handleEditTemplate(templates[0].id)
    } else {
      navigate('/templates/create-template')
    }
  }, [templates])

  return (
    <Box position={'relative'}>
      {templates.map((item: Template, index: number) => (
        <Box key={index}>
          {template_loading && !templates.length && (
            <Box position={'absolute'} zIndex={5} sx={{ left: '40%' }}>
              <Loader size={50} />
            </Box>
          )}
          <Box
            display={'flex'}
            onClick={() => handleEditTemplate(item.id)}
            mt={1}
            sx={{
              width: '100%',
              background: 'rgb(255, 255, 255)',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
              '&:hover': {
                backgroundColor: 'rgb(250, 250, 250)',
              },
              ...(params?.id === item.id ? { backgroundColor: 'rgba(50, 50, 50, 0.1)' } : {}),
              ...(params?.id === item.id
                ? { border: '1px solid #000' }
                : { border: '1px solid transparent' }),
            }}
          >
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              sx={{ padding: '1rem .5rem', width: '100%' }}
            >
              <Box display={'flex'}>
                <img
                  src='https://cdn.worldvectorlogo.com/logos/elastic-cloud.svg'
                  alt=''
                  width={60}
                />
                <Box display={'flex'} flexDirection={'column'}>
                  <Typography fontSize={13} fontWeight={700}>
                    {strCutter(item.name, 25, true)}
                  </Typography>
                  <Typography fontSize={10}>{strCutter(item.container_image, 40, true)}</Typography>
                  <Typography fontSize={10}>{item.container_start_command}</Typography>
                </Box>
              </Box>

              <Box
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-between'}
                alignItems={'flex-end'}
              >
                <Box display={'flex'}>
                  <Typography fontSize={12} fontWeight={500} mr={1} textTransform={'capitalize'}>
                    {item.template_type}
                  </Typography>
                  <Typography fontSize={12} fontWeight={500} textTransform={'capitalize'}>
                    {item.compute_type}
                  </Typography>
                </Box>
                <Box display={'flex'}>
                  <IconButton
                    onClick={() => handleEditTemplate(item.id)}
                    icon={() => <StyledEditIcon />}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    ariaLabel='Edit'
                  />
                  <IconButton
                    onClick={() => handleDeleteTemplate(item.id)}
                    icon={() => <StyledDeleteIcon />}
                    size={IconButton.sizes?.SMALL}
                    kind={IconButton.kinds?.TERTIARY}
                    ariaLabel='Delete'
                    disabled={delete_template_loading}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

export default TemplateList
