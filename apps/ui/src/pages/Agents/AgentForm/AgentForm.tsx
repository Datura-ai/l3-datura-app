import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

import Typography from '@l3-lib/ui-core/dist/Typography'
import Checkbox from '@l3-lib/ui-core/dist/Checkbox'
import Textarea from '@l3-lib/ui-core/dist/Textarea'

import FormikTextField from 'components/TextFieldFormik'

import CustomField from './components/CustomField'
import AgentSlider from './components/AgentSlider'
import { useAgentForm } from './useAgentForm'
import AgentDropdown from './components/AgentDropdown'
import TypographyPrimary from 'components/Typography/Primary'
import ShowAdvancedButton from './components/ShowAdvancedButton'

type AgentFormProps = {
  formik: any
}

const AgentForm = ({ formik }: AgentFormProps) => {
  const advancedRef = useRef(null as any)
  const scrollToAdvancedRef = () => {
    if (advancedRef) {
      setTimeout(function () {
        advancedRef.current?.scrollIntoView({ behavior: 'smooth' })
      }, 1)
    }
  }

  const { setFieldValue, values } = formik
  const {
    agent_datasources,
    agent_model,
    agent_description,
    agent_is_memory,
    agent_tools,
    agent_greeting,
    agent_text,
    agent_temperature,
  } = values

  const [showAdvanced, setShowAdvanced] = useState(agent_text?.length > 0 ? true : false)

  const onTextareaChange = (field: string, value: string) => {
    formik.setFieldValue(field, value)
  }

  const { modelOptions, datasourceOptions, toolOptions } = useAgentForm(formik)

  useEffect(() => {
    if (agent_model === '' && modelOptions?.length > 0) {
      setFieldValue('agent_model', modelOptions[2].value)
    }
  }, [agent_model])

  return (
    <StyledRoot>
      <StyledForm>
        <StyledInputWrapper>
          <FormikTextField name='agent_name' placeholder='Name' label='Name' />

          <FormikTextField name='agent_role' placeholder='Role' label='Role' />

          <StyledTextareaWrapper>
            <TypographyPrimary
              value='Description'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <Textarea
              hint=''
              rows={6}
              placeholder='Description'
              value={agent_description}
              name='agent_description'
              onChange={(value: string) => onTextareaChange('agent_description', value)}
            />
          </StyledTextareaWrapper>

          <AgentDropdown
            isMulti
            label={'Tools'}
            fieldName={'agent_tools'}
            fieldValue={agent_tools}
            setFieldValue={setFieldValue}
            options={toolOptions}
          />

          <AgentDropdown
            isMulti
            label={'Data source'}
            fieldName={'agent_datasources'}
            fieldValue={agent_datasources}
            setFieldValue={setFieldValue}
            options={datasourceOptions}
          />

          <CustomField
            formik={formik}
            formikField={'agent_suggestions'}
            placeholder={'Suggestion'}
          />

          <StyledTextareaWrapper>
            <TypographyPrimary
              value='Greeting'
              type={Typography.types.LABEL}
              size={Typography.sizes.md}
            />
            <Textarea
              hint=''
              rows={6}
              placeholder='Greeting'
              value={agent_greeting}
              name='agent_greeting'
              onChange={(value: string) => onTextareaChange('agent_greeting', value)}
            />
          </StyledTextareaWrapper>

          <StyledCombinedFields>
            <AgentDropdown
              label={'Model'}
              fieldName={'agent_model'}
              setFieldValue={setFieldValue}
              fieldValue={agent_model}
              options={modelOptions}
              onChange={() => {
                setFieldValue('agent_model', '')
              }}
              optionSize={'small'}
            />
            <AgentSlider
              onChange={(value: number) => setFieldValue('agent_temperature', value / 10)}
              value={agent_temperature}
            />
          </StyledCombinedFields>

          <StyledCheckboxWrapper>
            <Checkbox
              label='Memory'
              kind='secondary'
              name='agent_is_memory'
              checked={agent_is_memory}
              onChange={() => setFieldValue('agent_is_memory', !agent_is_memory)}
            />
          </StyledCheckboxWrapper>

          <CustomField formik={formik} formikField={'agent_goals'} placeholder={'Goal'} />

          <CustomField
            formik={formik}
            formikField={'agent_instructions'}
            placeholder={'Instruction'}
          />

          <CustomField
            formik={formik}
            formikField={'agent_constraints'}
            placeholder={'Constraint'}
          />

          <ShowAdvancedButton
            isShow={showAdvanced}
            onClick={() => {
              setShowAdvanced(!showAdvanced)
              scrollToAdvancedRef()
            }}
          />

          {showAdvanced && (
            <StyledTextareaWrapper>
              <TypographyPrimary
                value='Script'
                type={Typography.types.LABEL}
                size={Typography.sizes.md}
              />
              <Textarea
                hint=''
                rows={6}
                value={agent_text}
                name='agent_text'
                onChange={(value: string) => onTextareaChange('agent_text', value)}
              />
              <div ref={advancedRef} />
            </StyledTextareaWrapper>
          )}
        </StyledInputWrapper>
      </StyledForm>
    </StyledRoot>
  )
}

export default AgentForm

const StyledRoot = styled.div`
  width: 100%;

  height: 100%;
  overflow-y: scroll;
`

const StyledForm = styled.div`
  width: 100%;
  /* max-width: 600px; */
  height: 100%;
  max-height: 100%;
  /* overflow: scroll; */

  /* margin-top: 40px; */
  display: flex;
  justify-content: center;
`

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0 20px;

  gap: 20px;
  width: 100%;
  max-width: 800px;
  /* margin: auto; */
  height: 100%;
  /* max-height: 800px; */
`

export const StyledTextareaWrapper = styled.div`
  font: var(--font-general-label);
  line-height: 22px;
  font-size: 10px;

  height: fit-content;

  display: flex;
  flex-direction: column;
  gap: 10px;

  .components-Textarea-Textarea-module__textarea--Qy3d2 {
    font-size: 14px;
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    color: ${({ theme }) => theme.body.textColorPrimary};
    background: ${({ theme }) => theme.body.textAreaBgColor};
    &::placeholder {
      color: ${({ theme }) => theme.body.placeHolderColor};
    }
  }
`
const StyledCheckboxWrapper = styled.div`
  height: fit-content;
  padding-bottom: 5px;
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__checkbox {
    border-color: ${({ theme }) => theme.typography.contentPrimary};
  }
  .l3-style-checkbox--kind-secondary .l3-style-checkbox__label {
    color: ${({ theme }) => theme.typography.contentPrimary};
  }
`
export const StyledCombinedFields = styled.div`
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;

  gap: 20px;
  .dropdown-wrapper.primary__wrapper.css-7xl64p-container {
    border: 3px solid ${({ theme }) => theme.body.textareaBorder};
    height: auto;
  }
  .css-ugu73m-placeholder {
    color: ${({ theme }) => theme.body.textColorPrimary};
  }
`
