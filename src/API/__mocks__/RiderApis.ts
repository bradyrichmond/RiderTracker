import { RiderType } from '@/types/RiderType'

const mockGetRiderById = async (id: string) => Promise.resolve({
    id: id,
    firstName: 'Johnny',
    lastName: 'Tester',
    orgId: '00492e30-ab34-44f6-9843-44f47f2cdf27',
    guardianRiderLinks: [
        '123456'
    ]
})

const mockGetRiders = async (orgId: string) => Promise.resolve([
    {
        id: '123456',
        firstName: 'Hallie',
        lastName: 'James',
        orgId: orgId,
        guardianRiderLinks: [
            '123456'
        ],
        stopIds: [
            '0c3dfca8-13eb-4df7-a194-883f0294d49b'
        ]
    },
    {
        id: '70d242f6-6d30-4421-8511-7aad767a8776',
        firstName: 'Ashleigh',
        lastName: 'Ashley',
        orgId: orgId,
        guardianRiderLinks: [
            '123456'
        ]
    },
    {
        id: '123',
        firstName: 'Johnny',
        lastName: 'Tester',
        orgId: orgId,
        guardianRiderLinks: [
            '123456'
        ]
    }
])

const mockGetBulkRidersById = async (riderIds: string[]) => {
    const riders: RiderType[] = []

    riderIds.forEach((r) => riders.push({
        id: r,
        firstName: 'Johnny',
        lastName: 'Tester',
        orgId: '00492e30-ab34-44f6-9843-44f47f2cdf27',
        schoolId: '16982bd6-eb83-416d-b5fa-e7002d863136',
        stopIds: ['765ae823-c502-45a3-85f5-1caf270d7f0b', 'fd812b1b-6532-4f32-be25-352c6f84cefc'],
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdDate: new Date(),
        lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        lastEditDate: new Date()
    }))

    return riders
}

const mockUpdateRider = async () => Promise.resolve({})

const mockCreateRider = async () => Promise.resolve({})

const mockDeleteRider = async () => Promise.resolve({})

export const RiderApis = jest.fn().mockImplementation(() => ({
    getRiders: mockGetRiders,
    getRiderById: mockGetRiderById,
    getBulkRidersById: mockGetBulkRidersById,
    updateRider: mockUpdateRider,
    createRider: mockCreateRider,
    deleteRider: mockDeleteRider
}))
