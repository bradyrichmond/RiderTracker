import { GuardianType } from "../types/GuardianType"
import { API_BASE_NAME } from "."

const getGuardians = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardiansData = await fetch(`${API_BASE_NAME}/guardians`, {
            headers: {
                'Authorization': token
            }
        })

        const guardians = await guardiansData.json()

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getGuardianById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardianData = await fetch(`${API_BASE_NAME}/guardians/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const guardian = await guardianData.json()

        return guardian
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }   
}

const getGuardiansForOrganization = async (token: string, organizationId: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardiansData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/guardians`, {
            headers: {
                'Authorization': token
            }
        })

        const guardians = await guardiansData.json()

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getBulkGuardiansById = async (token: string, guardianIds: string[]) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardiansData = await fetch(`${API_BASE_NAME}/guardians/batchGetById`, {
            method: 'POST',
            body: JSON.stringify(guardianIds),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const guardiansText = await guardiansData.text()

        const guardians = await JSON.parse(guardiansText)

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const updateGuardian = async (token: string, guardian: GuardianType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardiansData = await fetch(`${API_BASE_NAME}/guardians/${guardian.id}`, {
            method: 'PUT',
            body: JSON.stringify(guardian),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const guardians = await guardiansData.json()

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const createGuardian = async (token: string, body: GuardianType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardiansData = await fetch(`${API_BASE_NAME}/guardians`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const guardians = await guardiansData.json()

        return guardians
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const deleteGuardian = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const guardianData = await fetch(`${API_BASE_NAME}/guardians/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const guardian = await guardianData.json()

        return guardian
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export interface GuardianApiFunctionTypes {
    getGuardians(token: string): Promise<GuardianType[]>,
    getGuardianById(token: string, id: string): Promise<GuardianType>,
    getGuardiansForOrganization(token: string, organizationId: string): Promise<GuardianType[]>,
    getBulkGuardiansById(token: string, ids: string[]): Promise<GuardianType[]>,
    updateGuardian(token: string, guardian: GuardianType): Promise<GuardianType>,
    createGuardian(token: string, guardian: GuardianType): Promise<GuardianType>,
    deleteGuardian(token: string, id: string): Promise<GuardianType>
}

export const GuardianApis: GuardianApiFunctionTypes = {
    getGuardians,
    getGuardianById,
    getGuardiansForOrganization,
    getBulkGuardiansById,
    updateGuardian,
    createGuardian,
    deleteGuardian
}