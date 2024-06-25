import { OrganizationType } from '@/types/OrganizationType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

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

    createOrganization = async (newOrg: OrganizationType) => {
        const response = await this.client.organizationsPost({}, newOrg)

        return handleApiResponse<object>(response)
    }

    updateOrganizationLoginImage = async (file: File, orgId: string) => {
        const fileExtension = file.name.split('.').pop()
        const bucket = 'ridertracker.organizationimages'
        const fileName = `${orgId}.${fileExtension}`

        const updateOrgImageResponse = await this.client.s3FolderObjectGet({ folder: bucket, object: fileName })

        const putUrl = handleApiResponse<URL>(updateOrgImageResponse)

        await fetch(putUrl, {
            method: 'PUT',
            body: file
        })
    }

    getOrganizationLoginDataBySlug = async (orgSlug: string) => {
        const response = await this.client.publicOrganizationsOrgSlugGet({ orgSlug })
        return handleApiResponse<OrganizationType>(response)
    }
}

export interface OrgApiFunctionTypes {
    getOrganizations(): Promise<OrganizationType[]>
    getOrganizationById(orgId: string): Promise<OrganizationType>
    createOrganization(newOrganization: OrganizationType): Promise<object>
    updateOrganizationLoginImage(file: File, orgId: string): Promise<void>
    getOrganizationLoginDataBySlug(orgslug: string): Promise<OrganizationType>
}
