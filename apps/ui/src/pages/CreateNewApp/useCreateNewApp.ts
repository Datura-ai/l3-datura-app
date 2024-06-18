import { Option, useAppModeContext } from 'context/AppModeContext'
import { ToastContext } from 'contexts'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
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
    const [step, setStep] = React.useState(1)

    // const { data } = useGetAccounts()

    // console.log('data', data)

    // const nextStep = () => setStep(step + 1)
    // const prevStep = () => setStep(step - 1)

    

    // const { options } = useAppModeContext()
    const { createAccount } = useCreateAccountService()
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
        const data = {
            name: values.name,
            configs: {
                account_type: values.configs.type
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

            // if(result.success) {
                //     navigate(`/templates`)
                // }
        }
        setStep(step + 1)
    }

    const handleSetStep = (active_step: number) => {
        if (step === 2) {
            formik.submitForm()
            return
        }   
        setStep(active_step)
    }
    


    // console.log('formik', formik.values)

    return {
        formik,
        step,
        handleSetStep
    }
}

export default useCreateNewApp