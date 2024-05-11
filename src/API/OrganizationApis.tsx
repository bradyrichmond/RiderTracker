import { OrganizationType } from "@/types/OrganizationType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getOrganizations = async () => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = await client.organizationsGet()

    return handleApiResponse(response)
}

const getOrganizationById = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = await client.organizationsOrgIdGet({ orgId })

    return handleApiResponse(response)
}

const createOrganization = async (newOrg: OrganizationType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = await client.organizationsPost({}, newOrg)

    return handleApiResponse(response)
}

const updateOrganizationLoginImage = async (file: File, orgId: string) => {
    const fileExtension = file.name.split('.').pop()
    const bucket = 'ridertracker.organizationimages'
    const fileName = `${orgId}.${fileExtension}`
    const fullFileName = `${bucket}/${fileName}`

    const { client } = await RiderTrackerAPI.getClient()
    const updateOrgImageResponse = await client.adminProxyS3FolderObjectGet({ folder: bucket, object: fileName })

    const putUrl = handleApiResponse(updateOrgImageResponse)

    await fetch(putUrl, {
        method: 'PUT',
        body: file
    })

    return updateOrganization(orgId, { loginImageKey: fullFileName })
}

const updateOrganization = async (orgId: string, body: Record<string, string | string[]>) => {
    const { client } = await RiderTrackerAPI.getClient()

    const response = await client.organizationsOrgIdPut({ orgId }, body)
    return handleApiResponse(response)
}

const getOrganizationLoginDataBySlug = async (orgSlug: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const response = client.publicOrganizationsOrgSlugGet({ orgSlug })
    return handleApiResponse(response)
}

const addAdminToOrganization = async (orgId: string, userId: string) => {
    const { adminIds } = await getOrganizationById(orgId)
    adminIds.push(userId)
    return await updateOrganization(orgId, { adminIds })
}

const removeAdminFromOrganization = async (orgId: string, userId: string) => {
    const { adminIds } = await getOrganizationById(orgId)
    const newAdmins = adminIds.filter((a: string) => a !== userId)
    return await updateOrganization(orgId, { adminIds: newAdmins })
}

export interface OrganizationApiFunctionTypes {
    getOrganizations(): Promise<OrganizationType[]>,
    getOrganizationById(orgId: string): Promise<OrganizationType>,
    createOrganization(newOrganization: OrganizationType): Promise<void>,
    updateOrganizationLoginImage(file: File, orgId: string): Promise<void>,
    getOrganizationLoginDataBySlug(orgslug: string): Promise<Record<string, string>>
    updateOrganization(orgId: string, body: Record<string, string | string[]>): Promise<any>
    addAdminToOrganization(orgId: string, userId: string): Promise<any>
    removeAdminFromOrganization(orgId: string, userId: string): Promise<any>
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
