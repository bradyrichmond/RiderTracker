import { OrganizationType } from "../types/OrganizationType"
import { API_BASE_NAME } from "./API"

const getOrganizations = async (token: string) => {
    try {
        const organizationsData = await fetch(`${API_BASE_NAME}/organizations`, {
            headers: {
                'Authorization': token
            }
        })

        const organizations = organizationsData.json()

        return organizations
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getOrganizationById = async (token: string, id: string) => {
    try {
        const organizationData = await fetch(`${API_BASE_NAME}/organizations/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const organization = await organizationData.json()

        return organization
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createOrganization = async (token: string, body: OrganizationType) => {
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
        throw new Error(JSON.stringify(e))
    }
}

const deleteOrganization = async (token: string, id: string) => {
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
        throw new Error(JSON.stringify(e))
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
