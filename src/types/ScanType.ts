import { LocationType } from './LocationType'

export interface ScanType {
    id: string
    orgId: string
    stopId: string
    riderIds: string[]
    deviceLocationOnSubmit?: LocationType
    createdBy: string
    createdDate: Date
    lastEditedBy: string
    lastEditDate: Date
    manualScan?: boolean
    guardianIds?: string[]
}
