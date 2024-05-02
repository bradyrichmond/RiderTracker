import { RiderType } from "../types/RiderType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getRiders = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getRidersResponse = await client.organizationsOrgIdRidersGet({ orgId })

    return handleApiResponse(getRidersResponse)
}

const getRiderById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getRiderResponse = await client.organizationsOrgIdRidersIdGet({ orgId, id })

    return handleApiResponse(getRiderResponse)
}

const getBulkRidersByIds = async (orgId: string, userIds: string[]) => {
    const api = await RiderTrackerAPI.getClient()
    const ridersResponse = await api.client.organizationsOrgIdRidersBatchByIdPost({ orgId }, userIds)

    return handleApiResponse(ridersResponse)
}

const updateRider = async (orgId: string, id: string, rider: RiderType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateRiderResponse = await client.organizationsOrgIdRidersIdPut({ orgId, id }, rider)

    return handleApiResponse(updateRiderResponse)
}

const createRider = async (orgId: string, body: RiderType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createRiderResponse = await client.organizationsOrgIdRidersPost({ orgId }, body)

    return handleApiResponse(createRiderResponse)
}

const deleteRider = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteRiderResponse = await client.organizationsOrgIdRidersIdDelete({ orgId, id })

    return handleApiResponse(deleteRiderResponse)
}

export interface RiderApiFunctionTypes {
    getRiders(orgId: string): Promise<RiderType[]>,
    getRiderById(orgId: string, id: string): Promise<RiderType>,
    updateRider(orgId: string, id: string, rider: RiderType): Promise<any>,
    createRider(orgId: string, rider: RiderType): Promise<any>,
    deleteRider(orgId: string, id: string): Promise<any>,
    getBulkRidersByIds(orgId: string, userIds: string[]): Promise<RiderType[]>
}

export default {
    getRiders,
    getRiderById,
    updateRider,
    createRider,
    deleteRider,
    getBulkRidersByIds
}