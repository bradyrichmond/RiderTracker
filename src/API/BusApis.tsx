import { BusType } from "../types/BusType"
import { API_BASE_NAME } from "."

const getBuses = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const busesData = await fetch(`${API_BASE_NAME}/buses`, {
            headers: {
                'Authorization': token
            }
        })

        const buses = await busesData.json()

        return buses
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getBusById = async (token: string, busId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const busData = await fetch(`${API_BASE_NAME}/buses/${busId}`, {
            headers: {
                'Authorization': token
            }
        })

        const bus = await busData.json()

        return bus
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getBusesForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const busesData = await fetch(`${API_BASE_NAME}/organization/${organizationId}/buses`, {
            headers: {
                'Authorization': token
            }
        })

        const buses = await busesData.json()

        return buses
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const createBus = async (token: string, body: BusType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

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
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const deleteBus = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

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
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export interface BusApiFunctionTypes {
    getBuses(token: string): Promise<BusType>,
    getBusById(token: string, id: string): Promise<BusType>,
    getBusesForOrganization(token: string, organizationId: string): Promise<BusType>,
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
