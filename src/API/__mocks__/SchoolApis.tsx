import { SchoolType } from "@/types/SchoolType"

const getSchools = async (_token: string) => Promise.resolve([
    {
        "id": "123456",
        "organizationId": "123456",
        "schoolName": "Sunnyside Elementary",
        "riders": ["123456"],
        "address": "123456"
     }
])

const getSchoolById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "organizationId": "123456",
    "schoolName": "Sunnyside Elementary",
    "riders": ["123456"],
    "address": "123456"
 })

const getSchoolsForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
        "id": "123456",
        "organizationId": organizationId,
        "schoolName": "Sunnyside Elementary",
        "riders": ["123456"],
        "address": "123456"
     }
])

const getBulkSchoolsById = async (_token: string, schoolIds: string[]) => {
    const schools: SchoolType[] = []

    schoolIds.forEach((s) => schools.push({
        "id": s,
        "organizationId": "123456",
        "schoolName": "Sunnyside Elementary",
        "riders": ["123456"],
        "address": "123456"
     }))

    return schools
}

const updateScan = async (_token: string, _school: SchoolType) => Promise.resolve({})

const createScan = async (_token: string, _body: SchoolType) => Promise.resolve({})

const deleteScan = async (_token: string, _id: string) => Promise.resolve({})

export default {
    getSchools,
    getSchoolById,
    getSchoolsForOrganization,
    getBulkSchoolsById,
    updateScan,
    createScan,
    deleteScan
}