import { array, object, string } from 'yup'

export const schoolSchema = object({
    address: string().uuid().required('fieldRequired'),
    id: string().uuid().required(),
    orgId: string().uuid().required(),
    riderIds: array(),
    schoolName: string().required('fieldRequired')
})