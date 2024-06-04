import { RiderType } from '@/types/RiderType'
import { ObjectSchema, array, object, string } from 'yup'

export const riderSchema: ObjectSchema<RiderType> = object({
    firstName: string().required('fieldRequired'),
    guardianIds: array(),
    id: string().uuid().required(),
    lastName: string().required('fieldRequired'),
    orgId: string().uuid().required(),
    schoolId: string().required('fieldRequired'),
    stopIds: array().required('fieldRequired')
})