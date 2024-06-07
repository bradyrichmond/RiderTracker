const mockGetExceptionById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '00492e30-ab34-44f6-9843-44f47f2cdf27',
    riderId: '70d242f6-6d30-4421-8511-7aad767a8776',
    date: new Date(),
    pickupStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
    guardianId: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
    dropOffStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
    createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    createdDate: new Date(),
    lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    lastEditDate: new Date()
})

const mockGetExceptions = async (orgId: string) => Promise.resolve([
    {
        id: '123456',
        orgId,
        riderId: '70d242f6-6d30-4421-8511-7aad767a8776',
        date: new Date(),
        pickupStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        guardianId: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
        dropOffStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdDate: new Date(),
        lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        lastEditDate: new Date()
    },
    {
        id: '70d242f6-6d30-4421-8511-7aad767a8776',
        orgId,
        riderId: '70d242f6-6d30-4421-8511-7aad767a8776',
        date: new Date(),
        pickupStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        guardianId: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
        dropOffStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdDate: new Date(),
        lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        lastEditDate: new Date()
    },
    {
        id: '123',
        orgId,
        riderId: '70d242f6-6d30-4421-8511-7aad767a8776',
        date: new Date(),
        pickupStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        guardianId: 'ac7a22c5-5e28-46d5-ac26-18b54eb5gggg',
        dropOffStopId: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdDate: new Date(),
        lastEditedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        lastEditDate: new Date()
    }
])

const mockCreateException = async () => Promise.resolve({})

const mockDeleteException = async () => Promise.resolve({})

export const ExceptionApis = jest.fn().mockImplementation(() => ({
    getExceptions: mockGetExceptions,
    getExceptionById: mockGetExceptionById,
    createException: mockCreateException,
    deleteException: mockDeleteException
}))
