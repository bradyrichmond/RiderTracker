import { object, string } from 'yup'

export const loginSchema = object({
    username: string().required('fieldRequired'),
    password: string().required('fieldRequired')
})