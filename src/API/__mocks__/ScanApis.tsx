import { ScanType } from "@/types/ScanType"

const getScans = async (_token: string) => Promise.resolve([
    {
       "id": "0c3dfca8-13eb-4df7-a194-883f0294d49b",
       "organizationId": "123456",
       "stopId": "ec427081-7a41-4248-88ed-9ea7b1a3341f",
       "riderIds": ["123456"],
       "driverId": "123456",
       "deviceLocationOnSubmit": {"lat": 47.5831326, "lon": -122.0313254 }
    }
])

const getScanById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "organizationId": "123456",
    "stopId": "ec427081-7a41-4248-88ed-9ea7b1a3341f",
    "riderIds": ["123456"],
    "driverId": "123456",
    "deviceLocationOnSubmit": {"lat": 47.5831326, "lon": -122.0313254 }
 })

const getScansForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
       "id": "0c3dfca8-13eb-4df7-a194-883f0294d49b",
       "organizationId": organizationId,
       "stopId": "ec427081-7a41-4248-88ed-9ea7b1a3341f",
       "riderIds": ["123456"],
       "driverId": "123456",
       "deviceLocationOnSubmit": {"lat": 47.5831326, "lon": -122.0313254 }
    }
])

const getBulkScansById = async (_token: string, scanIds: string[]) => {
    const scans: ScanType[] = []

    scanIds.forEach((r) => scans.push({
        "id": r,
        "organizationId": "123456",
        "stopId": "ec427081-7a41-4248-88ed-9ea7b1a3341f",
        "riderIds": ["123456"],
        "driverId": "123456",
        "deviceLocationOnSubmit": {
            "lat": 47.5831326,
            "lon": -122.0313254 
        },
        "createdAt": Date.now()
     }))

    return scans
}

const updateScan = async (_token: string, _rider: ScanType) => Promise.resolve({})

const createScan = async (_token: string, _body: ScanType) => Promise.resolve({})

const deleteScan = async (_token: string, _id: string) => Promise.resolve({})

export interface ScanApiFunctionTypes {
    getScans(token: string): Promise<ScanType[]>,
    getScanById(token: string, id: string): Promise<ScanType>,
    getScansForOrganization(token: string, organizationId: string): Promise<ScanType[]>,
    getBulkScansById(token: string, ids: string[]): Promise<ScanType[]>,
    updateScan(token: string, rider: ScanType): Promise<ScanType>,
    createScan(token: string, rider: ScanType): Promise<ScanType>,
    deleteScan(token: string, id: string): Promise<ScanType>
}

export default {
    getScans,
    getScanById,
    getScansForOrganization,
    getBulkScansById,
    updateScan,
    createScan,
    deleteScan
}