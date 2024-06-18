export interface RouteActionType {
    actionType: ActionType
    driverId: string
    id: string
    orgId: string
    routeId: string
    createdBy: string
    createdDate: number
    lastEditedBy: string
    lastEditDate: number
}

export enum ActionType {
    ROUTE_BEGIN = 'route_begin',
    ROUTE_COMPLETE = 'route_complete',
    ROUTE_STOP = 'route_stop',
    ROUTE_SCAN = 'route_scan'
}
