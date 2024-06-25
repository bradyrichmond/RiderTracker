const mockGetScans = async (orgId: string) => Promise.resolve([
    {
        id: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
        orgId: orgId,
        stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
        riderIds: ['123456'],
        driverId: '123456',
        deviceLocationOnSubmit: { lat: 47.5831326, lon: -122.0313254 },
        createdBy: '123456',
        createdAt: new Date(),
        updatedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
        updatedAt: new Date()
    }
])

const mockGetScanById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
    riderIds: ['123456'],
    driverId: '123456',
    deviceLocationOnSubmit: { lat: 47.5831326, lon: -122.0313254 },
    createdBy: '123456',
    createdAt: new Date().getTime(),
    updatedBy: 'b5e026e6-0947-4d6e-8ddb-1fa911435ac4',
    updatedAt: new Date().getTime()
})

const mockUpdateScan = async () => Promise.resolve({})

const mockCreateScan = async () => Promise.resolve({})

const mockDeleteScan = async () => Promise.resolve({})

export const ScanApis = jest.fn().mockImplementation(() => ({
    getScans: mockGetScans,
    getScanById: mockGetScanById,
    updateScan: mockUpdateScan,
    createScan: mockCreateScan,
    deleteScan: mockDeleteScan
}))
