import { RouteType } from '@/types/RouteType'
import { ObjectSchema, array, object, string } from 'yup'

export const routeSchema: ObjectSchema<RouteType> = object({
    id: string().uuid().required(),
    orgId: string().uuid().required(),
    riderIds: array(),
    routeNumber: string().required('fieldRequired'),
    stopIds: array()
})