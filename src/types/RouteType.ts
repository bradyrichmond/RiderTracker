export interface RouteType {
    id: string
    orgId: string
    stopIds?: string[]
    riderIds?: string[]
    routeNumber: string
    createdBy: string
    createdDate: Date
    lastEditedBy: string
    lastEditDate: Date
}