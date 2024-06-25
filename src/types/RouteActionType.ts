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
    ROUTE_BEGIN = 'route_begin',
    ROUTE_COMPLETE = 'route_complete',
    ROUTE_STOP = 'route_stop',
    ROUTE_SCAN = 'route_scan'
}
