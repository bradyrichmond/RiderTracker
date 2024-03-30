import { DriverType } from "../types/DriverType"
import { API_BASE_NAME } from "."

const getDrivers = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const driversData = await fetch(`${API_BASE_NAME}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        const drivers = await driversData.json()

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getDriverById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const driverData = await fetch(`${API_BASE_NAME}/drivers/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const driver = await driverData.json()

        return driver
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getDriversForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const driversData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        const drivers = await driversData.json()

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const createDriver = async (token: string, body: DriverType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const driversData = await fetch(`${API_BASE_NAME}/drivers`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })


        const drivers = driversData.json()

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const deleteDriver = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const driversData = await fetch(`${API_BASE_NAME}/drivers/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const drivers = await driversData.json()

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export interface DriverApiFunctionTypes {
    getDrivers(token: string): Promise<DriverType[]>,
    getDriverById(token: string, id: string): Promise<DriverType>,
    getDriversForOrganization(token: string, organizationId: string): Promise<DriverType[]>,
    createDriver(token: string, body: DriverType): Promise<DriverType[]>,
    deleteDriver(token: string, id: string): Promise<DriverType[]>
}

export const DriverApis: DriverApiFunctionTypes = {
    getDrivers,
    getDriverById,
    getDriversForOrganization,
    createDriver,
    deleteDriver
}
