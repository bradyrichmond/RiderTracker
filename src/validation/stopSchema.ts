import { array, object, string } from 'yup'

export const stopSchema = object({
    address: string().uuid().required(),
    id: string().uuid().required(),
    orgId: string().uuid().required(),
    riderIds: array(),
    routeId: string().required('fieldRequired'),
    stopName: string().required('fieldRequired')
})