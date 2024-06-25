import { StopType } from '@/types/StopType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class StopApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getStops = async (orgId: string) => {
        const getStopsResponse = await this.client.organizationsOrgIdStopsGet({ orgId })

        return handleApiResponse<StopType[]>(getStopsResponse)
    }

    getStopById = async (orgId: string, id: string) => {
        const getStopResponse = await this.client.organizationsOrgIdStopsIdGet({ orgId, id })

        return handleApiResponse<StopType>(getStopResponse)
    }

    updateStop = async (orgId: string, id: string, stop: object) => {
        const updateStopResponse = await this.client.organizationsOrgIdStopsIdPut({ orgId, id }, stop)

        return handleApiResponse<object>(updateStopResponse)
    }

    createStop = async (orgId: string, body: StopType) => {
        const createStopResponse = await this.client.organizationsOrgIdStopsPost({ orgId }, body)

        return handleApiResponse<object>(createStopResponse)
    }

    deleteStop = async (orgId: string, id: string) => {
        const deleteStopResponse = await this.client.organizationsOrgIdStopsIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteStopResponse)
    }
}

export interface StopApiFunctionTypes {
    getStops(orgId: string): Promise<StopType[]>
    getStopById(orgId: string, id: string): Promise<StopType>
    updateStop(orgId: string, id: string, stop: object): Promise<object>
    createStop(orgId: string, stop: StopType): Promise<object>
    deleteStop(orgId: string, id: string): Promise<object>
}
