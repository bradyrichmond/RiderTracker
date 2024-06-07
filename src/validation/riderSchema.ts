import { array, object, string } from 'yup'

export const riderSchema = object({
    firstName: string().required('fieldRequired'),
    guardianIds: array(),
    lastName: string().required('fieldRequired'),
    schoolId: string().required('fieldRequired'),
    stopIds: array().required('fieldRequired')
})