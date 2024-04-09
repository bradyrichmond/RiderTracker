import { StopType } from "@/types/StopType"

const getStops = async (_token: string) => Promise.resolve([
    {
       "id": "0c3dfca8-13eb-4df7-a194-883f0294d49b",
       "organizationId": "123456",
       "riderIds": ["123456"]
    }
])

const getStopById = async (_token: string, id: string) => Promise.resolve({
    "id": id,
    "organizationId": "123456",
    "riderIds": ["123456"],
    "driverId": "123456"
 })

const getStopsForOrganization = async (_token: string, organizationId: string) => Promise.resolve([
    {
       "id": "0c3dfca8-13eb-4df7-a194-883f0294d49b",
       "organizationId": organizationId,
       "riderIds": ["123456"]
    }
])

const getBulkStopsById = async (_token: string, stopIds: string[]) => {
    const stops: StopType[] = []

    stopIds.forEach((r) => stops.push({
        "id": r,
        "organizationId": "123456",
        "riderIds": ["123456"]
     }))

    return stops
}

const updateStop = async (_token: string, _rider: StopType) => Promise.resolve({})

const createStop = async (_token: string, _body: StopType) => Promise.resolve({})

const deleteStop = async (_token: string, _id: string) => Promise.resolve({})

export default {
    getStops,
    getStopById,
    getStopsForOrganization,
    getBulkStopsById,
    updateStop,
    createStop,
    deleteStop
}