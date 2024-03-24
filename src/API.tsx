import { BusType } from "./types/BusType"
import { DriverType } from "./types/DriverType"
import { GuardianRiderLinkType } from "./types/GuardianRiderLinkType"
import { GuardianType } from "./types/GuardianType"
import { OrganizationType } from "./types/OrganizationType"
import { RiderType } from "./types/RiderType"
import { ScanType } from "./types/ScanType"

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

export const getBusById = async (token: string, busId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const bus = await fetch(`${BASE_NAME}/buses/${busId}`, {
            headers: {
                'Authorization': token
            }
        })

        return bus
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getBusesForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const buses = await fetch(`${BASE_NAME}/organization/${organizationId}/buses`, {
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

export const getDriverById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const driver = await fetch(`${BASE_NAME}/drivers/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        return driver
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getDriversForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardians = await fetch(`${BASE_NAME}/organization/${organizationId}/drivers`, {
            headers: {
                'Authorization': token
            }
        })

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const createDriver = async (token: string, body: DriverType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const drivers = await fetch(`${BASE_NAME}/drivers`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return drivers
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getGuardians = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardians = await fetch(`${BASE_NAME}/guardians`, {
            headers: {
                'Authorization': token
            }
        })

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getGuardianById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardian = await fetch(`${BASE_NAME}/guardians/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        return guardian
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }   
}

export const getGuardiansForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardians = await fetch(`${BASE_NAME}/organization/${organizationId}/guardians`, {
            headers: {
                'Authorization': token
            }
        })

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const createGuardian = async (token: string, body: GuardianType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardians = await fetch(`${BASE_NAME}/guardians`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const createGuardianRiderLink = async (token: string, body: GuardianRiderLinkType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const results = await fetch(`${BASE_NAME}/relationships/guardians-riders`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return results
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

export const getOrganizationById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organization = await fetch(`${BASE_NAME}/organizations/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        return organization
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const createOrganization = async (token: string, body: OrganizationType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organizations = await fetch(`${BASE_NAME}/organizations`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
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

export const getRiderById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const rider = await fetch(`${BASE_NAME}/riders/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        return rider
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getRidersForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const ridersData = await fetch(`${BASE_NAME}/organizations/${organizationId}/riders`, {
            headers: {
                'Authorization': token
            }
        })

        const riders = await ridersData.json()

        return riders
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export const getRidersForGuardian = async (token: string, guardianId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const riderIdsRaw = await fetch(`${BASE_NAME}/guardians/${guardianId}/riders`, {
            headers: {
                'Authorization': token
            }
        })

        const riderIds = await riderIdsRaw.json()
        const trimmedIds = trimRelationshipEntityTypes(riderIds)

        const ridersRaw = await fetch(`${BASE_NAME}/riders/batchGetById`, {
            method: 'POST',
            body: JSON.stringify(trimmedIds),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const riders = await ridersRaw.json()

        return riders
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const trimRelationshipEntityTypes = (toBeTrimmed: string[]) => {
    const trimmedIds:string[] = []

    toBeTrimmed.forEach((i) => {
        trimmedIds.push(i.split("#")[1])
    })

    return trimmedIds
}

export const createRider = async (token: string, body: RiderType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const riders = await fetch(`${BASE_NAME}/riders`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
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

export const createScan = async (token: string, body: ScanType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const scans = await fetch(`${BASE_NAME}/scans`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        return scans
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}
