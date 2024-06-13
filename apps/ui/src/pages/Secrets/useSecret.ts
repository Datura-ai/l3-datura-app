import { useNavigate } from 'react-router-dom'
import { useGetSecrets } from 'services/secret/useSecretService'
import { renderColumns } from './columnConfig'
import React, { useContext } from 'react'
import { ToastContext } from 'contexts'

const useSecret = () => {
    const { setToast } = useContext(ToastContext)
    const { data: secrets, loading: fetch_secret_loading, error } = useGetSecrets()

    React.useEffect(() => {
        if(error) {
            setToast({
               message: error?.message ?? 'Error fetching Secrets',
               type: 'negative',
               open: true,
           })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    const navigate = useNavigate()

    const handleCreateSecret = () => {
        navigate('/secrets/create-secret')
    }

    const handleOpenSecret = (secret_id: string) => {
        navigate(`/secrets/${secret_id}`)
    }

    const columns = renderColumns({ handleOpenSecret })
    
    return {
        columns,
        handleCreateSecret,
        secrets: secrets || [],
        fetch_secret_loading: fetch_secret_loading
    }
}

export default useSecret