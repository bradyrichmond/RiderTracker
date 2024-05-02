import { SchoolType } from "@/types/SchoolType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getSchools = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getSchoolsResponse = await client.organizationsOrgIdSchoolsGet({ orgId })

    return handleApiResponse(getSchoolsResponse)
}

const getSchoolById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getSchoolResponse = await client.organizationsOrgIdSchoolsIdGet({ orgId, id })

    return handleApiResponse(getSchoolResponse)
}

const updateSchool = async (orgId: string, id: string, school: SchoolType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updateSchoolResponse = await client.organizationsOrgIdSchoolsIdPut({ orgId, id }, school)

    return handleApiResponse(updateSchoolResponse)
}

const createSchool = async (orgId: string, body: SchoolType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createSchoolResponse = await client.organizationsOrgIdSchoolsPost({ orgId }, body)

    return handleApiResponse(createSchoolResponse)
}

const deleteSchool = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteSchoolsResponse = await client.organizationsOrgIdSchoolsIdDelete({ orgId, id })
    
    return handleApiResponse(deleteSchoolsResponse)
}

export interface SchoolApiFunctionTypes {
    getSchools(orgId: string): Promise<SchoolType[]>,
    getSchoolById(orgId: string, id: string): Promise<SchoolType>,
    updateSchool(orgId: string, id: string, school: SchoolType): Promise<any>,
    createSchool(orgId: string, school: SchoolType): Promise<any>,
    deleteSchool(orgId: string, id: string): Promise<any>
}

export default {
    getSchools,
    getSchoolById,
    updateSchool,
    createSchool,
    deleteSchool
}