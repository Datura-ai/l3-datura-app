
import { FormikProvider } from 'formik'
import { StyledFormRoot } from 'styles/formStyles.css'

import {
    StyledSectionWrapper,
  } from 'pages/Home/homeStyle.css'
import { StyledButtonWrapper } from 'pages/Agents/AgentForm/CreateAgentForm'
import { ButtonPrimary } from 'components/Button/Button'
import Button from 'share-ui/components/Button/Button'

import Loader from 'share-ui/components/Loader/Loader'
import TemplateForm from '../components/TemplateForm'
import useEditTemplate from './useEditTemplate'

const EditTemplate = () => {
    const { formik, update_template_loading} = useEditTemplate()
    return (
        <FormikProvider value={formik}>
            <StyledSectionWrapper>

                <StyledFormRoot>
                    <TemplateForm formik={formik} label="Edit Template" />
                </StyledFormRoot>
                <StyledButtonWrapper>
                    <ButtonPrimary
                        onClick={formik.handleSubmit}
                        size={Button.sizes?.MEDIUM}
                        disabled={update_template_loading}
                    >
                    {update_template_loading ? <Loader size={32} /> : 'Save Template'}
                    </ButtonPrimary>
                </StyledButtonWrapper>
            </StyledSectionWrapper>
        </FormikProvider>
    )
}

export default EditTemplate