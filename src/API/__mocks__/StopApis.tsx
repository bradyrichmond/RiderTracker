import { StopType } from '@/types/StopType'

const mockGetStopById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    riderIds: ['123456'],
    stopName: 'Supportive Bear'
 })

const mockGetStops = async (orgId: string) => Promise.resolve([
    {
       id: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
       orgId: orgId,
       riderIds: ['123456'],
       stopName: 'Supportive Bear'
    }
])

const mockGetBulkStopsById = async (stopIds: string[]) => {
    const stops: StopType[] = []

    stopIds.forEach((r) => stops.push({
        id: r,
        orgId: '123456',
        riderIds: ['123456'],
        stopName: 'Supportive Bear',
        address: '789',
        routeId: 'ea215520-0026-4f4e-bced-fc010cd2b631'
     }))

    return stops
}

const mockUpdateStop = async () => Promise.resolve({})

const mockCreateStop = async () => Promise.resolve({})

const mockDeleteStop = async () => Promise.resolve({})

export const StopApis = jest.fn().mockImplementation(() => ({
    getStops: mockGetStops,
    getStopById: mockGetStopById,
    getBulkStopsById: mockGetBulkStopsById,
    updateStop: mockUpdateStop,
    createStop: mockCreateStop,
    deleteStop: mockDeleteStop
}))
