import { SchoolType } from '@/types/SchoolType'

const mockGetSchoolById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    schoolName: 'Sunnyside Elementary',
    riders: ['123456'],
    address: '123456',
    createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    createdDate: new Date().getTime(),
    hours: [
        {
            dayName: 'monday',
            startTime: '1718208000000',
            endTime: '1718231400000'
        },
        {
            dayName: 'tuesday',
            startTime: '1718208000000',
            endTime: '1718231400000'
        },
        {
            dayName: 'wednesday',
            startTime: '1718208000000',
            endTime: '1718225100000'
        },
        {
            dayName: 'thursday',
            startTime: '1718208000000',
            endTime: '1718231400000'
        },
        {
            dayName: 'friday',
            startTime: '1718208000000',
            endTime: '1718231400000'
        }
    ],
    lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    lastEditDate: new Date().getTime()
 })

const mockGetSchools = async (orgId: string) => Promise.resolve([
    {
        id: '123456',
        orgId: orgId,
        schoolName: 'Sunnyside Elementary',
        riders: ['123456'],
        address: '123456',
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdDate: new Date(),
        hours: [
            {
                dayName: 'monday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            },
            {
                dayName: 'tuesday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            },
            {
                dayName: 'wednesday',
                startTime: '1718208000000',
                endTime: '1718225100000'
            },
            {
                dayName: 'thursday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            },
            {
                dayName: 'friday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            }
        ],
        lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        lastEditDate: new Date()
     }
])

const mockGetBulkSchoolsById = async (schoolIds: string[]) => {
    const schools: SchoolType[] = []

    schoolIds.forEach((s) => schools.push({
        id: s,
        orgId: '123456',
        schoolName: 'Sunnyside Elementary',
        address: '123456',
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdDate: new Date().getTime(),
        hours: [
            {
                dayName: 'monday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            },
            {
                dayName: 'tuesday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            },
            {
                dayName: 'wednesday',
                startTime: '1718208000000',
                endTime: '1718225100000'
            },
            {
                dayName: 'thursday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            },
            {
                dayName: 'friday',
                startTime: '1718208000000',
                endTime: '1718231400000'
            }
        ],
        lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        lastEditDate: new Date().getTime()
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
