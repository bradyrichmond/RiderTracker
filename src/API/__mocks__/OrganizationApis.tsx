import { OrganizationType } from '@/types/OrganizationType'

const getOrganizations = async () => Promise.resolve([
    {
        id: '123'
    },
    {
        id: '00492e30-ab34-44f6-9843-44f47f2cdf27'
    }
])

const getOrganizationById = async (id: string) => Promise.resolve({ id })

const createOrganization = async () => Promise.resolve({})

const deleteOrganization = async () => Promise.resolve({})

export interface OrganizationApiFunctionTypes {
    getOrganizations(): Promise<OrganizationType[]>,
    getOrganizationById(id: string): Promise<OrganizationType>,
    createOrganization(organization: OrganizationType): Promise<object>,
    deleteOrganization(id: string): Promise<object>
}

export default {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    deleteOrganization
}
