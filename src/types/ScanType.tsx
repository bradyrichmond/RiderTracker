import { LocationType } from "./LocationType"

export interface ScanType {
    id: string
    organizationId: string
    stopId: string
    riderIds: string[]
    driverId: string
    deviceLocationOnSubmit?: LocationType
    createdAt: number,
    manualScan?: boolean
}