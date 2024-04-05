import { BusType } from "../types/BusType"
import { API_BASE_NAME } from "./API"

const getBuses = async (token: string) => {
    try {
        const busesData = await fetch(`${API_BASE_NAME}/buses`, {
            headers: {
                'Authorization': token
            }
        })

        const buses = await busesData.json()

        return buses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getBusById = async (token: string, busId: string) => {
    try {
        const busData = await fetch(`${API_BASE_NAME}/buses/${busId}`, {
            headers: {
                'Authorization': token
            }
        })

        const bus = await busData.json()

        return bus
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getBusesForOrganization = async (token: string, organizationId: string) => {
    try {
        const busesData = await fetch(`${API_BASE_NAME}/organization/${organizationId}/buses`, {
            headers: {
                'Authorization': token
            }
        })

        const buses = await busesData.json()

        return buses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createBus = async (token: string, body: BusType) => {
    try {
        const busesData = await fetch(`${API_BASE_NAME}/buses`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const buses = await busesData.json()

        return buses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const deleteBus = async (token: string, id: string) => {
    try {
        const busesData = await fetch(`${API_BASE_NAME}/buses/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const buses = await busesData.json()

        return buses
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

export interface BusApiFunctionTypes {
    getBuses(token: string): Promise<BusType[]>,
    getBusById(token: string, id: string): Promise<BusType>,
    getBusesForOrganization(token: string, organizationId: string): Promise<BusType[]>,
    createBus(token: string, body: BusType): Promise<BusType>,
    deleteBus(token: string, id: string): Promise<BusType>,
}

export const BusApis: BusApiFunctionTypes = {
    getBuses,
    getBusById,
    getBusesForOrganization,
    createBus,
    deleteBus
}
