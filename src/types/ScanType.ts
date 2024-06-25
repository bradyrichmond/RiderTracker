import { RiderType } from './RiderType'

export interface ScanType {
    createdAt: Date
    createdBy: string
    id: string
    lat: number
    lon: number
    manualScan?: boolean
    orgId: string
    stopId: string
    riderIds: string[]
    riders?: RiderType[]
    updatedAt: Date
    updatedBy: string
}
