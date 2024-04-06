import { DriverType } from "../types/DriverType"
import { API_BASE_NAME } from "."

const getDrivers = async (token: string) => {
    try {
        const driversData = await fetch(`${API_BASE_NAME}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        const drivers = await driversData.json()

        return drivers
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getDriverById = async (token: string, id: string) => {
    try {
        const driverData = await fetch(`${API_BASE_NAME}/drivers/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const driver = await driverData.json()

        return driver
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getDriversForOrganization = async (token: string, organizationId: string) => {
    try {
        const driversData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        const drivers = await driversData.json()

        return drivers
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createDriver = async (token: string, body: DriverType) => {
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
        throw new Error(JSON.stringify(e))
    }
}

const deleteDriver = async (token: string, id: string) => {
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
        throw new Error(JSON.stringify(e))
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
