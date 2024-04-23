import { OrganizationType } from "../types/OrganizationType"
import { API_BASE_NAME } from "."
import { AdminType } from "@/types/AdminType"

const getOrganizations = async (token: string): Promise<OrganizationType[]> => {
    try {
        const organizationsData = await fetch(`${API_BASE_NAME}/organizations`, {
            headers: {
                'Authorization': token
            }
        })

        const organizations = organizationsData.json()

        return organizations
    } catch (e) {
        throw new SyntaxError(e as string)
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
        throw new SyntaxError(e as string)
    }
}

const getOrganizationAdmins = async (token: string, organizationId: string) => {
    try {
        const organizationAdminsData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/admins`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const organizationAdmins = await organizationAdminsData.json()

        return organizationAdmins
    } catch (e) {
        throw new SyntaxError(e as string)
    }
}

const getOrganizationAdminById = async (token: string, organizationId: string, adminId: string) => {
    try {
        const adminData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/admins/${adminId}`, {
            headers: {
                'Authorization': token
            }
        })

        const admin = await adminData.json()

        return admin
    } catch (e) {
        throw new SyntaxError(e as string)
    }
}

const createOrganizationAdmin = async (token: string, body: AdminType, organizationId: string) => {
    try {
        const createAdminResponse = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/admins`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const createAdminJson = await createAdminResponse.json()

        return createAdminJson
    } catch (e) {
        throw new SyntaxError(e as string)
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
        throw new SyntaxError(e as string)
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
        throw new SyntaxError(e as string)
    }
}

const deleteOrganizationAdmin = async (token: string, adminId: string, organizationId: string) => {
    try {
        const deleteAdminResponse = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/admins/${adminId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const deleteAdminJson = await deleteAdminResponse.json()

        return deleteAdminJson
    } catch (e) {
        throw new SyntaxError(e as string)
    }
}

export interface OrganizationApiFunctionTypes {
    getOrganizations(token: string): Promise<OrganizationType[]>,
    getOrganizationById(token: string, id: string): Promise<OrganizationType>,
    getOrganizationAdmins(token: string, id: string): Promise<AdminType[]>,
    getOrganizationAdminById(token: string, organizationId: string, adminId: string): Promise<AdminType>,
    createOrganizationAdmin(token: string, body: AdminType, organizationId: string): Promise<AdminType>,
    createOrganization(token: string, organization: OrganizationType): Promise<OrganizationType>,
    deleteOrganization(token: string, id: string): Promise<OrganizationType>,
    deleteOrganizationAdmin(token: string, id: string, organizationId: string): Promise<AdminType>
}

export default {
    getOrganizations,
    getOrganizationById,
    getOrganizationAdmins,
    getOrganizationAdminById,
    createOrganization,
    createOrganizationAdmin,
    deleteOrganization,
    deleteOrganizationAdmin
}
