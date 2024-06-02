const mockGetOrganizations = async () => Promise.resolve([
    {
        id: '123'
    },
    {
        id: '00492e30-ab34-44f6-9843-44f47f2cdf27'
    }
])

const mockGetOrganizationLoginDataBySlug = async (orgSlug: string) => Promise.resolve(`TEST_${orgSlug}`)

const mockGetOrganizationById = async (id: string) => Promise.resolve({ id })

const mockCreateOrganization = async () => Promise.resolve({})

const mockDeleteOrganization = async () => Promise.resolve({})

export const OrgApis = jest.fn().mockImplementation(() => ({
    getOrganizations: mockGetOrganizations,
    getOrganizationById: mockGetOrganizationById,
    createOrganization: mockCreateOrganization,
    deleteOrganization: mockDeleteOrganization,
    getOrganizationLoginDataBySlug: mockGetOrganizationLoginDataBySlug
}))
