import { array, object, string } from 'yup'

export const scanSchema = object({
    guardianIds: array(),
    stopId: string().required('fieldRequired'),
    riderIds: array().required('fieldRequired')
})