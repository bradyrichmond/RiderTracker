import { StopType } from "@/types/StopType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getStops = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getStopsResponse = await client.organizationsOrgIdStopsGet({ orgId })

    return handleApiResponse(getStopsResponse)
}

const getStopById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getStopResponse = await client.organizationsOrgIdSchoolsIdGet({ orgId, id })

    return handleApiResponse(getStopResponse)
}

const updateStop = async (orgId: string, id: string, stop: StopType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateStopResponse = await client.organizationsOrgIdSchoolsGet({ orgId, id }, stop)

    return handleApiResponse(updateStopResponse)
}

const createStop = async (orgId: string, body: StopType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createStopResponse = await client.organizationsOrgIdSchoolsPost({ orgId }, body)

    return handleApiResponse(createStopResponse)
}

const deleteStop = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteStopResponse = await client.organizationsOrgIdSchoolsIdDelete({ orgId, id })

    return handleApiResponse(deleteStopResponse)
}

const getBulkStopsByIds = async (orgId: string, stopIds: string[]) => {
    const { client } = await RiderTrackerAPI.getClient()
    const stops = await client.organizationsOrgIdStopsBulkPost({ orgId }, stopIds)

    return handleApiResponse(stops)
}

export interface StopApiFunctionTypes {
    getStops(orgId: string): Promise<StopType[]>,
    getBulkStopsByIds(orgId: string, stopIds: string[]): Promise<StopType[]>,
    getStopById(orgId: string, id: string): Promise<StopType>,
    updateStop(orgId: string, id: string, stop: StopType): Promise<any>,
    createStop(orgId: string, stop: StopType): Promise<any>,
    deleteStop(orgId: string, id: string): Promise<any>
}

export default {
    getStops,
    getStopById,
    updateStop,
    createStop,
    deleteStop,
    getBulkStopsByIds
}