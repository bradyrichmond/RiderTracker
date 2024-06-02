import { SchoolType } from '@/types/SchoolType'

const mockGetSchoolById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    schoolName: 'Sunnyside Elementary',
    riders: ['123456'],
    address: '123456'
 })

const mockGetSchools = async (orgId: string) => Promise.resolve([
    {
        id: '123456',
        orgId: orgId,
        schoolName: 'Sunnyside Elementary',
        riders: ['123456'],
        address: '123456'
     }
])

const mockGetBulkSchoolsById = async (schoolIds: string[]) => {
    const schools: SchoolType[] = []

    schoolIds.forEach((s) => schools.push({
        id: s,
        orgId: '123456',
        schoolName: 'Sunnyside Elementary',
        address: '123456'
     }))

    return schools
}

const mockUpdateSchool = async () => Promise.resolve({})

const mockCreateSchool = async () => Promise.resolve({})

const mockDeleteSchool = async () => Promise.resolve({})

export const SchoolApis = jest.fn().mockImplementation(() => ({
    getSchools: mockGetSchools,
    getSchoolById: mockGetSchoolById,
    getBulkSchoolsById: mockGetBulkSchoolsById,
    updateSchool: mockUpdateSchool,
    createSchool: mockCreateSchool,
    deleteSchool: mockDeleteSchool
}))
