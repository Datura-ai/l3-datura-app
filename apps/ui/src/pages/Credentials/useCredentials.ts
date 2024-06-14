import { ToastContext } from "contexts"
import { useModal } from "hooks"
import { useContext } from "react"
import { useGetCredentials, useDeleteCredentialService } from 'services/credential/useCredentialService'
import { renderColumns } from './columnConfig'
import { Credential } from "types/credential"

const useCredentials = () => {
    const { setToast } = useContext(ToastContext)
    const { closeModal, openModal } = useModal()

    const { data: credentials, refetch, loading: fetch_credentials_loading } = useGetCredentials()
    const { deleteCredential } = useDeleteCredentialService()


    const handleOpenCreateCredentialModal = () => {
        openModal({
            name: "create-credential-modal",
            data: {
                refetch
            }
        })
    }

    const handleOpenUpdateCredentialModal = (credential: Credential) => {
        openModal({
            name: "update-credential-modal",
            data: {
                refetch,
                credential
            }
        })
    }

    const handleDeleteCredential = async (id: string) => {
        openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: async () => {
                try {
                    await deleteCredential(id)
                    refetch()
                    closeModal('delete-confirmation-modal')
      
                  setToast({
                    message: 'Credential was deleted!',
                    type: 'positive',
                    open: true,
                  })
                } catch (e) {
                  setToast({
                    message: 'Failed to delete Credential!',
                    type: 'negative',
                    open: true,
                  })
                  closeModal('delete-confirmation-modal')
                }
              },
              label: 'Delete Template?',
            },
        })
    }

    const columns = renderColumns({ 
        handleDeleteCredential, 
        handleOpenUpdateCredentialModal
    })

    return {
        handleOpenCreateCredentialModal,
        columns,
        credentials,
        fetch_credentials_loading,
    }
}

export default useCredentials