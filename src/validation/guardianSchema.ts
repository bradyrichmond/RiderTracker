import { object, string } from 'yup'

export const guardianSchema = object({
    address: string().uuid().required('fieldRequired'),
    email: string().email('invalidEmail').required('fieldRequired'),
    given_name: string().required('fieldRequired'),
    family_name: string().required('fieldRequired')
})