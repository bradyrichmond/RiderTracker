import { StopType } from '@/types/StopType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { RouteType } from '@/types/RouteType'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class StopApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    async getStops(orgId: string) {
        const getStopsResponse = await this.client.organizationsOrgIdStopsGet({ orgId })
    
        return handleApiResponse<StopType[]>(getStopsResponse)
    }
    
    async getStopById(orgId: string, id: string) {
        const getStopResponse = await this.client.organizationsOrgIdStopsIdGet({ orgId, id })
    
        return handleApiResponse<StopType>(getStopResponse)
    }
    
    async updateStop(orgId: string, id: string, stop: StopType) {
        const updateStopResponse = await this.client.organizationsOrgIdStopsGet({ orgId, id }, stop)
    
        return handleApiResponse<object>(updateStopResponse)
    }
    
    async createStop(orgId: string, body: StopType) {
        await this.client.organizationsOrgIdStopsPost({ orgId }, body)
    
        const routeResponse = await this.client.organizationsOrgIdRoutesIdGet({ orgId, id: body.routeId })
        const { stopIds } = handleApiResponse<RouteType>(routeResponse)
    
        let stops: string[] | undefined = stopIds
    
        if (!stops) {
            stops = []
        }
    
        stops.push(body.id)
    
        const updateRouteResponse = await this.client.organizationsOrgIdRoutesIdPut({ orgId, id: body.routeId }, { stopIds: stops })
    
        return handleApiResponse<object>(updateRouteResponse)
    }
    
    async deleteStop(orgId: string, id: string) {
        const deleteStopResponse = await this.client.organizationsOrgIdStopsIdDelete({ orgId, id })
    
        return handleApiResponse<object>(deleteStopResponse)
    }
    
    async getBulkStopsByIds(orgId: string, stopIds: string[]) {
        const stops = await this.client.organizationsOrgIdStopsBulkPost({ orgId }, stopIds)
    
        return handleApiResponse<StopType[]>(stops)
    }
}

export interface StopApiFunctionTypes {
    getStops(orgId: string): Promise<StopType[]>,
    getBulkStopsByIds(orgId: string, stopIds: string[]): Promise<StopType[]>,
    getStopById(orgId: string, id: string): Promise<StopType>,
    updateStop(orgId: string, id: string, stop: StopType): Promise<object>,
    createStop(orgId: string, stop: StopType): Promise<object>,
    deleteStop(orgId: string, id: string): Promise<object>
}
