import { RiderType } from '../types/RiderType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { RouteType } from '@/types/RouteType'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class RiderApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    async getRiders(orgId: string) {
        const getRidersResponse = await this.client.organizationsOrgIdRidersGet({ orgId })

        return handleApiResponse<RiderType[]>(getRidersResponse)
    }

    async getRiderById(orgId: string, id: string) {
        const getRiderResponse = await this.client.organizationsOrgIdRidersIdGet({ orgId, id })

        return handleApiResponse<RiderType>(getRiderResponse)
    }

    async getBulkRidersByIds(orgId: string, userIds: string[]) {
        const ridersResponse = await this.client.organizationsOrgIdRidersBatchByIdPost({ orgId }, userIds)

        return handleApiResponse<RiderType[]>(ridersResponse)
    }

    async updateRider(orgId: string, id: string, rider: RiderType) {
        const updateRiderResponse = await this.client.organizationsOrgIdRidersIdPut({ orgId, id }, rider)

        return handleApiResponse<object>(updateRiderResponse)
    }

    async createRider(orgId: string, body: RiderType) {
        const createRiderResponse = await this.client.organizationsOrgIdRidersPost({ orgId }, body)

        this._updateAfterCreateRider(orgId, body)

        return handleApiResponse<object>(createRiderResponse)
    }

    async _updateAfterCreateRider(orgId: string, rider: RiderType) {
        const stopIds = rider.stopIds
        const routes = await this._getRoutesForStops(orgId, stopIds)

        for (const route of routes) {
            let newRiders: string[] | undefined = route.riderIds

            if (!newRiders) {
                newRiders = []
            }

            newRiders.push(rider.id)
            await this.client.organizationsOrgIdRoutesIdPut({ orgId, id: route.id }, { riderIds: newRiders })
        }
    }

    async _getRoutesForStops(orgId: string, stopIds: string[]) {
        const fetchedRoutes = await this.client.organizationsOrgIdRoutesGet({ orgId })
        const routes = handleApiResponse<RouteType[]>(fetchedRoutes)
        const filteredRoutes = routes.filter((r: RouteType) => stopIds.filter((s: string) => r.stopIds?.includes(s)).length > 0)
        return filteredRoutes
    }

    async deleteRider(orgId: string, id: string) {
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
