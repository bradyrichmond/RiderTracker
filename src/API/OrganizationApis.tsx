import { OrganizationType } from '@/types/OrganizationType'
import RiderTrackerAPI from '.'
import { handleApiResponse } from '@/helpers/ApiHelpers'

const getOrganizations = async () => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = await client.organizationsGet()

    return handleApiResponse<OrganizationType[]>(response)
}

const getOrganizationById = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = await client.organizationsOrgIdGet({ orgId })

    return handleApiResponse<OrganizationType>(response)
}

const createOrganization = async (newOrg: OrganizationType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = await client.organizationsPost({}, newOrg)

    return handleApiResponse<object>(response)
}

const updateOrganizationLoginImage = async (file: File, orgId: string) => {
    const fileExtension = file.name.split('.').pop()
    const bucket = 'ridertracker.organizationimages'
    const fileName = `${orgId}.${fileExtension}`
    const fullFileName = `${bucket}/${fileName}`

    const { client } = await RiderTrackerAPI.getClient()
    const updateOrgImageResponse = await client.adminProxyS3FolderObjectGet({ folder: bucket, object: fileName })

    const putUrl = handleApiResponse<URL>(updateOrgImageResponse)

    await fetch(putUrl, {
        method: 'PUT',
        body: file
    })

    return updateOrganization(orgId, { loginImageKey: fullFileName })
}

const updateOrganization = async (orgId: string, body: Record<string, string | string[]>) => {
    const { client } = await RiderTrackerAPI.getClient()

    const response = await client.organizationsOrgIdPut({ orgId }, body)
    return handleApiResponse<object>(response)
}

const getOrganizationLoginDataBySlug = async (orgSlug: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = client.publicOrganizationsOrgSlugGet({ orgSlug })
    return handleApiResponse<OrganizationType>(response)
}

const addAdminToOrganization = async (orgId: string, userId: string) => {
    const { adminIds } = await getOrganizationById(orgId)
    let newAdminIds: string[] = []

    if (adminIds) {
        adminIds.push(userId)
        newAdminIds = adminIds
    } else {
        newAdminIds = ['']
    }

    return await updateOrganization(orgId, { adminIds: newAdminIds })
}

const removeAdminFromOrganization = async (orgId: string, userId: string) => {
    const { adminIds } = await getOrganizationById(orgId)
    let newAdminIds: string[] = []

    if (adminIds) {
        newAdminIds = adminIds.filter((a: string) => a !== userId)
    } else {
        newAdminIds = ['']
    }

    return await updateOrganization(orgId, { adminIds: newAdminIds })
}

export interface OrganizationApiFunctionTypes {
    getOrganizations(): Promise<OrganizationType[]>,
    getOrganizationById(orgId: string): Promise<OrganizationType>,
    createOrganization(newOrganization: OrganizationType): Promise<object>,
    updateOrganizationLoginImage(file: File, orgId: string): Promise<object>,
    getOrganizationLoginDataBySlug(orgslug: string): Promise<OrganizationType>
    updateOrganization(orgId: string, body: Record<string, string | string[]>): Promise<object>
    addAdminToOrganization(orgId: string, userId: string): Promise<object>
    removeAdminFromOrganization(orgId: string, userId: string): Promise<object>
}

export default {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    updateOrganizationLoginImage,
    getOrganizationLoginDataBySlug,
    updateOrganization,
    addAdminToOrganization,
    removeAdminFromOrganization
}
