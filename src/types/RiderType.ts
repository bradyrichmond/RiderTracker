import { RouteType } from './RouteType'
import { SchoolType } from './SchoolType'
import { StopType } from './StopType'
import { GuardianType } from './UserType'

export interface RiderType {
    createdAt: number
    createdBy: string
    firstName: string
    guardianIds: string[]
    guardians?: GuardianType[]
    id: string
    lastName: string
    orgId: string
    routeIds: string[]
    routes?: RouteType[]
    school?: SchoolType
    schoolId: string
    stopIds: string[]
    stops?: StopType[]
    updatedBy: string
    updatedAt: number
}