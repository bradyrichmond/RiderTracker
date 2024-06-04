import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { UserType } from '@/types/UserType'
import { ObjectSchema, array, object, string } from 'yup'

export const userSchema: ObjectSchema<UserType> = object({
    address: string().uuid().required(),
    email: string().email('invalidEmail').required('fieldRequired'),
    firstName: string().required('fieldRequired'),
    id: string().uuid().required('fieldRequired'),
    lastName: string().required('fieldRequired'),
    orgId: string().uuid().required('fieldRequired'),
    profileImageKey: string(),
    riderIds: array(),
    title: string(),
    userType: string().oneOf(Object.values(RIDER_TRACKER_ROLES))
})