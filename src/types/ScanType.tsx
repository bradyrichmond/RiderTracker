import { LocationType } from './LocationType'

export interface ScanType {
    id: string
    orgId: string
    stopId: string
    riderIds: string[]
    driverId: string
    deviceLocationOnSubmit?: LocationType
    createdAt: number,
    manualScan?: boolean,
    guardianIds?: string[]
}
