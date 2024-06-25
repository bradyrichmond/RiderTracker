const mockGetStopById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    riderIds: ['123456'],
    stopName: 'Supportive Bear',
    createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    createdAt: new Date(),
    updatedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    updatedAt: new Date()
})

const mockGetStops = async (orgId: string) => Promise.resolve([
    {
        id: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        orgId: orgId,
        riderIds: ['123456'],
        stopName: 'Supportive Bear',
        createdBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        createdAt: new Date().getTime(),
        updatedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        updatedAt: new Date().getTime()
    }
])

const mockUpdateStop = async () => Promise.resolve({})

const mockCreateStop = async () => Promise.resolve({})

const mockDeleteStop = async () => Promise.resolve({})

export const StopApis = jest.fn().mockImplementation(() => ({
    getStops: mockGetStops,
    getStopById: mockGetStopById,
    updateStop: mockUpdateStop,
    createStop: mockCreateStop,
    deleteStop: mockDeleteStop
}))
