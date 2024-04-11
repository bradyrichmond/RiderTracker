import { StopType } from "@/types/StopType"
import { API_BASE_NAME } from "."

const getStops = async (token: string) => {
    try {
        const stopsData = await fetch(`${API_BASE_NAME}/stops`, {
            headers: {
                'Authorization': token
            }
        })

        const stopsJson = await stopsData.json()
        const { stops } = stopsJson

        return stops
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getStopById = async (token: string, id: string) => {
    try {
        const stopData = await fetch(`${API_BASE_NAME}/stops/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const stop = await stopData.json()

        return stop
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getBulkStopsById = async (token: string, stopIds: string[]) => {
    try {
        const stopsData = await fetch(`${API_BASE_NAME}/stops/batchGetById`, {
            method: 'POST',
            body: JSON.stringify(stopIds),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const stops = stopsData.json()

        return stops
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getStopsForOrganization = async (token: string, organizationId: string) => {
    try {
        const stopsData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/stops`, {
            headers: {
                'Authorization': token
            }
        })

        const stops = await stopsData.json()

        return stops
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const updateStop = async (token: string, stop: StopType) => {
    try {
        const stopsRaw = await fetch(`${API_BASE_NAME}/stops/${stop.id}`, {
            method: 'PUT',
            body: JSON.stringify(stop),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const stops = await stopsRaw.json()

        return stops
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createStop = async (token: string, body: StopType) => {
    try {
        const stopsData = await fetch(`${API_BASE_NAME}/stops`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const stops = await stopsData.json()

        return stops
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const deleteStop = async (token: string, id: string) => {
    try {
        const stopsData = await fetch(`${API_BASE_NAME}/stops/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const stops = await stopsData.json()

        return stops
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

export interface StopApiFunctionTypes {
    getStops(token: string): Promise<StopType[]>,
    getStopById(token: string, id: string): Promise<StopType>,
    getBulkStopsById(token: string, riderIds: string[]): Promise<StopType[]>,
    getStopsForOrganization(token: string, organizationId: string): Promise<StopType[]>,
    updateStop(token: string, stop: StopType): Promise<StopType>,
    createStop(token: string, stop: StopType): Promise<StopType>,
    deleteStop(token: string, id: string): Promise<StopType>
}

export default {
    getStops,
    getStopById,
    getBulkStopsById,
    getStopsForOrganization,
    updateStop,
    createStop,
    deleteStop
}