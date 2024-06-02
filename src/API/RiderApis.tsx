import { RiderType } from '../types/RiderType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class RiderApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getRiders = async (orgId: string) => {
        console.log('calling regular riders api')
        const getRidersResponse = await this.client.organizationsOrgIdRidersGet({ orgId })

        return handleApiResponse<RiderType[]>(getRidersResponse)
    }

    getRiderById = async (orgId: string, id: string) => {
        const getRiderResponse = await this.client.organizationsOrgIdRidersIdGet({ orgId, id })

        return handleApiResponse<RiderType>(getRiderResponse)
    }

    getBulkRidersByIds = async (orgId: string, userIds: string[]) => {
        const ridersResponse = await this.client.organizationsOrgIdRidersBatchByIdPost({ orgId }, userIds)

        return handleApiResponse<RiderType[]>(ridersResponse)
    }

    updateRider = async (orgId: string, id: string, rider: RiderType) => {
        const { firstName, lastName, schoolId, stopIds, guardianIds } = rider
        const trimmedRider = { firstName, lastName, schoolId, stopIds, guardianIds }
        const updateRiderResponse = await this.client.organizationsOrgIdRidersIdPut({ orgId, id }, trimmedRider)

        return handleApiResponse<object>(updateRiderResponse)
    }

    createRider = async (orgId: string, body: RiderType) => {
        const createRiderResponse = await this.client.organizationsOrgIdRidersPost({ orgId }, body)

        return handleApiResponse<object>(createRiderResponse)
    }

    deleteRider = async (orgId: string, id: string) => {
        const deleteRiderResponse = await this.client.organizationsOrgIdRidersIdDelete({ orgId, id })

        return handleApiResponse<object>(deleteRiderResponse)
    }
}

export interface RiderApiFunctionTypes {
    getRiders(orgId: string): Promise<RiderType[]>,
    getRiderById(orgId: string, id: string): Promise<RiderType>,
    updateRider(orgId: string, id: string, rider: RiderType): Promise<object>,
    createRider(orgId: string, rider: RiderType): Promise<object>,
    deleteRider(orgId: string, id: string): Promise<object>,
    getBulkRidersByIds(orgId: string, userIds: string[]): Promise<RiderType[]>
}
