import { BusType } from '@/types/BusType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class BusApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    async getBuses(orgId: string) {
        const getBusesResponse = await this.client.organizationsOrgIdBusesGet({ orgId })
    
        return handleApiResponse<BusType[]>(getBusesResponse)
    }
    
    async getBusById(orgId: string, busId: string) {
        const getBusResponse = await this.client.organizationsOrgIdBusesIdGet({ orgId, id: busId })
    
        return handleApiResponse<BusType>(getBusResponse)
    }
    
    async createBus(orgId: string, body: BusType) {
        const createBusResponse = await this.client.organizationsOrgIdBusesPost({ orgId }, body)
    
        return handleApiResponse<object>(createBusResponse)
    }
    
    async deleteBus(orgId: string, id: string) {
        const deleteBusResponse = await this.client.organizationsOrgIdBusesIdDelete({ orgId, id })
    
        return handleApiResponse<object>(deleteBusResponse)
    }
}

export interface BusApiFunctionTypes {
    getBuses(orgId: string): Promise<BusType[]>,
    getBusById(orgId: string, id: string): Promise<BusType>,
    createBus(orgId: string, body: BusType): Promise<object>,
    deleteBus(orgId: string, id: string): Promise<object>
}
