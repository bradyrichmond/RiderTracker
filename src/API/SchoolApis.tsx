import { SchoolType } from "@/types/SchoolType"
import { API_BASE_NAME } from "."

const getSchools = async (token: string) => {
    try {
        const schoolsData = await fetch(`${API_BASE_NAME}/schools`, {
            headers: {
                'Authorization': token
            }
        })

        const schools = await schoolsData.json()

        return schools.schools
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getSchoolById = async (token: string, id: string) => {
    try {
        const schoolData = await fetch(`${API_BASE_NAME}/schools/${id}`, {
            headers: {
                'Authorization': token
            }
        })

        const school = await schoolData.json()

        return school
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getSchoolsForOrganization = async (token: string, organizationId: string) => {
    try {
        const schoolsData = await fetch(`${API_BASE_NAME}/organizations/${organizationId}/schools`, {
            headers: {
                'Authorization': token
            }
        })

        const schools = await schoolsData.json()

        return schools
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const getBulkSchoolsById = async (token: string, schoolIds: string[]) => {
    try {
        const schoolsRaw = await fetch(`${API_BASE_NAME}/schools/batchGetById`, {
            method: 'POST',
            body: JSON.stringify(schoolIds),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const schools = schoolsRaw.json()

        return schools
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const updateSchool = async (token: string, school: SchoolType) => {
    try {
        const schoolsRaw = await fetch(`${API_BASE_NAME}/schools/${school.id}`, {
            method: 'PUT',
            body: JSON.stringify(school),
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        })

        const schools = await schoolsRaw.json()

        return schools
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const createSchool = async (token: string, body: SchoolType) => {
    try {
        const schoolsData = await fetch(`${API_BASE_NAME}/schools`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const schools = await schoolsData.json()

        return schools
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

const deleteSchool = async (token: string, id: string) => {
    try {
        const schoolsData = await fetch(`${API_BASE_NAME}/schools/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })

        const schools = await schoolsData.json()

        return schools
    } catch (e) {
        throw new Error(JSON.stringify(e))
    }
}

export interface SchoolApiFunctionTypes {
    getSchools(token: string): Promise<SchoolType[]>,
    getSchoolById(token: string, id: string): Promise<SchoolType>,
    getSchoolsForOrganization(token: string, organizationId: string): Promise<SchoolType[]>,
    getBulkSchoolsById(token: string, ids: string[]): Promise<SchoolType[]>,
    updateSchool(token: string, school: SchoolType): Promise<SchoolType>,
    createSchool(token: string, school: SchoolType): Promise<SchoolType>,
    deleteSchool(token: string, id: string): Promise<SchoolType>
}

export default {
    getSchools,
    getSchoolById,
    getSchoolsForOrganization,
    getBulkSchoolsById,
    updateSchool,
    createSchool,
    deleteSchool
}