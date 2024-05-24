import { OrganizationType } from '@/types/OrganizationType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'
import { v4 as uuid } from 'uuid'
import { RIDER_TRACKER_ROLES } from '@/constants/Roles'
import { UserType } from '@/types/UserType'

export class OrgApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getOrganizations = async () => {
        const response = await this.client.organizationsGet()

        return handleApiResponse<OrganizationType[]>(response)
    }

    getOrganizationById = async (orgId: string) => {
        const response = await this.client.organizationsOrgIdGet({ orgId })

        return handleApiResponse<OrganizationType>(response)
    }

    getOrgIdForUser = async (userId: string, role: string): Promise<string | string[]> => {
        const requestId = uuid()

        if (role === RIDER_TRACKER_ROLES.RIDER_TRACKER_WIZARD) {
            const wizardData: OrganizationType[] = await this.client.organizationsGet()
            const mappedOrgIds: string[] = wizardData.map((w: OrganizationType) => w.id)
            return mappedOrgIds
        }

        const userGetResponse = await this.client.organizationsOrgIdUsersIdGet({ orgId: requestId, id: userId })
        const userData = handleApiResponse<UserType>(userGetResponse)

        if (!userData.orgId) {
            throw 'No org for this user'
        }

        return userData.orgId
    }

    createOrganization = async (newOrg: OrganizationType) => {
        const response = await this.client.organizationsPost({}, newOrg)

        return handleApiResponse<object>(response)
    }

    updateOrganizationLoginImage = async (file: File, orgId: string) => {
        const fileExtension = file.name.split('.').pop()
        const bucket = 'ridertracker.organizationimages'
        const fileName = `${orgId}.${fileExtension}`
        const fullFileName = `${bucket}/${fileName}`

        const updateOrgImageResponse = await this.client.adminProxyS3FolderObjectGet({ folder: bucket, object: fileName })

        const putUrl = handleApiResponse<URL>(updateOrgImageResponse)

        await fetch(putUrl, {
            method: 'PUT',
            body: file
        })

        return this.updateOrganization(orgId, { loginImageKey: fullFileName })
    }

    updateOrganization = async (orgId: string, body: Record<string, string | string[]>) => {

        const response = await this.client.organizationsOrgIdPut({ orgId }, body)
        return handleApiResponse<object>(response)
    }

    getOrganizationLoginDataBySlug = async (orgSlug: string) => {
        const response = this.client.publicOrganizationsOrgSlugGet({ orgSlug })
        return handleApiResponse<OrganizationType>(response)
    }

    addAdminToOrganization = async (orgId: string, userId: string) => {
        const { adminIds } = await this.getOrganizationById(orgId)
        let newAdminIds: string[] = []

        if (adminIds) {
            adminIds.push(userId)
            newAdminIds = adminIds
        } else {
            newAdminIds = ['']
        }

        return await this.updateOrganization(orgId, { adminIds: newAdminIds })
    }

    removeAdminFromOrganization = async (orgId: string, userId: string) => {
        const { adminIds } = await this.getOrganizationById(orgId)
        let newAdminIds: string[] = []

        if (adminIds) {
            newAdminIds = adminIds.filter((a: string) => a !== userId)
        } else {
            newAdminIds = ['']
        }

        return await this.updateOrganization(orgId, { adminIds: newAdminIds })
    }
}

export interface OrgApiFunctionTypes {
    getOrganizations(): Promise<OrganizationType[]>
    getOrganizationById(orgId: string): Promise<OrganizationType>
    getOrgIdForUser(userId: string, role: string): Promise<string | string[]>
    createOrganization(newOrganization: OrganizationType): Promise<object>
    updateOrganizationLoginImage(file: File, orgId: string): Promise<object>
    getOrganizationLoginDataBySlug(orgslug: string): Promise<OrganizationType>
    updateOrganization(orgId: string, body: Record<string, string | string[]>): Promise<object>
    addAdminToOrganization(orgId: string, userId: string): Promise<object>
    removeAdminFromOrganization(orgId: string, userId: string): Promise<object>
}
