import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSecretById, useDeleteSecretService } from 'services/secret/useSecretService'
import { settingsActions } from '../columnConfig'
import { useModal } from 'hooks'
import { editDescription, editSecretValue } from './SecretDetails'
import React, { useContext } from 'react'
import { ToastContext } from 'contexts'

const useSecretDetails = () => {
    const { setToast } = useContext(ToastContext)
    const { closeModal, openModal } = useModal()
    const navigate = useNavigate()

    const [secret_fields, setSecret] = React.useState({
        secret_value: '',
        secret_description: ''
    })

    const { id } = useParams()
    const { data: secret, loading: fetch_secret_loading } = useGetSecretById(id)
    const { deleteSecret } = useDeleteSecretService()

    React.useEffect(() => {
        if(secret && !fetch_secret_loading) {
            setSecret({ ...secret_fields, secret_description: secret.secret_description })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secret])

    const handleCopyText = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const formatDate = (date: string) => {
        return date ? moment(date).format('DD/MM/YYYY HH:mm:ss') : 'Never'
    }

    const handleDeleteSecret = async () => {
        openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: async () => {
                try {
                    await deleteSecret(id)
                    navigate(`/secrets`, { state: { need_refetch: true } })
                    closeModal('delete-confirmation-modal')
      
                  setToast({
                    message: 'Secret was deleted!',
                    type: 'positive',
                    open: true,
                  })
                } catch (e) {
                  setToast({
                    message: 'Failed to delete Secret!',
                    type: 'negative',
                    open: true,
                  })
                  closeModal('delete-confirmation-modal')
                }
              },
              label: 'Delete Secret?',
            },
        })
    }

    const handleChangeInput = (field: string, value: string) => {
        setSecret({ ...secret_fields, [field]: value})
    }

    const handleUpdateSecret = (field: string) => {
        // TODO update secret 
        navigate(`/secrets`, { state: { need_refetch: true } })
    }

    const handleActionClick = (action: string) => {
        switch (action) {
            case 'secret-value':
                return openModal({ 
                    name: 'edit-secret-modal', 
                    data: { 
                        renderComponent: editSecretValue({ 
                            handleChangeInput, 
                            field: 'secret_name', 
                            value:  secret_fields.secret_value
                        }),
                        handleUpdateSecret,
                        field: 'secret_name', 
                    } 
                })

            case 'secret-description':
                return openModal({ 
                    name: 'edit-secret-modal', 
                    data: { 
                        renderComponent: editDescription({ 
                            handleChangeInput, 
                            field: 'secret_description',
                            value:  secret_fields.secret_description
                        }), 
                        handleUpdateSecret,
                        field: 'secret_description', 
                    } 
                })
            case 'delete':
                return handleDeleteSecret()
            default:
                // eslint-disable-next-line no-console
                console.log('No actions clicked!')
                return
        }
    }

    const actions = settingsActions({ handleActionClick })

    return {
        secret,
        fetch_secret_loading,
        handleCopyText,
        formatDate,
        actions
    }
}

export default useSecretDetails