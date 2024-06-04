import { StopType } from '@/types/StopType'
import { ObjectSchema, array, object, string } from 'yup'

export const stopSchema: ObjectSchema<StopType> = object({
    address: string().uuid().required(),
    id: string().uuid().required(),
    orgId: string().uuid().required(),
    riderIds: array(),
    routeId: string().required('fieldRequired'),
    stopName: string().required('fieldRequired')
})