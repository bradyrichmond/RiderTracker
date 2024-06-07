import { RIDER_TRACKER_ROLES } from '@/constants/Roles'

export interface UserType {
    id: string
    orgId: string
    firstName: string
    lastName: string
    email: string
    title?: string
    profileImageKey?: string
    userType?: RIDER_TRACKER_ROLES
    createdBy: string
    createdDate: Date
    lastEditedBy: string
    lastEditDate: Date
}

export interface GuardianType extends UserType {
    riderIds: string[]
}