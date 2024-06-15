import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'
import { RouteActionType } from '@/types/RouteActionType'

export class RouteActionApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getRouteActions = async (orgId: string): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsGet({ orgId })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    getRouteActionsByDriverId = async (orgId: string, driverId: string): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsDriverDriverIdOptions({ orgId, driverId })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    getRouteActionsByRouteId = async (orgId: string, routeId: string): Promise<RouteActionType[]> => {
        const exceptionsResponse = await this.client.organizationsOrgIdRouteActionsRouteRouteIdGet({ orgId, routeId })

        return handleApiResponse<RouteActionType[]>(exceptionsResponse)
    }

    createRouteAction = async (orgId: string, routeAction: RouteActionType): Promise<object> => {
        const createRouteActionResponse = await this.client.organizationsOrgIdExceptionsPost({ orgId }, routeAction)

        return handleApiResponse<object>(createRouteActionResponse)
    }

    deleteRouteAction = async (orgId: string, id: string): Promise<object> => {
        const deleteRouteActionResponse = await this.client.organizationsOrgIdExceptionsIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteRouteActionResponse)
    }
}

export interface RouteActionApiFunctionTypes {
    getRouteActions(orgId: string): Promise<RouteActionType[]>,
    getRouteActionsByDriverId(orgId: string, driverId: string): Promise<RouteActionType[]>,
    getRouteActionsByRouteId(orgId: string, routeId: string): Promise<RouteActionType[]>,
    createRouteAction(orgId: string, address: RouteActionType): Promise<object>,
    deleteRouteAction(orgId: string, id: string): Promise<object>
}
