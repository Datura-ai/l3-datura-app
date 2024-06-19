import { Option, useAppModeContext } from 'context/AppModeContext'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateAccountService, useGetAccounts } from 'services/Account/useAccountService'

export const MODE_OPTIONS: Option[] = [
    {
      type: 'compute',
      name: 'Compute',
      icon: 'https://cdn-icons-png.freepik.com/512/929/929574.png',
    },
    {
      type: 'subnet_api',
      name: 'Subnet API',
      icon: 'https://cdn-icons-png.flaticon.com/512/319/319559.png',
    },
  ]

const useCreateNewApp = () => {
    const navigate = useNavigate()
    const [step, setStep] = React.useState(1)
    const [created, setCreated] = React.useState(false)

    // const { data } = useGetAccounts()

    // console.log('data', data)

    // const nextStep = () => setStep(step + 1)
    // const prevStep = () => setStep(step - 1)

    

    // const { options } = useAppModeContext()
    const { createAccount, loading: create_account_loading } = useCreateAccountService()
    const { setToast } = useContext(ToastContext)

    const formik = useFormik({
        initialValues: { 
            name: '',
            configs: MODE_OPTIONS[0]
        },
        // validationSchema: validationSchema,
        onSubmit: values => handleSubmit(values),
    })

    async function handleSubmit(values: any) {
        // navigate(`/create-new-app`, { state: { need_refetch: true } })
        // return
        const data = {
            name: values.name,
            configs: {
                account_type: values.configs.type,
            }
        }
        const result = await createAccount(data)

        // console.log('result', result)

        if(result) {
            setToast({
                message: result.message,
                type: result.success ? 'positive' : 'warning',
                open: true,
            })
        }

        setCreated(true)
        navigate(`/create-new-app`, { state: { need_refetch: true } })
        setStep(step + 1)
    }

    const handleSetStep = (active_step: number) => {
        if(active_step === 1) {
            setStep(active_step)
        }
        if(active_step === 2 && formik.values.configs.type) {
            setStep(active_step)
            return
        }

        if(active_step === 3 && formik.values.name) {
            if(active_step === 3 && !created) {
                formik.submitForm()
                return
            }  
            setStep(active_step)
            return
        }
        
    }

    return {
        formik,
        step,
        handleSetStep,
        create_account_loading
    }
}

export default useCreateNewApp