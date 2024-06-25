import { RiderType } from './RiderType'
import { StopType } from './StopType'

export interface RouteType {
    createdAt: number
    createdBy: string
    id: string
    isActive: boolean
    orgId: string
    riderIds: string[]
    riders: RiderType[]
    routeNumber: string
    stopIds: string[]
    stops?: StopType[]
    updatedAt: number
    updatedBy: string
}