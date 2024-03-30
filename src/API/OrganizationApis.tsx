import { OrganizationType } from "../types/OrganizationType"
import { API_BASE_NAME } from "."

const getOrganizations = async (token: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organizationsData = await fetch(`${API_BASE_NAME}/organizations`, {
            headers: {
                'Authorization': token
            }
        })

        const organizations = organizationsData.json()

        return organizations
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const getOrganizationById = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organizationData = await fetch(`${API_BASE_NAME}/organizations/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const organization = await organizationData.json()

        return organization
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const createOrganization = async (token: string, body: OrganizationType) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organizationsData = await fetch(`${API_BASE_NAME}/organizations`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const organizations = await organizationsData.json()

        return organizations
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

const deleteOrganization = async (token: string, id: string) => {
    if (!token) {
        console.error('Missing token')
        return new Response()
    }

    try {
        const organizationsData = await fetch(`${API_BASE_NAME}/organizations/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const organizations = await organizationsData.json()

        return organizations
    } catch (e) {
        console.error(JSON.stringify(e))
        return new Response()
    }
}

export interface OrganizationApiFunctionTypes {
    getOrganizations(token: string): Promise<OrganizationType[]>,
    getOrganizationById(token: string, id: string): Promise<OrganizationType>,
    createOrganization(token: string, organization: OrganizationType): Promise<OrganizationType>,
    deleteOrganization(token: string, id: string): Promise<OrganizationType>
}

export const OrganizationApis: OrganizationApiFunctionTypes = {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    deleteOrganization
}
