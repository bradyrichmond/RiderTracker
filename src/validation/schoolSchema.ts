import { SchoolType } from '@/types/SchoolType'
import { ObjectSchema, array, object, string } from 'yup'

export const schoolSchema: ObjectSchema<SchoolType> = object({
    address: string().uuid().required('fieldRequired'),
    id: string().uuid().required(),
    orgId: string().uuid().required(),
    riderIds: array(),
    schoolName: string().required('fieldRequired')
})