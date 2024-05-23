import { OrganizationType } from '@/types/OrganizationType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class OrgApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    async getOrganizations() {
        const response = await this.client.organizationsGet()

        return handleApiResponse<OrganizationType[]>(response)
    }

    async getOrganizationById(orgId: string) {
        const response = await this.client.organizationsOrgIdGet({ orgId })

        return handleApiResponse<OrganizationType>(response)
    }

    async createOrganization(newOrg: OrganizationType) {
        const response = await this.client.organizationsPost({}, newOrg)

        return handleApiResponse<object>(response)
    }

    async updateOrganizationLoginImage(file: File, orgId: string) {
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

    async updateOrganization(orgId: string, body: Record<string, string | string[]>) {

        const response = await this.client.organizationsOrgIdPut({ orgId }, body)
        return handleApiResponse<object>(response)
    }

    async getOrganizationLoginDataBySlug(orgSlug: string) {
        const response = this.client.publicOrganizationsOrgSlugGet({ orgSlug })
        return handleApiResponse<OrganizationType>(response)
    }

    async addAdminToOrganization(orgId: string, userId: string) {
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

    async removeAdminFromOrganization(orgId: string, userId: string) {
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
    getOrganizations(): Promise<OrganizationType[]>,
    getOrganizationById(orgId: string): Promise<OrganizationType>,
    createOrganization(newOrganization: OrganizationType): Promise<object>,
    updateOrganizationLoginImage(file: File, orgId: string): Promise<object>,
    getOrganizationLoginDataBySlug(orgslug: string): Promise<OrganizationType>
    updateOrganization(orgId: string, body: Record<string, string | string[]>): Promise<object>
    addAdminToOrganization(orgId: string, userId: string): Promise<object>
    removeAdminFromOrganization(orgId: string, userId: string): Promise<object>
}
