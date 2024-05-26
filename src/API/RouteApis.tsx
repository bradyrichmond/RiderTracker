import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'
import { RouteType } from '../types/RouteType'
import { handleApiResponse } from '@/helpers/ApiHelpers'

export class RouteApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getRoutes = async (orgId: string) => {
        const getRoutesResponse = await this.client.organizationsOrgIdRoutesGet({ orgId })

        return handleApiResponse<RouteType[]>(getRoutesResponse)
    }

    getRouteById = async (orgId: string, id: string) => {
        const getRouteResponse = await this.client.organizationsOrgIdRoutesIdGet({ orgId, id })

        return handleApiResponse<RouteType>(getRouteResponse)
    }

    createRoute = async (orgId: string, body: RouteType) => {
        const createRouteResponse = await this.client.organizationsOrgIdRoutesPost({ orgId }, body)

        return handleApiResponse<object>(createRouteResponse)
    }

    updateRoute = async (orgId: string, id: string, route: RouteType) => {
        const updatedRoute = {
            riderIds: route.riderIds
        }
        const updateRouteResponse = await this.client.organizationsOrgIdRoutesIdPut({ orgId, id }, updatedRoute)

        return handleApiResponse<object>(updateRouteResponse)
    }

    deleteRoute = async (orgId: string, id: string) => {
        const deleteRouteResponse = await this.client.organizationsOrgIdRoutesIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteRouteResponse)
    }
}

export interface RouteApiFunctionTypes {
    getRoutes(orgId: string): Promise<RouteType[]>,
    getRouteById(orgId: string, id: string): Promise<RouteType>,
    createRoute(orgId: string, route: RouteType): Promise<object>,
    updateRoute(orgId: string, id: string, route: RouteType): Promise<object>
    deleteRoute(orgId: string, id: string): Promise<object>
}
