import { ScanType } from '@/types/ScanType'

const getScans = async (orgId: string) => Promise.resolve([
    {
       id: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
       orgId: orgId,
       stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
       riderIds: ['123456'],
       driverId: '123456',
       deviceLocationOnSubmit: { lat: 47.5831326, lon: -122.0313254 }
    }
])

const getScanById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    stopId: 'ec427081-7a41-4248-88ed-9ea7b1a3341f',
    riderIds: ['123456'],
    driverId: '123456',
    deviceLocationOnSubmit: { lat: 47.5831326, lon: -122.0313254 }
})

const getBulkScansById = async (scanIds: string[]) => {
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

const updateScan = async () => Promise.resolve({})

const createScan = async () => Promise.resolve({})

const deleteScan = async () => Promise.resolve({})

export interface ScanApiFunctionTypes {
    getScans(orgId: string): Promise<ScanType[]>,
    getScanById(id: string): Promise<ScanType>,
    getBulkScansById(ids: string[]): Promise<ScanType[]>,
    updateScan(scan: ScanType): Promise<object>,
    createScan(scan: ScanType): Promise<object>,
    deleteScan(id: string): Promise<object>
}

export default {
    getScans,
    getScanById,
    getBulkScansById,
    updateScan,
    createScan,
    deleteScan
}