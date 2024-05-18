import { StopType } from '@/types/StopType'

const getStopById = async (id: string) => Promise.resolve({
    id: id,
    orgId: '123456',
    riderIds: ['123456'],
    stopName: 'Supportive Bear'
 })

const getStops = async (orgId: string) => Promise.resolve([
    {
       id: '0c3dfca8-13eb-4df7-a194-883f0294d49b',
       orgId: orgId,
       riderIds: ['123456'],
       stopName: 'Supportive Bear'
    }
])

const getBulkStopsById = async (stopIds: string[]) => {
    const stops: StopType[] = []

    stopIds.forEach((r) => stops.push({
        id: r,
        orgId: '123456',
        riderIds: ['123456'],
        stopName: 'Supportive Bear',
        address: '789'
     }))

    return stops
}

const updateStop = async () => Promise.resolve({})

const createStop = async () => Promise.resolve({})

const deleteStop = async () => Promise.resolve({})

export interface StopApiFunctionTypes {
    getStops(orgId: string): Promise<StopType[]>,
    getStopById(id: string): Promise<StopType>,
    getBulkStopsById(ids: string[]): Promise<StopType[]>,
    updateStop(scan: StopType): Promise<object>,
    createStop(scan: StopType): Promise<object>,
    deleteStop(id: string): Promise<object>
}

export default {
    getStops,
    getStopById,
    getBulkStopsById,
    updateStop,
    createStop,
    deleteStop
}