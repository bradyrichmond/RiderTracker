import { SchoolType } from '@/types/SchoolType'

const getSchoolById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    schoolName: 'Sunnyside Elementary',
    riders: ['123456'],
    address: '123456'
 })

const getSchools = async (orgId: string) => Promise.resolve([
    {
        id: '123456',
        orgId: orgId,
        schoolName: 'Sunnyside Elementary',
        riders: ['123456'],
        address: '123456'
     }
])

const getBulkSchoolsById = async (schoolIds: string[]) => {
    const schools: SchoolType[] = []

    schoolIds.forEach((s) => schools.push({
        id: s,
        orgId: '123456',
        schoolName: 'Sunnyside Elementary',
        address: '123456'
     }))

    return schools
}

const updateSchool = async () => Promise.resolve({})

const createSchool = async () => Promise.resolve({})

const deleteSchool = async () => Promise.resolve({})

export interface SchoolApiFunctionTypes {
    getSchools(orgId: string): Promise<SchoolType[]>,
    getSchoolById(id: string): Promise<SchoolType>,
    getBulkSchoolsById(ids: string[]): Promise<SchoolType[]>,
    updateSchool(scan: SchoolType): Promise<object>,
    createSchool(scan: SchoolType): Promise<object>,
    deleteSchool(id: string): Promise<object>
}

export default {
    getSchools,
    getSchoolById,
    getBulkSchoolsById,
    updateSchool,
    createSchool,
    deleteSchool
}