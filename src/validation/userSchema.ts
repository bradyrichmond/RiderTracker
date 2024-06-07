import { array, object, string } from 'yup'

export const userSchema = object({
    address: string().uuid().required(),
    email: string().email('invalidEmail').required('fieldRequired'),
    firstName: string().required('fieldRequired'),
    lastName: string().required('fieldRequired'),
    profileImageKey: string(),
    riderIds: array(),
    title: string()
})