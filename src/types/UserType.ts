import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { RiderType } from './RiderType'
import { StopType } from './StopType'

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
    createdAt: Date
    updatedBy: string
    updatedAt: Date
}

export interface GuardianType extends UserType {
    riderIds?: string[]
    riders?: RiderType[]
    stopId?: string
    stop?: StopType
}