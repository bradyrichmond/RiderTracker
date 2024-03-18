import { BusType } from "./types/BusType"

const BASE_NAME = 'https://gkupwyoi70.execute-api.us-west-2.amazonaws.com/dev'

export const getBuses = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const buses = await fetch(`${BASE_NAME}/buses`, {
            headers: {
                'Authorization': token
            }
        })

        return buses
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const createBus = async (token: string, body: BusType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const buses = await fetch(`${BASE_NAME}/buses`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return buses
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getDrivers = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const drivers = await fetch(`${BASE_NAME}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getOrganizations = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organizations = await fetch(`${BASE_NAME}/organizations`, {
            headers: {
                'Authorization': token
            }
        })

        return organizations
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getRiders = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const riders = await fetch(`${BASE_NAME}/riders`, {
            headers: {
                'Authorization': token
            }
        })

        return riders
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getScans = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const scans = await fetch(`${BASE_NAME}/scans`, {
            headers: {
                'Authorization': token
            }
        })

        return scans
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}
