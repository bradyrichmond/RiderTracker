export interface RouteActionType {
    actionType: ActionType
    createdAt: number
    createdBy: string
    driverId: string
    id: string
    orgId: string
    routeId: string
    updatedAt: number
    updatedBy: string
}

export enum ActionType {
    ROUTE_START = 'route_start',
    ROUTE_COMPLETE = 'route_complete',
    ROUTE_SCAN = 'route_scan'
}
