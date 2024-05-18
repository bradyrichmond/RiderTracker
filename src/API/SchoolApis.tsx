import { SchoolType } from "@/types/SchoolType"
import RiderTrackerAPI from "."
import { handleApiResponse } from "@/helpers/ApiHelpers"

const getSchools = async (orgId: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getSchoolsResponse = await client.organizationsOrgIdSchoolsGet({ orgId })

    return handleApiResponse<SchoolType[]>(getSchoolsResponse)
}

const getSchoolById = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const getSchoolResponse = await client.organizationsOrgIdSchoolsIdGet({ orgId, id })

    return handleApiResponse<SchoolType>(getSchoolResponse)
}

const updateSchool = async (orgId: string, id: string, school: SchoolType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const updatedSchool = {
        schoolName: school.schoolName,
        address: school.address
    }
    const updateSchoolResponse = await client.organizationsOrgIdSchoolsIdPut({ orgId, id }, updatedSchool)

    return handleApiResponse<object>(updateSchoolResponse)
}

const createSchool = async (orgId: string, body: SchoolType) => {
    const { client } = await RiderTrackerAPI.getClient()
    const createSchoolResponse = await client.organizationsOrgIdSchoolsPost({ orgId }, body)

    return handleApiResponse<object>(createSchoolResponse)
}

const deleteSchool = async (orgId: string, id: string) => {
    const { client } = await RiderTrackerAPI.getClient()
    const deleteSchoolsResponse = await client.organizationsOrgIdSchoolsIdDelete({ orgId, id }, {})
    
    return handleApiResponse<object>(deleteSchoolsResponse)
}

export interface SchoolApiFunctionTypes {
    getSchools(orgId: string): Promise<SchoolType[]>,
    getSchoolById(orgId: string, id: string): Promise<SchoolType>,
    updateSchool(orgId: string, id: string, school: SchoolType): Promise<object>,
    createSchool(orgId: string, school: SchoolType): Promise<object>,
    deleteSchool(orgId: string, id: string): Promise<object>
}

export default {
    getSchools,
    getSchoolById,
    updateSchool,
    createSchool,
    deleteSchool
}