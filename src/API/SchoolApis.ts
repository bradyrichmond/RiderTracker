import { SchoolType } from '@/types/SchoolType'
import { handleApiResponse } from '@/helpers/ApiHelpers'
import { ApiGatewayClientType } from '@/helpers/GenerateApiGatewayClient'

export class SchoolApis {
    client: ApiGatewayClientType

    constructor(apiGClient: ApiGatewayClientType) {
        this.client = apiGClient
    }

    getSchools = async (orgId: string) => {
        const getSchoolsResponse = await this.client.organizationsOrgIdSchoolsGet({ orgId })

        return handleApiResponse<SchoolType[]>(getSchoolsResponse)
    }

    getSchoolById = async (orgId: string, id: string) => {
        const getSchoolResponse = await this.client.organizationsOrgIdSchoolsIdGet({ orgId, id })

        return handleApiResponse<SchoolType>(getSchoolResponse)
    }

    updateSchool = async (orgId: string, id: string, school: SchoolType) => {
        const updatedSchool = {
            schoolName: school.schoolName,
            address: school.address
        }
        const updateSchoolResponse = await this.client.organizationsOrgIdSchoolsIdPut({ orgId, id }, updatedSchool)

        return handleApiResponse<object>(updateSchoolResponse)
    }

    createSchool = async (orgId: string, body: SchoolType) => {
        const createSchoolResponse = await this.client.organizationsOrgIdSchoolsPost({ orgId }, body)

        return handleApiResponse<object>(createSchoolResponse)
    }

    deleteSchool = async (orgId: string, id: string) => {
        const deleteSchoolsResponse = await this.client.organizationsOrgIdSchoolsIdDelete({ orgId, id }, {})

        return handleApiResponse<object>(deleteSchoolsResponse)
    }
}

export interface SchoolApiFunctionTypes {
    getSchools(orgId: string): Promise<SchoolType[]>,
    getSchoolById(orgId: string, id: string): Promise<SchoolType>,
    updateSchool(orgId: string, id: string, school: SchoolType): Promise<object>,
    createSchool(orgId: string, school: SchoolType): Promise<object>,
    deleteSchool(orgId: string, id: string): Promise<object>
}
