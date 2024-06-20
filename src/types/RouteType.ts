export interface RouteType {
    id: string
    isActive: boolean
    orgId: string
    stopIds?: string[]
    riderIds?: string[]
    routeNumber: string
    createdBy: string
    createdDate: number
    lastEditedBy: string
    lastEditDate: number
}