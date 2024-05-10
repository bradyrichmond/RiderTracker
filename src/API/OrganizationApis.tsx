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
    const response = await client.adminProxyS3FolderObjectGet({ folder: bucket, key: fullFileName })
    handleApiResponse(response)

    return await updateOrganization(orgId, { loginImageKey: fullFileName })
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

export interface OrganizationApiFunctionTypes {
    getOrganizations(): Promise<OrganizationType[]>,
    getOrganizationById(orgId: string): Promise<OrganizationType>,
    createOrganization(newOrganization: OrganizationType): Promise<void>,
    updateOrganizationLoginImage(file: File, orgId: string): Promise<void>,
    getOrganizationLoginDataBySlug(orgslug: string): Promise<Record<string, string>>
    updateOrganization(orgId: string, body: Record<string, string | string[]>): Promise<any>
    addAdminToOrganization(orgId: string, userId: string): Promise<any>
}

export default {
    getOrganizations,
    getOrganizationById,
    createOrganization,
    updateOrganizationLoginImage,
    getOrganizationLoginDataBySlug,
    updateOrganization,
    addAdminToOrganization
}
