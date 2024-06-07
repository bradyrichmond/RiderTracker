import { array, object, string } from 'yup'

export const routeSchema = object({
    id: string().uuid().required(),
    orgId: string().uuid().required(),
    riderIds: array(),
    routeNumber: string().required('fieldRequired'),
    stopIds: array()
})