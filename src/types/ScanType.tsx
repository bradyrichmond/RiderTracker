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

export interface LocationType {
    lat: number
    lon: number
}