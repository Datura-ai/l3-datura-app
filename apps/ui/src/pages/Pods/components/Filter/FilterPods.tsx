import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Slider from '@mui/material/Slider'
import Button from '@mui/material/Button'
import TextField from 'share-ui/components/TextField/TextField'

import { black, white } from '../../styles'
// eslint-disable-next-line import/no-named-as-default
import Cloud from 'share-ui/components/Icon/Icons/components/Cloud'
import FineTuning from 'share-ui/components/Icon/Icons/components/FineTuning'
import Globe from 'share-ui/components/Icon/Icons/components/Globe'
import { DropDownMenu, DropDownItem } from 'components/DropDownMenu/DropDownMenu'
import ToggleButton from 'components/ToggleButton'
import useFilter, { cudaVersions, discTypeMarks, ramGpuMarks, regions, sliderMarks } from './useFilter'
import { TextFieldTextType } from 'share-ui/components/TextField/TextFieldConstants'
import MenuIcon from '@mui/icons-material/Menu';
const buttonStyles = {
  color: black,
  textTransform: 'capitalize',
  fontSize: '0.8125rem',
  fontWeight: 'bold',
}


const FilterPods = ({ values, handleChangeFilter }: any) => {
  // const { setFilter } = useFilter()
  const [hideMenu, setHideMenu] = React.useState(false)

  const onChange = (field: string, value: string | number | null) => {
    if(value) {
      handleChangeFilter(field, value)
    }
  }

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} alignItems={'center'}>
        <ToggleButton 
          options={[{ label: "GPU", value: 'gpu' }, { label: "CPU", value: 'cpu'}]} 
          onChange={() => {}}
          value={'gpu'}
        />
      
        <Box ml={2} display={'flex'} alignItems={'center'}>

          <DropDownMenu
            buttonContent={() => (
              <Box display={'flex'} alignItems={'center'}>
                <Cloud size={20} /> 
                <Typography ml={1} sx={buttonStyles}>
                  {values.cloud_type}
                </Typography>
              </Box>
            )}
          >
            <DropDownItem handleSelect={() => onChange('cloud_type', 'Secure Cloud')}>Secure Cloud</DropDownItem>
            <DropDownItem handleSelect={() => onChange('cloud_type', 'Community Cloud')}>Community Cloud</DropDownItem>
          </DropDownMenu>

          <Button color='primary' size='small' sx={buttonStyles}>
             <Box display={'flex'} alignItems={'center'}>
               <FineTuning size={30} />
              <Typography ml={0.5} sx={buttonStyles}>
                Network Volume
              </Typography>
            </Box>
          </Button>

          <DropDownMenu
            buttonContent={() => (
              <Box display={'flex'} alignItems={'center'}>
                <Globe size={20} />
                <Typography ml={0.5} sx={buttonStyles}>
                  {values.region}
                </Typography>
              </Box>
            )}
          >
            {regions.map((region: string, index: number) => (
              <DropDownItem 
                handleSelect={() => onChange('region', region)}
                key={index}
              >
                 {region}
              </DropDownItem>
            ))}
          </DropDownMenu>

          <Button color='primary' size='small' sx={buttonStyles} onClick={() => setHideMenu((i) => !i)}>
            <MenuIcon />
          </Button>
        </Box>
      </Box>

        <Box sx={{ height: hideMenu ? '100px' : '0px', transition: '0.3s', overflow: 'hidden' }}>
          <Box mt={2} display={'flex'} alignItems={'center'}>
            <Box display={'fle'} flexDirection={'column'} ml={1}>
              <Typography fontSize={10} mt={1.3}>
                vCPUs / GPU
              </Typography>
              <Box mt={"5px"} width={'100px'}>
                <TextField 
                  onChange={(value: string) => onChange('vcpu', value)}
                  size="small"
                  type={TextFieldTextType.NUMBER}
                  value={values.vcpu}
                  min={1}
                />
              </Box>
            </Box>
            <Box display={'fle'} flexDirection={'column'} ml={2}>
              <Typography fontSize={10}>
                RAM / GPU
              </Typography>
              <Box mt={1}>
                <ToggleButton 
                  options={ramGpuMarks} 
                  onChange={(value: string | number | null) => onChange('ram', value)}
                  value={values.ram}
                />
              </Box>
            </Box>
            <Box display={'fle'} flexDirection={'column'} ml={2}>
              <Typography fontSize={10} >
                Disc Type
              </Typography>
              <Box mt={1}>
                <ToggleButton 
                  options={discTypeMarks} 
                  onChange={(value: string | number | null) => onChange('disc_type', value)}
                  value={values.disc_type}
                />
              </Box>
            </Box>
            <Box display={'fle'} flexDirection={'column'} ml={2}>
              <Typography fontSize={10}>
                CUDA Versions
              </Typography>
              <Box mt={1}>
                <DropDownMenu
                  customStyles={{
                    border: '1px solid #000000',
                    borderRadius: '10px',
                    padding: '7px'
                  }}
                  buttonContent={() => (
                    <Box display={'flex'} flexDirection={'column'}>
                      <Typography ml={0.5} sx={buttonStyles}>
                        {values.cuda_version}
                      </Typography>
                    </Box>
                  )}
                >
                  {cudaVersions.map((cuda: string, index: number) => (
                    <DropDownItem 
                      handleSelect={() => onChange('cuda_version', cuda)}
                      key={index}
                    >
                      {cuda}
                    </DropDownItem>
                  ))}
                </DropDownMenu>
              </Box>
            </Box>

            </Box>
        </Box>


      <Box
        mt={2}
        p={2}
        display={'flex'}
        flexDirection={'column'}
        sx={{
          width: '100%',
          borderRadius: '10px',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        }}
      >
        <Typography color='rgba(34, 51, 84, 0.7)' fontSize={14}>
          Filter GPUs by VRAM
        </Typography>
        <Slider
          aria-label='Custom marks'
          defaultValue={values.vram}
          getAriaValueText={value => `${value}`}
          valueLabelDisplay='auto'
          step={1}
          max={10}
          min={0}
          marks={sliderMarks}
          sx={{ color: black }}
          size='small'
        />
      </Box>
    </Box>
  )
}

export default FilterPods
