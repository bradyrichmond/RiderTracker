import { CreateCognitoUserParams } from '@/API/AdminApis'
import { ObjectSchema, object, string } from 'yup'

export const awsCognitoUserSchema: ObjectSchema<CreateCognitoUserParams> = object({
    email: string().email('invalidEmail').required('fieldRequired'),
    family_name: string().required('fieldRequired'),
    given_name: string().required('fieldRequired')
})