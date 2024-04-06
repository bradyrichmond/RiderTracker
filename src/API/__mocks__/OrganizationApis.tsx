import { OrganizationType } from "@/types/OrganizationType"

const getOrganizations = async (_token: string) => Promise.resolve([
    {
        "id": "123"
    },
    {
        "id": "00492e30-ab34-44f6-9843-44f47f2cdf27"
    }
])

const getOrganizationById = async (_token: string, id: string) => Promise.resolve({ id })

const createOrganization = async (_token: string, _body: OrganizationType) => Promise.resolve({})

const deleteOrganization = async (_token: string, _id: string) => Promise.resolve({})

export interface OrganizationApiFunctionTypes {
    getOrganizations(token: string): Promise<OrganizationType[]>,
    getOrganizationById(token: string, id: string): Promise<OrganizationType>,
    createOrganization(token: string, organization: OrganizationType): Promise<OrganizationType>,
    deleteOrganization(token: string, id: string): Promise<OrganizationType>
}

export default {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    deleteOrganization
}
