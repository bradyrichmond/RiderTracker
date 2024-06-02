import { create } from 'zustand'
import { useApiStore } from './ApiStore'
import { useOrgStore } from './OrgStore'
import { useRouteStore } from './RouteStore'
import { StopType } from '@/types/StopType'
import { RiderType } from '@/types/RiderType'

interface StopStore {
    stops: StopType[]
    getStops(): Promise<void>
    getBulkStopsById(stopIds: string[]): Promise<StopType[]>
    getStopById(stopId: string): Promise<StopType>
    createStop(stop: StopType): Promise<void>
    deleteStop(stopId: string): Promise<void>
    addRiderToStop(rider: RiderType, stop: StopType): Promise<void>
    removeRiderFromStop(riderId: string, stopId: string): Promise<void>
}

export const useStopStore = create<StopStore>((set, get) => ({
    stops: [],
    getStops: async () => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedStops = await api?.stops.getStops(orgId)

        if (fetchedStops) {
            set(() => ({ stops: fetchedStops }))
        }
    },
    getBulkStopsById: async (stopIds: string[]) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedStops = await api?.stops.getBulkStopsByIds(orgId, stopIds)
        return fetchedStops ?? []
    },
    getStopById: async (stopId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()

        const fetchedStop = await api?.stops.getStopById(orgId, stopId)

        if (fetchedStop) {
            return fetchedStop
        }

        throw 'Could not get route by id'
    },
    createStop: async (stop: StopType) => {
        const orgId = stop.orgId
        const api = await useApiStore.getState().getApi()
        const addStopToRoute = useRouteStore.getState().addStopToRoute
        const getRouteById = useRouteStore.getState().getRouteById

        await api?.stops.createStop(orgId, stop)
        await get().getStops()

        const route = await getRouteById(stop.routeId)

        if (route) {
            await addStopToRoute(route, stop)
        }

        await get().getStops()
    },
    deleteStop: async (stopId: string) => {
        const orgId = useOrgStore.getState().orgId
        const api = await useApiStore.getState().getApi()
        await api?.stops.deleteStop(orgId, stopId)
        await get().getStops()
    },
    addRiderToStop: async (rider: RiderType, stop: StopType) => {
        const api = await useApiStore.getState().getApi()
        let riderIds = stop.riderIds

        if (!riderIds || riderIds.length < 1) {
            riderIds = []
        }

        riderIds.push(rider.id)
        await api?.stops.updateStop(stop.orgId, stop.id, { riderIds })
    },
    removeRiderFromStop: async (stopId: string, riderId: string) => {
        const stop = await get().getStopById(stopId)
        const api = await useApiStore.getState().getApi()
        const newRiderIds = stop.riderIds?.filter((r: string) => r !== riderId)
        stop.riderIds = newRiderIds && newRiderIds.length > 0 ? newRiderIds : ['']

        await api?.stops.updateStop(stop.orgId, stop.id, stop)
    }
}))