import { ScanType } from '@/types/ScanType'

const mockGetScans = async (orgId: string) => Promise.resolve([
    {
       id: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
       orgId: orgId,
       stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
       riderIds: ['123456'],
       driverId: '123456',
       deviceLocationOnSubmit: { lat: 47.5831326, lon: -122.0313254 }
    }
])

const mockGetScanById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
    riderIds: ['123456'],
    driverId: '123456',
    deviceLocationOnSubmit: { lat: 47.5831326, lon: -122.0313254 }
})

const mockGetBulkScansById = async (scanIds: string[]) => {
    const scans: ScanType[] = []

    scanIds.forEach((r) => scans.push({
        id: r,
        orgId: '123456',
        stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
        riderIds: ['123456'],
        driverId: '123456',
        deviceLocationOnSubmit: {
            lat: 47.5831326,
            lon: -122.0313254
        },
        createdAt: Date.now()
     }))

    return scans
}

const mockUpdateScan = async () => Promise.resolve({})

const mockCreateScan = async () => Promise.resolve({})

const mockDeleteScan = async () => Promise.resolve({})

export const ScanApis = jest.fn().mockImplementation(() => ({
    getScans: mockGetScans,
    getScanById: mockGetScanById,
    getBulkScansById: mockGetBulkScansById,
    updateScan: mockUpdateScan,
    createScan: mockCreateScan,
    deleteScan: mockDeleteScan
}))
