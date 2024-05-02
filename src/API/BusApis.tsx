import { BusType } from "../types/BusType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getBuses = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getBusesResponse = await client.organizationsOrgIdBusesGet({ orgId })

    return handleApiResponse(getBusesResponse)
}

const getBusById = async (orgId: string, busId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getBusResponse = await client.organizationsOrgIdBusesIdGet({ orgId, id: busId })

    return handleApiResponse(getBusResponse)
}

const createBus = async (orgId: string, body: BusType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createBusResponse = await client.organizationsOrgIdBusesPost({ orgId }, body)

    return handleApiResponse(createBusResponse)
}

const deleteBus = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteBusResponse = await client.organizationsOrgIdBusesIdDelete({ orgId, id })

    return handleApiResponse(deleteBusResponse)
}

export interface BusApiFunctionTypes {
    getBuses(orgId: string): Promise<BusType[]>,
    getBusById(orgId: string, id: string): Promise<BusType>,
    createBus(orgId: string, body: BusType): Promise<any>,
    deleteBus(orgId: string, id: string): Promise<any>,
}

export default {
    getBuses,
    getBusById,
    createBus,
    deleteBus
}
