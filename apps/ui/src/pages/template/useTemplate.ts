import { ToastContext } from 'contexts';
import { useModal } from 'hooks';
import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetTemplates, useDeleteTemplateService } from 'services/template/useTemplateService'


const useTemplate = () => {
    const { setToast } = useContext(ToastContext)
    const { openModal, closeModal } = useModal()
    const location = useLocation()
    const navigate = useNavigate()

    const { data: templates, loading: template_loading, refetch } = useGetTemplates()
    const { deleteTemplate, loading: delete_template_loading } = useDeleteTemplateService()

    React.useEffect(() => {
        if(!template_loading && location.pathname === '/templates') {
            refetch()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


    const handleDeleteTemplate = (id: string) => {
        openModal({
            name: 'delete-confirmation-modal',
            data: {
              deleteItem: async () => {
                try {
                    await deleteTemplate(id)
                    refetch()
                    navigate(`/templates`)
                    closeModal('delete-confirmation-modal')
      
                  setToast({
                    message: 'Template was deleted!',
                    type: 'positive',
                    open: true,
                  })
                } catch (e) {
                  setToast({
                    message: 'Failed to delete Template!',
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

    const handleEditTemplate = (template_id: string) => {
        navigate(`/templates/edit/${template_id}`)
    }

    return {
        templates,
        template_loading,
        handleDeleteTemplate,
        delete_template_loading,
        handleEditTemplate
    }
}


export default useTemplate