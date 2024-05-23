import { StopType } from '@/types/StopType'
import RiderTrackerAPI from '.'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { RouteType } from '@/types/RouteType'

const getStops = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getStopsResponse = await client.organizationsOrgIdStopsGet({ orgId })

    return handleApiResponse<StopType[]>(getStopsResponse)
}

const getStopById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getStopResponse = await client.organizationsOrgIdStopsIdGet({ orgId, id })

    return handleApiResponse<StopType>(getStopResponse)
}

const updateStop = async (orgId: string, id: string, stop: StopType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateStopResponse = await client.organizationsOrgIdStopsGet({ orgId, id }, stop)

    return handleApiResponse<object>(updateStopResponse)
}

const createStop = async (orgId: string, body: StopType) => {
    const { client } = await RiderTrackerAPI.getClient()
    await client.organizationsOrgIdStopsPost({ orgId }, body)

    const routeResponse = await client.organizationsOrgIdRoutesIdGet({ orgId, id: body.routeId })
    const { stopIds } = handleApiResponse<RouteType>(routeResponse)

    let stops: string[] | undefined = stopIds

    if (!stops) {
        stops = []
    }

    stops.push(body.id)

    const updateRouteResponse = await client.organizationsOrgIdRoutesIdPut({ orgId, id: body.routeId }, { stopIds: stops })

    return handleApiResponse<object>(updateRouteResponse)
}

const deleteStop = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteStopResponse = await client.organizationsOrgIdStopsIdDelete({ orgId, id })

    return handleApiResponse<object>(deleteStopResponse)
}

const getBulkStopsByIds = async (orgId: string, stopIds: string[]) => {
    const { client } = await RiderTrackerAPI.getClient()
    const stops = await client.organizationsOrgIdStopsBulkPost({ orgId }, stopIds)

    return handleApiResponse<StopType[]>(stops)
}

export interface StopApiFunctionTypes {
    getStops(orgId: string): Promise<StopType[]>,
    getBulkStopsByIds(orgId: string, stopIds: string[]): Promise<StopType[]>,
    getStopById(orgId: string, id: string): Promise<StopType>,
    updateStop(orgId: string, id: string, stop: StopType): Promise<object>,
    createStop(orgId: string, stop: StopType): Promise<object>,
    deleteStop(orgId: string, id: string): Promise<object>
}

export default {
    getStops,
    getStopById,
    updateStop,
    createStop,
    deleteStop,
    getBulkStopsByIds
}