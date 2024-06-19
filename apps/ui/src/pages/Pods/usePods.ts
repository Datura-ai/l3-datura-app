import React from "react";
import { useGetPods } from "services/pod/usePodService";
import { useGetResources } from "services/resource/useResourceService";
import { Resource } from "types/resource";
import { useLocation } from 'react-router-dom'
import { useFormik } from 'formik'


const groupByType = (data: any) => {
    return data.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
        acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
    }, {});
};


export const usePod = () => {
    const { data: pods, refetch, loading: pods_loading } = useGetPods()
    const location = useLocation();
    const prevLocation = React.useRef(location);

    React.useEffect(() => {
        if (prevLocation.current.pathname === '/pods/create-pod' && location.pathname === '/pods') {
            refetch()
        }
        prevLocation.current = location;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location]);

    return {
        pods,
        pods_loading
    }
}

export const useResource = () => {
    const { data: resources, refetch } = useGetResources()

    const formik = useFormik({
        initialValues: { 
           cloud_type: 'Secure Cloud',
           region: 'Any',
           vcpu: 1,
           ram: '100',
           disc_type: 'ssd',
           cuda_version: 'Any',
           vram: 0,
        },
        // validationSchema: validationSchema,
        onSubmit: values => {},
    })

    React.useEffect(() => {
        const { values } = formik
        const filters = {
            cloud_type: values.cloud_type.toLowerCase(),
            ...(values.region !== 'Any' && { region: values.region, }),
            ...(values.cuda_version !== 'Any' && { cuda_version: values.cuda_version, }),
            ram: values.ram,
            disc_type: values.disc_type.toLowerCase(),
        }
        refetch({
            filters
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [formik.values])

  
    return {
        resources: groupByType(resources),
        formik
    }
}

export const usePodContent = () => {
  const [resource, setResource] = React.useState<null | Resource>(null)
    const handleSelectResource = (resource: Resource) => {
        setResource(resource)
    }

    return {
        handleSelectResource,
        resource
    }
}