import { RouteType } from '../types/RouteType'
import RiderTrackerAPI from '.'
import { handleApiResponse } from '@/helpers/ApiHelpers'

const getRoutes = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getRoutesResponse = await client.organizationsOrgIdRoutesGet({ orgId })

    return handleApiResponse<RouteType[]>(getRoutesResponse)
}

const getRouteById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getRouteResponse = await client.organizationsOrgIdRoutesIdGet({ orgId, id })

    return handleApiResponse<RouteType>(getRouteResponse)
}

const createRoute = async (orgId: string, body: RouteType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createRouteResponse = await client.organizationsOrgIdRoutesPost({ orgId }, body)

    return handleApiResponse<object>(createRouteResponse)
}

const deleteRoute = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteRouteResponse = await client.organizationsOrgIdRoutesIdDelete({ orgId, id })

    return handleApiResponse<object>(deleteRouteResponse)
}

export interface RouteApiFunctionTypes {
    getRoutes(orgId: string): Promise<RouteType[]>,
    getRouteById(orgId: string, id: string): Promise<RouteType>,
    createRoute(orgId: string, route: RouteType): Promise<object>,
    deleteRoute(orgId: string, id: string): Promise<object>
}

export default {
    getRoutes,
    getRouteById,
    createRoute,
    deleteRoute
}