import { RiderType } from "../types/RiderType"
import { API_BASE_NAME } from "./API"

const getRiders = async (token: string) => {
    try {
        const ridersData = await fetch(`${API_BASE_NAME}/riders`, {
            headers: {
                'Authorization': token
            }
        })

        const riders = await ridersData.json()

        return riders
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getRiderById = async (token: string, id: string) => {
    try {
        const riderRaw = await fetch(`${API_BASE_NAME}/riders/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const rider = await riderRaw.json()

        return rider
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getRidersForOrganization = async (token: string, organizationId: string) => {
    try {
        const ridersData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/riders`, {
            headers: {
                'Authorization': token
            }
        })

        const riders = await ridersData.json()

        return riders
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getBulkRidersById = async (token: string, riderIds: string[]) => {
    try {
        const ridersRaw = await fetch(`${API_BASE_NAME}/riders/batchGetById`, {
            method: 'POST',
            body: JSON.stringify(riderIds),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const ridersText = await ridersRaw.text()

        const riders = JSON.parse(ridersText)

        return riders
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const updateRider = async (token: string, rider: RiderType) => {
    try {
        const ridersRaw = await fetch(`${API_BASE_NAME}/riders/${rider.id}`, {
            method: 'PUT',
            body: JSON.stringify(rider),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const riders = await ridersRaw.json()

        return riders
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createRider = async (token: string, body: RiderType) => {
    try {
        const ridersData = await fetch(`${API_BASE_NAME}/riders`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const riders = await ridersData.json()

        return riders
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const deleteRider = async (token: string, id: string) => {
    try {
        const ridersData = await fetch(`${API_BASE_NAME}/riders/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const riders = await ridersData.json()

        return riders
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

export interface RiderApiFunctionTypes {
    getRiders(token: string): Promise<RiderType[]>,
    getRiderById(token: string, id: string): Promise<RiderType>,
    getRidersForOrganization(token: string, organizationId: string): Promise<RiderType[]>,
    getBulkRidersById(token: string, ids: string[]): Promise<RiderType[]>,
    updateRider(token: string, rider: RiderType): Promise<RiderType>,
    createRider(token: string, rider: RiderType): Promise<RiderType>,
    deleteRider(token: string, id: string): Promise<RiderType>,
}

export const RiderApis: RiderApiFunctionTypes = {
    getRiders,
    getRiderById,
    getRidersForOrganization,
    getBulkRidersById,
    updateRider,
    createRider,
    deleteRider
}