import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'
import { ActionType, RouteActionType } from '@/types/RouteActionType'

export class RouteActionApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getRouteActions = async (orgId: string): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsGet({ orgId })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    getRouteActionsByActionType = async (orgId: string, routeActionType: ActionType): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsGet({ orgId, routeActionType })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    getRouteActionsByDriverId = async (orgId: string, driverId: string): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsGet({ orgId, driverId })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    getRouteActionsByRouteId = async (orgId: string, routeId: string): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsGet({ orgId, routeId })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    createRouteAction = async (orgId: string, routeAction: RouteActionType): Promise<object> => {
        const createRouteActionResponse = await this.client.organizationsOrgIdRouteActionsPost({ orgId }, routeAction)

        return handleApiResponse<object>(createRouteActionResponse)
    }
}

export interface RouteActionApiFunctionTypes {
    getRouteActions(orgId: string): Promise<RouteActionType[]>
    getRouteActionsByActionType(orgId: string, actionType: ActionType): Promise<RouteActionType[]>
    getRouteActionsByDriverId(orgId: string, driverId: string): Promise<RouteActionType[]>
    getRouteActionsByRouteId(orgId: string, routeId: string): Promise<RouteActionType[]>
    createRouteAction(orgId: string, address: RouteActionType): Promise<object>
}
